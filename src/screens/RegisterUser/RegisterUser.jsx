import React, { useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from "../../main"
import Swal from 'sweetalert2'

const RegisterUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [relation, setRelation] = useState('')
    const [username, setUserName] = useState('')
    const usernamecreate = "NX-" + (Math.floor(Math.random() * (900000 - 10000 + 1)) + 10000);
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/auth/register`, {
                name,
                username,
                password: username,
                mobile,
                email,
                relation
            }, { withCredentials: true })
            Swal.fire({
                title: res.data.message,
                icon: "success",
                timer: 2000
            })
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                icon: "failure",
                timer: 2000
            })
        }
    }
    return (
        <div className='register-user'>
            <h2>Register A User : - </h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Enter Partners Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={username} onChange={() => setUserName(usernamecreate)} placeholder='Type any Key Here for username' />
                <input type="email" placeholder='Enter Partners Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="number" placeholder='Enter Partners Phone' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <input type="text" placeholder='Enter Partners Relation' value={relation} onChange={(e) => setRelation(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default RegisterUser
