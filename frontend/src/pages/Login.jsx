import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Ticket } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Demo credentials check
        if (email === 'demo@tickethub.com' && password === 'TicketHub@2026') {
            localStorage.setItem('tickethub_auth', 'true');
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-2">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome to TicketHub</h1>
                    <p className="text-gray-500">Sign in to access your dashboard</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <InputField
                        label="Email Address"
                        type="email"
                        id="email"
                        icon={<Mail className="w-5 h-5 text-gray-400" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="demo@tickethub.com"
                        autoComplete="email"
                    />

                    <InputField
                        label="Password"
                        type="password"
                        id="password"
                        icon={<Lock className="w-5 h-5 text-gray-400" />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="TicketHub@2026"
                        autoComplete="current-password"
                    />

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-center text-xs text-gray-400 mt-4">
                        <p>Demo Credentials:</p>
                        <p>Email: demo@tickethub.com</p>
                        <p>Password: TicketHub@2026</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, type, id, icon, value, onChange, placeholder, autoComplete }) => (
    <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                name={id}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={placeholder}
                required
            />
        </div>
    </div>
);

export default Login;
