import { useEffect, useState } from 'react'
import { getAllSongs } from '../services/api'
import Sidebar from '../components/Sidebar'
import SongCard from '../components/SongCard'

function Home() {

    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchSongs()
    }, [])

    const fetchSongs = async () => {
        try {
            const res = await getAllSongs()
            setSongs(res.data)
        } catch (err) {
            console.error('Error fetching songs', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={{ display: 'flex', backgroundColor: '#000', minHeight: '100vh' }}>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={{ marginLeft: '256px', flex: 1, padding: '32px' }}>

                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                        All Songs
                    </h2>
                    <p style={{ color: '#a1a1aa', marginTop: '4px' }}>
                        Listen to your favorite music
                    </p>
                </div>

                {/* Search Bar */}
                <div style={{ marginBottom: '24px' }}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search songs or artists..."
                        style={{
                            width: '100%',
                            backgroundColor: '#27272a',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Songs List */}
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#a1a1aa', marginTop: '80px' }}>
                        <p style={{ fontSize: '20px' }}>Loading songs...</p>
                    </div>
                ) : filteredSongs.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#a1a1aa', marginTop: '80px' }}>
                        <p style={{ fontSize: '20px' }}>No songs found</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredSongs.map(song => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home