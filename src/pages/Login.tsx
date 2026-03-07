import { useState } from 'react'
import { loginUser } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            const res = await loginUser({ email, password })
            login(res.data.accessToken, { email })
            navigate('/home')
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-xl">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-500">🎵 Musify</h1>
                    <p className="text-zinc-400 mt-2">Login to your account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

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
                    onClick={handleLogin}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition"
                >
                    Login
                </button>

                {/* Register Link */}
                <p className="text-zinc-400 text-center mt-4 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-500 hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login