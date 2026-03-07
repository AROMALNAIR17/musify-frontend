import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Trending from './pages/Trending.jsx'
import LikedSongs from './pages/LikedSongs.jsx'
import RecentlyPlayed from './pages/RecentlyPlayed.jsx'
import Playlists from './pages/Playlists.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {

    const { token } = useAuth()

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/trending" element={token ? <Trending /> : <Navigate to="/login" />} />
            <Route path="/liked" element={token ? <LikedSongs /> : <Navigate to="/login" />} />
            <Route path="/recently-played" element={token ? <RecentlyPlayed /> : <Navigate to="/login" />} />
            <Route path="/playlists" element={token ? <Playlists /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )
}

export default App