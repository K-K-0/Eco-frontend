import React,{ useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth();
    if (!auth) {
        throw new Error("AuthContext is undefined. Make sure your component is wrapped in AuthProvider.");
    }
    const { setUser, setIsAuthenticated } = auth;
    const [, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/dashboard"


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await loginUser(email, password)
        } catch (e) {
            setError('Invalid credentials')
            console.log(e)
        }

        try {
            const res = await getMe()
            console.log(res)
            setUser(res.data);
            setIsAuthenticated(true)
            navigate(from, { replace: true })
            setError('')
        } catch (error) {
            setError("session fetch fails")
            console.log(error)
        }
    }


    return (
        
        <div className="font-inter max-h-screen flex flex-col gap items-center justify-center">
            
            <section className="flex justify-center">
                 
                <div className=" px-6 lg:px-8 absolute py-20 w-[500px] h-[500px] items-center">
                    <div className=" max-h-screen rounded-2xl bg-[#f7f9f8] shadow-xl mt-30">
                        <form onSubmit={handleLogin} className="lg:p-11 p-7 mx-auto">
                            <div className="mb-11">
                                <h1 className="text-[#002d1f] text-center font-manrope text-3xl font-bold leading-10 mb-2">Welcome Back</h1>
                                <p className="text-[#002d1f] text-center text-base font-medium leading-6"></p>
                            </div>

                            
                            <input type="text" placeholder="Email" className="w-full h-12 text-gray-900 placeholder:text-gray-400 
                                text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            /> 

                            <input type="password" placeholder="Password" className="w-full h-12 text-gray-900 placeholder:text-gray-400
                                text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />

                            <a href="" className="flex justify-end mb-6">
                                <span className="text-indigo-600 text-right text-base font-normal leading-6">Forgot Password?</span>
                            </a>

                            <button type="submit" className="w-full h-12 text-white text-center text-base font-semibold leading-6 cursor-pointer rounded-full hover:bg-lime-500 transition-all duration-700  bg-indigo-600 shadow-sm mb-11">Login</button>

                            <Link to="/signup" className="flex justify-center text-gray-900 text-base font-medium leading-6">
                                Don’t have an account?
                                <span className="text-indigo-600 font-semibold pl-3"> Sign Up</span>
                            </Link>

                            
                        </form>
                    </div>
                </div>
            </section>
        </div>        
    )
}

export default Login
