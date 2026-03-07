import { useEffect, useState } from 'react'
import { getLikedSongs } from '../services/api'
import Sidebar from '../components/Sidebar'
import SongCard from '../components/SongCard'

function LikedSongs() {

    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLiked()
    }, [])

    const fetchLiked = async () => {
        try {
            const res = await getLikedSongs()
            setSongs(res.data)
        } catch (err) {
            console.error('Error fetching liked songs', err)
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
                        ❤️ Liked Songs
                    </h2>
                    <p style={{ color: '#a1a1aa', marginTop: '4px' }}>
                        Songs you have liked
                    </p>
                </div>

                {loading ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        Loading...
                    </p>
                ) : songs.length === 0 ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        No liked songs yet. Start liking songs!
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

export default LikedSongs