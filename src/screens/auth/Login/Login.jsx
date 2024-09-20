import React, { useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import { loginContents } from '../../../data/data'
import axios from 'axios'
import { server } from '../../../main'
import Swal from 'sweetalert2'

const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/auth/login`, { username, password }, { withCredentials: true })
            await Swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success",
                timer: 2000,
            });
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Failed",
                text: "Something Went Wrong",
                icon: "error",
                timer: 2000,
            });
        }
    }
    return (
        <div className='login-page'>
            <div className="left">
                <img src={loginContents.logo} alt="" className='neox-img' />
            </div>
            <div className="right">
                <img src={loginContents.logo} alt="" className='neox-img' />
                <h2>{loginContents.head}</h2>
                <form className="form" onSubmit={handleLogin}>
                    <input type="text" placeholder='Enter Your UserName' onChange={(e) => setUserName(e.target.value)} />
                    <input type="password" placeholder='Enter Your password here' onChange={(e) => setPassword(e.target.value)} />
                    <button className="button"> Login</button>
                </form>
                <div className="reg">
                    <span>Don't Have Account -</span>
                    <Link to={"/request"}>Request for Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
