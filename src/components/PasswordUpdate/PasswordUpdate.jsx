import React from 'react'
import "./styles.scss"
import { GiCrossMark } from "react-icons/gi";


const PasswordUpdate = ({ setPassModal }) => {
    return (
        <div className="update-password">
            <div className="ico">
                <GiCrossMark className='cross' onClick={() => setPassModal} />
            </div>
            <h2>Update Your Password</h2>
            <div className="input">
                <input type="text" placeholder='Enter Your New Password' />
                <button>Update</button>
            </div>
        </div>
    )
}

export default PasswordUpdate
