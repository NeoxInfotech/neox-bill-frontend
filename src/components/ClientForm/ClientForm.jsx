import React, { useState } from 'react'
import axios from "axios"
import { server } from "../../main"
import "./styles.scss"
import Swal from 'sweetalert2'

const ClientForm = ({ setCname, setAddress1, setAddress2, setPhone, setSpecify, Submit, cname, address1, address2, phone, specify }) => {

    return (
        <form className='client-form' onSubmit={Submit}>
            <input type="text" value={cname} placeholder='Name of the customer' onChange={(e) => setCname(e.target.value)} />
            <input type="text" placeholder='Customer Address 1' value={address1} onChange={(e) => setAddress1(e.target.value)} />
            <input type="text" placeholder='Customer Address 2' onChange={(e) => setAddress2(e.target.value)} value={address2} />
            <input type="number" placeholder='Phone Number of the customer' onChange={(e) => setPhone(e.target.value)} value={phone} />
            <input type="text" placeholder='Customer Specification' onChange={(e) => setSpecify(e.target.value)} value={specify} />
            <button className='submit'>Submit</button>
        </form>
    )
}

export default ClientForm
