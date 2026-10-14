const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const Database = require('better-sqlite3')

const db = new Database(
    path.join(__dirname, '../../NYC_taxi.db'),
    { fileMustExist: true }

);

const result = db.prepare('SELECT COUNT(*) AS total FROM trips').get()
console.log(result)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', 
        message: 'taxi app is running'})
})

app.get('/api/dashboard', (req, res) => {
    const day = req.query.day
    
    if (day) {
        const validDay = /^2019-01-(0[1-9]|[12][0-9]|3[01])$/.test(day)
        if (!validDay) {
            return res.status(400).json({
                error: 'Invalid day. Use 2019-01-DD format. e.g 2019-01-25'
            })
        }
        const startOfDay = `${day} 00:00:00`
        const endOfDay = `${day} 23:59:59`
        
        const totalTrips = db.prepare('SELECT COUNT(*) AS total FROM trips WHERE tpep_pickup_datetime BETWEEN ? AND ?').get(startOfDay, endOfDay).total
        const averageFare = db.prepare('SELECT ROUND(AVG(fare_amount), 2) AS average FROM trips WHERE tpep_pickup_datetime BETWEEN ? AND ?').get(startOfDay, endOfDay).average
        const averageDistance = db.prepare('SELECT ROUND(AVG(trip_distance), 2) AS average FROM trips WHERE tpep_pickup_datetime BETWEEN ? AND ?').get(startOfDay, endOfDay).average
        const averageTip = db.prepare('SELECT round(AVG(tip_amount), 2) AS average FROM trips WHERE tpep_pickup_datetime BETWEEN ? AND ?').get(startOfDay, endOfDay).average
        
        const tripsByHour = db.prepare(`
            SELECT
                CAST(strftime('%H', tpep_pickup_datetime) AS INTEGER) AS hour,
                COUNT(*) AS trips
            FROM trips
            WHERE tpep_pickup_datetime >= ? AND tpep_pickup_datetime <= ?
            GROUP BY strftime('%H', tpep_pickup_datetime)
            ORDER BY hour
        `).all(startOfDay, endOfDay)

        const topPickUpZones = db.prepare(`
            SELECT
                pickup.zone AS zone,
                pickup.borough AS borough,
                COUNT(*) AS trips
            FROM trips
            JOIN taxi_zones AS pickup
                ON trips.PULocationID = pickup.location_id
            WHERE tpep_pickup_datetime >= ? AND tpep_pickup_datetime <= ?
            GROUP BY pickup.zone, pickup.borough
            ORDER BY trips DESC
            LIMIT 10
        `).all(startOfDay, endOfDay)
        
        const distanceFare = db.prepare(`
            SELECT
                CAST((ROUND(trip_distance / 10.0, 0) * 10) AS INTEGER) AS distance,
                ROUND(AVG(fare_amount), 2) AS fare
            FROM trips
            WHERE tpep_pickup_datetime >= ? AND tpep_pickup_datetime <= ?
                AND trip_distance > 0.5
                AND fare_amount > 2.5
            GROUP BY CAST((ROUND(trip_distance / 10.0, 0) * 10) AS INTEGER)
            ORDER BY distance
            LIMIT 20
        `).all(startOfDay,  endOfDay)
        
        return res.json({
            "summary": {
                "totalTrips": totalTrips,
                "averageFare": averageFare,
                "averageDistance": averageDistance,
                "averageTip": averageTip
            },
            tripsByHour: tripsByHour,
            topPickUpZones : topPickUpZones,
            distanceFare: distanceFare
        })
    }

    const tripsByHour = db.prepare(`
        SELECT
            CAST(strftime('%H', tpep_pickup_datetime) AS INTEGER) AS hour,
            COUNT(*) AS trips
        FROM trips
        GROUP BY strftime('%H', tpep_pickup_datetime)
        ORDER BY hour
    `).all()

    const topPickUpZones = db.prepare(`
        SELECT
            pickup.zone AS zone,
            pickup.borough AS borough,
            COUNT(*) AS trips
        FROM trips
        JOIN taxi_zones AS pickup
            ON trips.PULocationID = pickup.location_id
        GROUP BY pickup.zone, pickup.borough
        ORDER BY trips DESC
        LIMIT 10
    `).all()

    const distanceFare = db.prepare(`
        SELECT
            CAST((ROUND(trip_distance / 10.0, 0) * 10) AS INTEGER) AS distance,
            ROUND(AVG(fare_amount), 2) AS fare
        FROM trips
        WHERE trip_distance > 0.5
            AND fare_amount > 2.5
        GROUP BY CAST((ROUND(trip_distance / 10.0, 0) * 10) AS INTEGER)
        ORDER BY distance
        LIMIT 20
    `).all()


    res.json({
        "summary": {
            "totalTrips": db.prepare('SELECT COUNT(*) AS total FROM trips').get().total,
            "averageFare": db.prepare('SELECT ROUND(AVG(fare_amount), 2) AS average FROM trips').get().average,
            "averageDistance": db.prepare('SELECT ROUND(AVG(trip_distance), 2) AS average FROM trips').get().average,
            "averageTip": db.prepare('SELECT ROUND(AVG(tip_amount), 2) AS average FROM trips').get().average,
        },
        tripsByHour: tripsByHour,
        topPickUpZones: topPickUpZones,
        distanceFare: distanceFare
    })
})

app.get('/api/trips', (req, res) => {
    const day = req.query.day
    const limit = Number(req.query.limit) || 20
    const safeLimit = Math.min(Math.max(limit, 1), 100)

    let whereClause = ''
    let params = [safeLimit]

    if (day) {
        const validDay = /^2019-01-(0[1-9]|[12][0-9]|3[01])$/.test(day)
        if (!validDay) {
            return res.status(400).json({
                error: 'Invalid day'
            })
        }

        const startOfDay = `${day} 00:00:00`
        const endOfDay = `${day} 23:59:59`

        whereClause = 'WHERE tpep_pickup_datetime BETWEEN ? AND ?'
        params = [startOfDay, endOfDay, safeLimit]
    }

    const query = `
        SELECT
            t.tpep_pickup_datetime AS pickupTime,
            t.trip_distance AS distance,
            pickup.zone AS pickupZone,
            dropoff.zone AS dropoffZone,
            t.fare_amount AS fare,
            t.tip_amount AS tip
        FROM trips AS t
        LEFT JOIN taxi_zones pickup ON t.PULocationID = pickup.location_id
        LEFT JOIN taxi_zones dropoff ON t.DOLocationID = dropoff.location_id
        ${whereClause}
        ORDER BY t.tpep_pickup_datetime DESC
        LIMIT ?
    `

    const rows = db.prepare(query).all(...params)

    res.json({ trips: rows })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})