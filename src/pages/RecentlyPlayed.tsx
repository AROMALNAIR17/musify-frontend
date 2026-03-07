import { useEffect, useState } from 'react'
import { getRecentlyPlayed } from '../services/api'
import Sidebar from '../components/Sidebar'
import SongCard from '../components/SongCard'

function RecentlyPlayed() {

    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRecent()
    }, [])

    const fetchRecent = async () => {
        try {
            const res = await getRecentlyPlayed()
            setSongs(res.data)
        } catch (err) {
            console.error('Error fetching recently played', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', backgroundColor: '#000', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ marginLeft: '256px', flex: 1, padding: '32px' }}>

                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                        🕐 Recently Played
                    </h2>
                    <p style={{ color: '#a1a1aa', marginTop: '4px' }}>
                        Your last 20 played songs
                    </p>
                </div>

                {loading ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        Loading...
                    </p>
                ) : songs.length === 0 ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        No recently played songs. Start playing!
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {songs.map(song => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentlyPlayed