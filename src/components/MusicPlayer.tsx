import { usePlayer } from '../context/PlayerContext'

function MusicPlayer() {

    const { currentSong } = usePlayer()

    if (!currentSong) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#18181b',
            borderTop: '2px solid #22c55e',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1000
        }}>

            {currentSong.youtubeId && (
                <iframe
                    width="200"
                    height="80"
                    src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ borderRadius: '8px', border: 'none' }}
                />
            )}

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
                    <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
                        {currentSong.title}
                    </p>
                    <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>
                        {currentSong.artist}
                    </p>
                </div>
            </div>

            <p style={{ color: '#22c55e', fontSize: '14px', margin: 0 }}>
                🎵 Now Playing
            </p>

        </div>
    )
}

export default MusicPlayer