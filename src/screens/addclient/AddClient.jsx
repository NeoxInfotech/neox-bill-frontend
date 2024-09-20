import React, { useState } from 'react'
import "./styles.scss"
import ClientForm from '../../components/ClientForm/ClientForm'
import { customerAdd } from '../../data/data'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'

const AddClient = () => {
    const [cname, setCname] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [phone, setPhone] = useState('')
    const [specify, setSpecify] = useState('')
    const handleClientAdd = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/client/addclient`, {
                cname,
                address1,
                address2,
                phone,
                specify
            }, { withCredentials: true })
            Swal.fire({
                title: res.data.message,
                icon: "success"
            })
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                icon: "error"
            })
        }
    }
    return (
        <div className='addclient'>
            <h1>{customerAdd.head}</h1>
            <div className="formspace">
                <ClientForm
                    setCname={setCname}
                    setAddress1={setAddress1}
                    setAddress2={setAddress2}
                    setPhone={setPhone}
                    setSpecify={setSpecify}
                    Submit={handleClientAdd}

                />
            </div>
        </div>
    )
}

export default AddClient
