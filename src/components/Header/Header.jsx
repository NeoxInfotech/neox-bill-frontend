import React, { useContext } from 'react'
import "./styles.scss"
import neoxlogo from "../../assets/neox-full.png"
import { Link } from 'react-router-dom'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaBug } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import axios from 'axios';
import { server } from '../../main';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/UserContext';






const Header = () => {
    const handleLogout = async () => {
        try {
            const res = await axios.get(`${server}/auth/logout`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                icon: "info",
                timer: 2000,
            })
            window.location.reload()
        } catch (error) {

        }
    }
    const { user } = useContext(UserContext)
    const admin = "Owner"
    return (
        <>
            <div className='header'>

                <div className="all-links">
                    <img src={neoxlogo} alt="" />
                    <Link className='link' to={"/"}>
                        <MdOutlineDashboardCustomize />
                        Dashboard
                    </Link>
                    <Link className='link' to={"/createinvoice"}>
                        <FaFileInvoice />
                        Create Invoice
                    </Link>
                    <Link className='link' to={"/clients"}>
                        <FaPeopleGroup />
                        Clients
                    </Link>
                    <Link className='link' to={"/addclients"}>
                        <MdPersonAddAlt1 />
                        Add Clients
                    </Link>
                    <Link className='link' to={"/history"}>
                        <FaHistory />
                        History
                    </Link>
                    {user.relation === "Owner" ? <Link className='link' to={"/registeruser"}>
                        <FaUserTie />
                        Register A User
                    </Link> : null}
                    <Link className='link' to={"/report"}>
                        <FaBug />
                        Report A Bug
                    </Link>
                </div>
                <div className="logout">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='header-respv'>

                <div className="all-links">
                    <img src={neoxlogo} alt="" />
                    <Link className='link' to={"/"}>
                        <MdOutlineDashboardCustomize />
                        <span>Dashboard</span>
                    </Link>
                    <Link className='link' to={"/createinvoice"}>
                        <FaFileInvoice />
                        <span>Create Invoice</span>

                    </Link>
                    <Link className='link' to={"/clients"}>
                        <FaPeopleGroup />
                        <span>Clients</span>
                    </Link>
                    <Link className='link' to={"/addclients"}>
                        <MdPersonAddAlt1 />
                        <span>Add Clients</span>
                    </Link>
                    <Link className='link' to={"/history"}>
                        <FaHistory />
                        <span>History</span>
                    </Link>
                    {
                        user?.relation === "Owner" ? <Link className='link' to={"/registeruser"}>
                            <FaUserTie />
                            <span>Register A User</span>
                        </Link> : null
                    }

                    <Link className='link' to={"/report"}>
                        <FaBug />
                        <span>Report A Bug</span>
                    </Link>
                </div>
                <div className="logout">
                    <IoLogOut className='link' />
                </div>
            </div>
        </>
    )
}

export default Header
