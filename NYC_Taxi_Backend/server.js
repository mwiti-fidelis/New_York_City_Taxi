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
            return res.json({
                "summary": {
                    "totalTrips": totalTrips,
                    "averageFare": averageFare,
                    "averageDistance": averageDistance,
                    "averageTip": averageTip
                }
            })
    }
    res.json({"summary": {
        "totalTrips": db.prepare('SELECT COUNT(*) AS total FROM trips').get().total,
        "averageFare": db.prepare('SELECT ROUND(AVG(fare_amount), 2) AS average FROM trips').get().average,
        "averageDistance": db.prepare('SELECT ROUND(AVG(trip_distance), 2) AS average FROM trips').get().average,
        "averageTip": db.prepare('SELECT ROUND(AVG(tip_amount), 2) AS average FROM trips').get().average,
    }
})
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})