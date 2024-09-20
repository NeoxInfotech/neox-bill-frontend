import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { RxCross1 } from "react-icons/rx";
import { server } from "../../main"
import axios from "axios"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



const CreateInvoice = () => {

    // *** client fetch states***
    const [crecords, setCrecords] = useState([])
    const [crec, setCrec] = useState([])
    const [client, setClient] = useState('')
    const [openClientList, setOpenClientList] = useState(false)

    // *** Form submitting states & add more state***
    const [addmore, setAddmore] = useState(false)
    const [cname, setCname] = useState('');
    const [pname, setPname] = useState('');
    const [pqty, setPqty] = useState('');
    const [pamount, setPamount] = useState('');
    const [pdetails, setPdetails] = useState('');
    const [status, setStatus] = useState(false);
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [phone, setPhone] = useState('');
    const [specify, setSpecify] = useState('');
    const [invno, setInvno] = useState('')

    // ***Client names fething logics***
    const fetchClients = async () => {
        try {
            const res = await axios.get(`${server}/client/getallclients`, { withCredentials: true })
            setCrecords(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }
    const showClients = () => {
        setOpenClientList(true)
        setCrec(crecords?.map(e => e.cname))

    }
    const onClientInputhange = (e) => {
        setClient(e.target.value)
        if (client.length === 0) {
            setCrec(crecords?.map(e => e.cname))
        } else {
            const newrec = crecords?.map(e => e.cname).filter((f) => f.toLowerCase().includes(client.toLowerCase()))
            setCrec(newrec)
        }
    }
    const getClientDetails = async (e) => {
        setOpenClientList(false)
        const res = await axios.get(`${server}/client/getname/${e}`, { withCredentials: true })
        setCname(res.data.message.cname)
        setAddress1(res.data.message.address1)
        setAddress2(res.data.message.address2)
        setPhone(res.data.message.phone)
        setSpecify(res.data.message.specify)
    }
    useEffect(() => {
        fetchClients();

    }, [client])
    useEffect(() => {
        Swal.fire({
            title: "Caution",
            text: "Do not reload your page in middle of submitting form, it will result in loss of Data",
            // timer: 3000,
            icon: "warning"
        });

    }, [])


    // *** Form submit and add more logics
    const onInvoiceSubmit = async () => {
        setAddmore(true)
        try {
            const res = await axios.post(`${server}/invoice/createinvoice`, { cname, address1, address2, phone, specify, pname, pqty, pamount, pdetails, status }, { withCredentials: true })
            setInvno(res.data.invId)
            console.log(invno)
            Swal.fire({
                title: "Invoice has been submitted successfully",
                text: "If Want to add more please add project information and click on the plus button",
                timer: 3000,
                icon: "success"

            })
            setPname('')
            setPamount('')
            setPdetails('')
            setPqty('')
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 2000,
                icon: "failure"

            })
        }
    }
    const addMoreProject = async () => {
        try {
            const res = await axios.post(`${server}/invoice/addproject/${invno}`, { pqty, pamount, pdetails, pname }, { withCredentials: true })
            Swal.fire({
                title: res.data.response,
                timer: 2000,
                icon: "success"

            })
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 2000,
                icon: "failure"

            })
        }
    }
    return (
        <div className='create-invoice'>
            <h1>Create An Invoice - </h1>
            <div className="select-client">
                <span>If It's Registered Client -</span>
                <div className="client-add">
                    <input type="text" placeholder='Select Client' onFocus={showClients} onChange={onClientInputhange} value={client} />
                    <button onClick={() => setOpenClientList(false)}>Select</button>
                    {
                        openClientList ?
                            <div className="client-records">
                                {
                                    crec.map((e) => (
                                        <span onClick={() => getClientDetails(e)}>{e}</span>
                                    ))
                                }
                            </div> : null
                    }

                </div>
            </div>
            <div className='invoice-form'>
                <input
                    type="text"
                    placeholder='Name of the customer'
                    value={cname}
                    onChange={(e) => setCname(e.target.value)}
                />
                <input
                    type="text"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)} placeholder='Customer Address 1'
                />
                <input
                    type="text"
                    placeholder='Customer Address 2'
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                />
                <input
                    type="number"
                    placeholder='Phone Number of the customer' value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Customer Specification'
                    value={specify}
                    onChange={(e) => setSpecify(e.target.value)} />
                <div className="line">
                    Add Project details from here-
                </div>
                <input
                    type="text"
                    placeholder='Project Name'
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Project Details'
                    value={pdetails}
                    onChange={(e) => setPdetails(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Project Quantity'
                    value={pqty}
                    onChange={(e) => setPqty(e.target.value)}
                />
                <input type="text" placeholder='Project Amount' value={pamount} onChange={(e) => setPamount(e.target.value)} />
                <div className="status">
                    <span onClick={() => setStatus(false)}>Pending</span>
                    <span onClick={() => setStatus(true)}>Paid</span>

                </div>
                {addmore ? <button className='add-edit' onClick={addMoreProject}>Plus</button> : null}
                <button className='submit' onClick={onInvoiceSubmit}>Submit</button>
                <Link to={`/invoice/${invno}`} className='addmore'>Show Invoice</Link>
            </div>
        </div>

    )
}

export default CreateInvoice
