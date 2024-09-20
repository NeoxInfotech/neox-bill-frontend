import React from 'react'
import "./styles.scss"
import { FaBug } from 'react-icons/fa6'

const Report = () => {
    return (
        <div className='report'>
            <FaBug className='bug' />
            <h1>Report A Bug</h1>
            <form className="bug-box">
                <input type="text" placeholder='Enter Your UserName' />
                <input type="email" placeholder='Enter Your Email' />
                <textarea cols="30" rows="10" placeholder='Report Your Bug'></textarea>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Report
