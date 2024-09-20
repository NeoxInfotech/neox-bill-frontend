import React, { useContext } from 'react'
import "./styles.scss"
import 'chart.js/auto';
import { Link } from 'react-router-dom'
import { FaPeopleGroup } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { Bar, Line, Pie } from "react-chartjs-2"
import { UserContext } from '../../context/UserContext';


const Home = () => {
    const pielebel = ["1", "2", "3", "4"]
    const { clientlength, invlength, getallinv, getallsale } = useContext(UserContext)

    return (
        <div className='home'>
            <h1>Hii, Admin</h1>
            <div className="home-sec1">
                <div className="boxes">
                    <div className="card">
                        <FaPeopleGroup className='client-ico' />
                        <h3>No. of Clients</h3>
                        <h2>{clientlength}</h2>
                    </div>
                    <div className="card">
                        <FaFileInvoice className='client-ico' />
                        <h3>No. of Invoices</h3>
                        <h2>{invlength}</h2>
                    </div>
                    <div className="card">
                        <MdPersonAddAlt1 className='client-ico' />
                        <h3>Add New Clients</h3>
                        <Link className='link'>Add</Link>
                    </div>
                    <div className="card">
                        <h3>Add New Invoices</h3>
                        <Link className='link'>Add</Link>
                    </div>
                </div>
                <h2 className='chart-head'>Data Of last four Invoice</h2>
                <div className="chart-bar">

                    <div className="pie">

                        <Pie data={{
                            labels: getallinv,
                            datasets: [{
                                label: 'Price',
                                data: getallsale,
                                backgroundColor: [
                                    "#F7EBE0",
                                    "#fff",
                                    '#8CB9BD',
                                    '#C1F2B0'
                                ]
                            }]
                        }} />
                    </div>
                    <div className="line">
                        <Bar data={{
                            labels: getallsale,
                            datasets: [{
                                label: 'Intensity',
                                data: pielebel,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                            }]
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
