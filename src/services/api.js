import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8081'
})

// Public API - no token needed
const PUBLIC_API = axios.create({
    baseURL: 'http://localhost:8081'
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// ─── AUTH (no token) ─────────────────────────────────
export const registerUser = (data) => PUBLIC_API.post('/auth/register', data)
export const loginUser = (data) => PUBLIC_API.post('/auth/login', data)

// ─── SONGS ───────────────────────────────────────────
export const getAllSongs = () => API.get('/songs')
export const getTrendingSongs = () => API.get('/songs/trending')
export const searchSongs = (keyword, page, size) =>
    API.get(`/songs/search?keyword=${keyword}&page=${page}&size=${size}`)

// ─── LIKES ───────────────────────────────────────────
export const likeSong = (songId) => API.post(`/songs/${songId}/like`)
export const unlikeSong = (songId) => API.delete(`/songs/${songId}/like`)
export const getLikedSongs = () => API.get('/songs/liked')

// ─── RECENTLY PLAYED ─────────────────────────────────
export const recordPlay = (songId) => API.post(`/songs/${songId}/play`)
export const getRecentlyPlayed = () => API.get('/songs/recently-played')

// ─── PLAYLISTS ───────────────────────────────────────
export const createPlaylist = (name) => API.post(`/playlists?name=${name}`)
export const getUserPlaylists = () => API.get('/playlists')
export const addSongToPlaylist = (playlistId, songId) =>
    API.post(`/playlists/${playlistId}/songs/${songId}`)
export const removeSongFromPlaylist = (playlistId, songId) =>
    API.delete(`/playlists/${playlistId}/songs/${songId}`)
export const getPlaylistSongs = (playlistId) =>
    API.get(`/playlists/${playlistId}/songs`)