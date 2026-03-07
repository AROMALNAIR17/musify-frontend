import { useEffect, useState } from 'react'
import { getUserPlaylists, createPlaylist, getPlaylistSongs } from '../services/api'
import Sidebar from '../components/Sidebar'
import SongCard from '../components/SongCard'

function Playlists() {

    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState(null)
    const [playlistSongs, setPlaylistSongs] = useState([])
    const [newName, setNewName] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPlaylists()
    }, [])

    const fetchPlaylists = async () => {
        try {
            const res = await getUserPlaylists()
            setPlaylists(res.data)
        } catch (err) {
            console.error('Error fetching playlists', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        if (!newName.trim()) return
        try {
            await createPlaylist(newName)
            setNewName('')
            fetchPlaylists()
        } catch (err) {
            console.error('Error creating playlist', err)
        }
    }

    const handleSelectPlaylist = async (playlist) => {
        setSelectedPlaylist(playlist)
        try {
            const res = await getPlaylistSongs(playlist.id)
            setPlaylistSongs(res.data)
        } catch (err) {
            console.error('Error fetching playlist songs', err)
        }
    }

    return (
        <div style={{ display: 'flex', backgroundColor: '#000', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ marginLeft: '256px', flex: 1, padding: '32px' }}>

                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                        📋 My Playlists
                    </h2>
                    <p style={{ color: '#a1a1aa', marginTop: '4px' }}>
                        Create and manage your playlists
                    </p>
                </div>

                {/* Create Playlist */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New playlist name..."
                        style={{
                            flex: 1,
                            backgroundColor: '#27272a',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '16px'
                        }}
                    />
                    <button
                        onClick={handleCreate}
                        style={{
                            backgroundColor: '#22c55e',
                            color: 'black',
                            fontWeight: 'bold',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>
                        + Create
                    </button>
                </div>

                {/* Playlists Grid */}
                {loading ? (
                    <p style={{ color: '#a1a1aa' }}>Loading...</p>
                ) : playlists.length === 0 ? (
                    <p style={{ color: '#a1a1aa', fontSize: '20px', textAlign: 'center', marginTop: '80px' }}>
                        No playlists yet. Create one!
                    </p>
                ) : (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
                        {playlists.map(playlist => (
                            <div
                                key={playlist.id}
                                onClick={() => handleSelectPlaylist(playlist)}
                                style={{
                                    backgroundColor: selectedPlaylist?.id === playlist.id ? '#22c55e' : '#27272a',
                                    color: selectedPlaylist?.id === playlist.id ? 'black' : 'white',
                                    padding: '16px 24px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                }}>
                                📋 {playlist.name}
                            </div>
                        ))}
                    </div>
                )}

                {/* Playlist Songs */}
                {selectedPlaylist && (
                    <div>
                        <h3 style={{ color: 'white', marginBottom: '16px' }}>
                            Songs in "{selectedPlaylist.name}"
                        </h3>
                        {playlistSongs.length === 0 ? (
                            <p style={{ color: '#a1a1aa' }}>No songs in this playlist yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {playlistSongs.map(song => (
                                    <SongCard key={song.id} song={song} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Playlists