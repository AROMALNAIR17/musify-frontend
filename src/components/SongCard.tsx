import { likeSong, unlikeSong, recordPlay } from '../services/api'
import { usePlayer } from '../context/PlayerContext'
import { useState } from 'react'

function SongCard({ song }: any) {

    const { playSong, currentSong, isPlaying } = usePlayer()
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(song.likes || 0)

    const isCurrentSong = currentSong?.id === song.id

    const handlePlay = async () => {
        playSong(song)
        try {
            await recordPlay(song.id)
        } catch (err) {
            console.error('Play error', err)
        }
    }

    const handleLike = async () => {
        try {
            if (liked) {
                await unlikeSong(song.id)
                setLikes(likes - 1)
                setLiked(false)
            } else {
                await likeSong(song.id)
                setLikes(likes + 1)
                setLiked(true)
            }
        } catch (err) {
            console.error('Like error', err)
        }
    }

    return (
        <div style={{
            backgroundColor: isCurrentSong ? '#1a3a2a' : '#27272a',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: isCurrentSong ? '1px solid #22c55e' : '1px solid transparent'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    backgroundColor: '#22c55e',
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                }}>🎵</div>
                <div>
                    <h3 style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>
                        {song.title}
                    </h3>
                    <p style={{ color: '#a1a1aa', fontSize: '14px', margin: '2px 0' }}>
                        {song.artist}
                    </p>
                    <p style={{ color: '#71717a', fontSize: '12px', margin: 0 }}>
                        {song.movieOrShow} • {song.language}
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                    onClick={handlePlay}
                    style={{
                        backgroundColor: isCurrentSong && isPlaying ? '#16a34a' : '#22c55e',
                        color: 'black',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        fontSize: '16px',
                        cursor: song.audioUrl ? 'pointer' : 'not-allowed',
                        opacity: song.audioUrl ? 1 : 0.5
                    }}>
                    {isCurrentSong && isPlaying ? '⏸' : '▶'}
                </button>

                <button
                    onClick={handleLike}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: liked ? '#22c55e' : '#a1a1aa'
                    }}>
                    {liked ? '❤️' : '🤍'} {likes}
                </button>
            </div>
        </div>
    )
}

export default SongCard