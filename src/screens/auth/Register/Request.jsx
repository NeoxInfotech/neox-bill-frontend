import React from 'react'
import "./styles.scss"
import neoxlogo from "../../../assets/neox-full.png"
import { Link } from "react-router-dom"

const Request = () => {
    return (
        <div className='request'>
            <img src={neoxlogo} alt="" />
            <h2>If you are associated with this company , send a request to admin for login access</h2>
            <form>
                <input type="text" placeholder='Your Name' />
                <input type="email" placeholder='Your Email' />
                <input type="number" placeholder='Your Phone Number' />
                <input type="text" placeholder='Your Position In this company' />
                <button>Submit</button>
            </form>
            <Link to={"/"}>GO Back To Login</Link>
        </div>
    )
}

export default Request
