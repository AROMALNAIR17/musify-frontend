import { useState } from 'react'
import { registerUser } from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleRegister = async () => {
        try {
            await registerUser({ name, email, password, role: 'USER' })
            setSuccess('Account created! Redirecting to login...')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            setError('Registration failed. Email may already exist.')
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-xl">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-500">🎵 Musify</h1>
                    <p className="text-zinc-400 mt-2">Create your account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-sm">
                        {success}
                    </div>
                )}

                {/* Name */}
                <div className="mb-4">
                    <label className="text-zinc-400 text-sm mb-1 block">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-zinc-800 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="text-zinc-400 text-sm mb-1 block">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-zinc-800 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="text-zinc-400 text-sm mb-1 block">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-zinc-800 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition"
                >
                    Register
                </button>

                {/* Login Link */}
                <p className="text-zinc-400 text-center mt-4 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Register