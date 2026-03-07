import { useEffect, useState } from 'react'
import { getTrendingSongs } from '../services/api'
import Sidebar from '../components/Sidebar'
import SongCard from '../components/SongCard'

function Trending() {

    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTrending()
    }, [])

    const fetchTrending = async () => {
        try {
            const res = await getTrendingSongs()
            setSongs(res.data)
        } catch (err) {
            console.error('Error fetching trending', err)
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
                        🔥 Trending Songs
                    </h2>
                    <p style={{ color: '#a1a1aa', marginTop: '4px' }}>
                        Top 10 most liked songs
                    </p>
                </div>

                {loading ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        Loading...
                    </p>
                ) : songs.length === 0 ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        No trending songs yet
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {songs.map((song, index) => (
                            <div key={song.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '20px', width: '30px' }}>
                                    #{index + 1}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <SongCard song={song} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Trending