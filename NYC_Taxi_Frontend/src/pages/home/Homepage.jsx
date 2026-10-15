import { useEffect, useState } from 'react'
import { TripDetails } from './TripDetails';
import { ToolBar } from './ToolBar';
import './HomePage.css';
import { DataVisualization } from '../data-management/DataVisualization';

const defaultDashboard = {
    summary: {
        totalTrips: 0,
        averageFare: 0,
        averageDistance: 0,
        averageTip: 0
    },
    tripsByHour: [],
    topPickUpZones: [],
    distanceFare: []
}

export function HomePage() {
    const [selectedDay, setSelectedDay] = useState('')
    const [dashboardData, setDashboardData] = useState(defaultDashboard)
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchDashboardData = async (day) => {
        const query = day ? `?day=${encodeURIComponent(day)}` : ''
        const response = await fetch(`/api/dashboard${query}`)

        if (!response.ok) {
            const body = await response.json().catch(() => ({}))
            throw new Error(body.error || 'Failed to fetch dashboard data')
        }

        return response.json()
    }

    const fetchTrips = async (day = '') => {
        const query = day ? `?day=${encodeURIComponent(day)}` : ''
        const response = await fetch(`/api/trips${query}`)

        if (!response.ok) {
            const body = await response.json().catch(() => ({}))
            throw new Error(body.error || 'Failed to load trip details')
        }

        const data = await response.json()
        return data.trips || []
    }

    const loadDashboard = async (day = '') => {
        setLoading(true)
        setError('')

        try {
            const [dashboard, tripRows] = await Promise.all([
                fetchDashboardData(day),
                fetchTrips(day),
            ])

            setDashboardData({
                ...defaultDashboard,
                ...dashboard,
                summary: dashboard.summary || defaultDashboard.summary,
                tripsByHour: dashboard.tripsByHour || [],
                topPickUpZones: dashboard.topPickUpZones || [],
                distanceFare: dashboard.distanceFare || [],
            })

            setTrips(tripRows)
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadDashboard()
    }, [])

    const handleApply = () => {
        loadDashboard(selectedDay)
    }

    const handleReset = () => {
        setSelectedDay('')
        loadDashboard()
    }
    return (
            <div className="home-page">
                <div className="header">
                    <p className="title">NYC Taxi Urban Mobility Explorer</p>
                </div>

                <div className="data-grid">
                    <ToolBar 
                        selectedDay={selectedDay}
                        onDayChange={setSelectedDay}
                        onApply={handleApply}
                        onReset={handleReset}
                        loading={loading}
                    />

                    {error ? (
                        <div className="dashboard-error">{error}</div>
                    ) : (
                        <>
                        <DataVisualization dashboardData={dashboardData} />
                        <TripDetails trips={trips} />
                        </>
                    )}
                </div>
            </div>
    )
} 