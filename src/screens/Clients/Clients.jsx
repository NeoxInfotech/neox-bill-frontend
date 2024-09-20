import React, { useEffect, useState } from 'react'
import "./styles.scss"
import Table from '../../components/Tables/Table'
import { customerhistory } from '../../data/data'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'

const Clients = () => {
    const [clientdata, setClientdata] = useState([])
    const [editform, setEditForm] = useState(false)
    const [editId, setEditId] = useState('1')
    const [cname, setCname] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [phone, setPhone] = useState('')
    const [specify, setSpecify] = useState('')
    const [clientInfo, setClientInfo] = useState([])
    const tablehead = [
        {
            id: 1,
            headers: "Name Of Customer"
        },
        {
            id: 2,
            headers: "Address 1"
        },
        {
            id: 3,
            headers: "Phone Number"
        },
        {
            id: 4,
            headers: "Specification"
        },
        {
            id: 5,
            headers: "Sales"
        },
        {
            id: 6,
            headers: "Doc"
        },
        {
            id: 7,
            headers: "Action"
        }
    ]
    const deleteButt = async (id) => {
        try {
            const res = await axios.delete(`${server}/client/deleteclient/${id}`)
            Swal.fire({
                icon: "info",
                title: res.data.message,
                timer: 2000,
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something Went Wrong",
                timer: 2000,
            })
        }

    }
    const editButt = async (id) => {
        try {
            const res = await axios.get(`${server}/client/getone/${id}`, { withCredentials: true })
            setClientInfo(res.data.message);
            setEditForm(true)

        } catch (error) {
            console.log(error)
        }
        setEditId(id)

    }


    useEffect(() => {
        setCname(clientInfo?.cname)
        setAddress1(clientInfo?.address1)
        setAddress2(clientInfo?.address2)
        setPhone(clientInfo?.phone)
        setSpecify(clientInfo.specify)
    }, [clientInfo])

    const handleClientEdit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${server}/client/editclient/${editId}`, { cname, address1, address2, phone, specify }, { withCredentials: true })
            Swal.fire({
                title: res.data.response,
                icon: "success",
                timer: 200
            })
            setEditForm(false)
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                icon: "failure",
                timer: 200
            })
        }

    }

    const fetchClients = async () => {
        try {
            const res = await axios.get(`${server}/client/getallclients`, { withCredentials: true })
            setClientdata(res.data.response)
        } catch (error) {
            console.log("Something Went Wrong")
        }
    }
    useEffect(() => {
        fetchClients();
    }, [])
    return (
        <div className='clients'>
            <h1>{customerhistory.head}</h1>
            <div className="client-container">
                <Table tabledata={clientdata} tablehead={tablehead} deleteButt={deleteButt} editButt={editButt} />
            </div>
            {
                editform ? <div className="editclientform">
                    <h2>Edit Your Client's data</h2>
                    <form className='edit-form' onSubmit={handleClientEdit}>
                        <input type="text" onChange={(e) => setCname(e.target.value)} value={cname} />
                        <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                        <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input type="text" value={specify} onChange={(e) => setSpecify(e.target.value)} />
                        <button>Edit Client</button>
                    </form>

                </div> : null
            }

        </div>
    )
}

export default Clients
