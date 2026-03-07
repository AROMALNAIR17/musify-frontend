import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PlayerProvider } from './context/PlayerContext.tsx'
import MusicPlayer from './components/MusicPlayer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <PlayerProvider>
                <App />
                <MusicPlayer />
            </PlayerProvider>
        </AuthProvider>
    </BrowserRouter>
)