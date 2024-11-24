import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash, FaXmark } from "react-icons/fa6"; 
import { Link, useNavigate } from "react-router-dom";  
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/axiosPublic";

const Login = () => {

    const { login, googleLogin, loading, setLoading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')

    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        // console.table( email,password )

        login(email, password)
            .then(result => {
                if (result?.user) {
                     toast.success('Login Success')
                    setError('')
                    e.target.reset()
                    navigate(location?.state ? location.state : '/')
                }
            })
            .catch(err => {
                setLoading(false)
                setError(err.message)
                console.log(err.message)
            })
    }


    const handleGoogleLogin = () => {
        const date = new Date()
        googleLogin()
            .then(result => {

                const userinfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    photo: result?.user?.photoURL,
                    role: 'Guest',
                    userCreateTime: date
                }
                axiosPublic.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                             toast.success('Login SuccessFul')
                        }
                        // navigate(location?.state ? location.state : '/')
                    },
                        navigate(location?.state ? location.state : '/')
                    )
                    .catch(err => {
                        console.log(err.message)
                    })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    // if (loading) {
    //     return <Loading></Loading>
    // }

    return (
        <div className="g-card lg:w-1/3 md:w-1/2 mx-auto my-10 md:px-5 px-3 py-2 rounded-lg border border-base-300 shadow-md max-sm:mx-4 ">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Toaster></Toaster>
            <div className="flex justify-end">
                <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-orange-600 my-0"></FaXmark></Link>
            </div>
            <h3 className="text-lg md:text-3xl font-bold text-center text-orange-600 my-4">Please LogIn</h3>
            <form onSubmit={handleLogin} className="">
                <div>
                    <p className="font-semibold mb-2">Email</p>
                    <input type="email" name="email" placeholder="Your Email" id="" className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2" />

                </div>
                <p className="font-semibold text-sm md:text-base mb-2">Password</p>
                <div className="relative">
                    <input className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                    <span className="absolute md:top-1/4 top-[5px] right-3" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                    </span>
                </div>
                <div>
                    {
                        error ?
                            <p className='text-sm text-red-500'>please give your right email and password</p> : ''
                    }
                    {
                        loading ?
                            <button disabled className="w-full px-4 py-1 md:py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3"><span className="loading loading-spinner loading-md"></span></button>
                            :
                            <input disabled={loading} className="w-full px-4 py-1 md:py-2 text-center max-sm:text-sm text-lg rounded-md border border-orange-400 text-orange-500 hover:shadow-lg font-bold my-3" type="submit" value="Login" />
                    }
                    {/* <input type="submit" value="LogIn" className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600" /> */}
                </div>
            </form>
            <p className="my-3">Do not have an account <Link to='/loginRegister/register' className="text-red-500 font-bold">Please Register</Link></p>
            <div className="divider my-5"></div>
            <div className="mb-t flex justify-center items-center">
                 
                    {/* <button  className=" p-3 border border-orange-400 rounded-xl font-bold"> <FcGoogle className="text-3xl"></FcGoogle></button> */}

                    <button onClick={handleGoogleLogin}
                        className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-[#424242] hover:bg-gray-50 transition-all duration-200">
                        <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png" alt="google logo"
                            className="w-[23px]" />
                        Sign in with Google
                    </button>

                
            </div>
        </div>
    );
};

export default Login;