import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backendApi } from "../../../api.ts";
import {getUserFromToken} from "../../../auth/auth.ts";
import type {UserData} from "../../../model/UserData.ts";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

type FormData = {
    username: string;
    password: string;
}

export function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)

    const authenticateUser = async (data: FormData) => {
        try {
            const userCredentials = {
                username: data.username,
                password: data.password
            }

            const response = await backendApi.post('/auth/login', userCredentials);

console.log("Login response:", response.data);
console.log("Access token received:", !!response.data.accessToken);
console.log("Refresh token received:", !!response.data.refreshToken);

const accessToken = response.data.accessToken;
const refreshToken = response.data.refreshToken;

localStorage.setItem('token', accessToken);
localStorage.setItem('refreshToken', refreshToken);

            const user:UserData = getUserFromToken(accessToken)
            localStorage.setItem('username', user.username as string)
            localStorage.setItem('role', user.role as string)

            if (user.role === 'user') {
                navigate('/')
            } else if (user.role === 'admin') {
                navigate('/admin-panel')
            }
        } catch (error) {
            console.error(error)
            alert("Login failed")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-100 max-w-md">


                <div className="shadow-lg border-0 bg-white/95 backdrop-blur rounded-lg overflow-hidden">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className=" cursor-pointer p-2 rounded-lg mx-6 mt-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                    </button>
                    {/* Header */}
                    <div className="space-y-1 text-center p-6 pb-4 ">
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Lock className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-0 space-y-4 ">
                        <form onSubmit={handleSubmit(authenticateUser)} className="space-y-4">
                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        id="username"
                                        {...register("username")}
                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        {...register("password")}
                                        className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className=" cursor-pointer absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="  cursor-pointer w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className=" cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => alert('Google login would be implemented here')}
                            >
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className=" cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => alert('Facebook login would be implemented here')}
                            >
                                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                        </div>

                        {/* Register Link */}
                        <div className="text-center text-sm">
                            <span className="text-gray-600">Don't have an account? </span>
                            <button
                                type="button"
                                className=" cursor-pointer text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline transition-colors duration-200"
                                onClick={() => navigate('/register')}
                            >
                                Create account
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-500 ">
                    <p>
                        By signing in, you agree to our{' '}
                        <button className="text-blue-600 hover:text-blue-700 underline focus:outline-none">
                            Terms of Service
                        </button>{' '}
                        and{' '}
                        <button className="text-blue-600 hover:text-blue-700 underline focus:outline-none">
                            Privacy Policy
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}