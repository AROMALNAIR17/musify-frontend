import { createContext, useContext, useState } from 'react'

const PlayerContext = createContext<any>(null)

export const PlayerProvider = ({ children }: any) => {

    const [currentSong, setCurrentSong] = useState<any>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const playSong = (song: any) => {
        if (currentSong?.id === song.id) {
            setIsPlaying(!isPlaying)
        } else {
            setCurrentSong(song)
            setIsPlaying(true)
        }
    }

    const pauseSong = () => {
        setIsPlaying(false)
    }

    return (
        <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, pauseSong, setIsPlaying }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => useContext(PlayerContext)