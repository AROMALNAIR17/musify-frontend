import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div style={{
            width: '256px',
            backgroundColor: '#18181b',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px'
        }}>

            {/* Logo */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ color: '#22c55e', fontSize: '24px', fontWeight: 'bold' }}>
                    🎵 Musify
                </h1>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                    🏠 Home
                </Link>
                <Link to="/trending" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                    🔥 Trending
                </Link>
                <Link to="/liked" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                    ❤️ Liked Songs
                </Link>
                <Link to="/recently-played" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                    🕐 Recently Played
                </Link>
                <Link to="/playlists" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                    📋 My Playlists
                </Link>
            </nav>

            {/* Logout */}
            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: '#3f3f46',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>
                🚪 Logout
            </button>

        </div>
    )
}

export default Sidebar