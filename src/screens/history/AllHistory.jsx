import React, { useEffect, useState } from 'react'
import Table from '../../components/Tables/Table'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'

const AllHistory = () => {
    const [invdata, setInvdata] = useState([])
    const [editform, setEditForm] = useState(true)
    const [editid, setEditId] = useState(true)
    const [cname, setCname] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [phone, setPhone] = useState('')
    const [specify, setSpecify] = useState('')


    const handleInvoice = () => {

    }
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
            headers: "Invoice No.",
        },
        {
            id: 6,
            headers: "Tota Sales",
        },
        {
            id: 7,
            headers: "Documents",
        },
        {
            id: 8,
            headers: "Status",
        },

        {
            id: 9,
            headers: "Action",
        },
    ]

    const getInv = async () => {
        try {
            const res = await axios.get(`${server}/invoice/getinvoices`, { withCredentials: true })
            setInvdata(res.data.message)
            console.log(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const statusPaid = async (inv) => {
        try {
            const res = await axios.put(`${server}/invoice/updatestatus/${inv}`, { withCredentials: true })
            Swal.fire({
                title: res.data.message,
                icon: 'success',
                timer: 2000
            })
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                icon: 'error',
                timer: 2000
            })
        }
    }

    const deleteButt = async (id) => {
        try {
            const res = await axios.delete(`${server}/invoice/delete/${id}`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                icon: 'success',
                timer: 2000
            })
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something went wrong",
                icon: 'error',
                timer: 2000
            })
        }
    }

    // const editButt = async (id) => {
    //     try {
    //         const res = await axios.get(`${server}/invoice/getinvoicebyid/${id}`, { withCredentials: true })
    //         setInvInfo(res.data.message);
    //         setEditForm(true)

    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setEditId(id)

    // }

    // const editForm = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.put(`${server}/invoice/updateinv/${editid}`, { cname, address1, address2, phone, specify, pname, pamount, pqty, pdetails }, { withCredentials: true })
    //         Swal.fire({
    //             title: res.data.response,
    //             icon: "success",
    //             timer: 200
    //         })
    //         setEditForm(false)
    //     } catch (error) {
    //         Swal.fire({
    //             title: "Something Went Wrong",
    //             icon: "failure",
    //             timer: 200
    //         })
    //     }
    // }





    useEffect(() => {
        getInv();
    }, [])
    return (
        <div className='history'>
            <h1>Search All your history here</h1>
            <div className="tablecontents">
                <Table tabledata={invdata} tablehead={tablehead} headfont={"14px"} statusPaid={statusPaid} deleteButt={deleteButt} />
            </div>

        </div>
    )
}

export default AllHistory

