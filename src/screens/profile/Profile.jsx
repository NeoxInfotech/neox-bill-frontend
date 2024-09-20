import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import profilepic from "../../assets/profilepic.jpg"
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'
import PasswordUpdate from '../../components/PasswordUpdate/PasswordUpdate'

const Profile = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [relation, setRelation] = useState('')
    const { user } = useContext(UserContext)
    const [passModal, setPassModal] = useState(false)

    const handleEdit = async () => {
        try {
            const res = await axios.put(`${server}/user/${user?._id}`, { username, email, name, mobile, relation }, { withCredentials: true })
            Swal.fire({
                title: res.data.text,
                icon: "success",
                timer: 2000,
            })
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                icon: "error",
                timer: 2000,
            })
        }
    }
    useEffect(() => {
        setUserName(user?.username)
        setName(user?.name)
        setEmail(user?.email)
        setMobile(user?.mobile)
        setRelation(user?.relation)
    }, [])
    return (
        <div className='profile'>
            <div className="left">
                <img src={profilepic} alt="" className='profile-pic' />
            </div>
            <div className="right">
                <h2>Your Profile</h2>
                <div className="profile-form">
                    <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                    <input type="text" placeholder='UserName' onChange={(e) => setUserName(e.target.value)} value={username} />
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="number" placeholder='Mobile Number' onChange={(e) => setMobile(e.target.value)} value={mobile} />
                    <input type="text" placeholder='Business Name' onChange={(e) => setRelation(e.target.value)} value={relation} />

                    <div className="profile-buttons">
                        <button onClick={handleEdit}>Edit</button>
                        <button>Delete</button>
                        <button onClick={() => setPassModal(!passModal)}>Update Password</button>
                    </div>
                </div>
            </div>
            {passModal ? <PasswordUpdate setPassModal={setPassModal} /> : null}
        </div>
    )
}

export default Profile
