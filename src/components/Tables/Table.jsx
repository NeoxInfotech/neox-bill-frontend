import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { Link } from "react-router-dom"

const Table = ({ tablehead, tabledata, deleteButt, editButt, headfont, statusPaid }) => {
    const [currentpage, setCurrentPage] = useState(1)
    const [clientname, setClientName] = useState('')
    const [tablerecords, setTableRecords] = useState([...tabledata])
    const [entries, setEntries] = useState(5)
    const [entry, setEntry] = useState(0)
    const recordsPerPage = entries;
    const lastIndex = currentpage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = tabledata.slice(firstIndex, lastIndex)
    const npage = Math.ceil(tabledata.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const getData = () => {
        if (clientname.length === 0) {
            setTableRecords([...tabledata])
        } else {
            const filterData = tablerecords.filter(f => f.cname.toLowerCase().includes(clientname.toLowerCase()))
            setTableRecords([...filterData])
        }


    }

    const prevPage = () => {
        if (currentpage !== firstIndex) {
            setCurrentPage(currentpage - 1)
        }

    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentpage !== lastIndex) {
            setCurrentPage(currentpage + 1)
        }
    }
    const handleEntries = () => {
        if (entry <= 0) {
            setEntries(5)
        } else {
            setEntries(entry)
        }
    }
    useEffect(() => {
        setTableRecords([...tabledata])
    }, [tabledata])
    return (
        <>
            <div className="up-table">
                <div className="search">
                    <input onChange={(e) => setClientName(e.target.value)} type="text" placeholder='Search Clients' />
                    <button onClick={getData}>Search</button>
                </div>
                <div className="entries">
                    <input type="number" placeholder='Entries - 5' onChange={(e) => setEntry(e.target.value)} />
                    <button onClick={handleEntries}>Enter</button>
                </div>
            </div>
            <table className='table'>
                <tr>
                    {
                        tablehead.map((th) => (
                            <th style={{ fontSize: headfont }} key={th.id}>{th.headers}</th>
                        ))
                    }

                </tr>
                {
                    tablerecords?.map((td) => (
                        <tr key={td._id} >
                            <td>{td.cname}</td>
                            <td>{td.address1} <br /> {td.address2}</td>
                            <td>{td.phone}</td>
                            <td>{td.specify}</td>
                            {td.pinv ? <td>{td?.pinv}</td> : null}
                            {td.project || td?.project === 0 ? <td>
                                {
                                    td?.project?.reduce((a, e) => a = ~~a + ~~e.pamount, 0)
                                }
                            </td> : <td>{td.sales || td.sales === 0 ? td.sales : 0}</td>}
                            <td><Link to={`/invoice/${td.pinv}`}>Doc</Link></td>
                            {td?.status ?
                                <td >
                                    <span className='paid'>Paid</span>
                                </td> :
                                td?.status === false ?
                                    <td><span onClick={() => statusPaid(td?.pinv)} className='pending'>Pending</span></td> : null}
                            <td className='action-butts'>
                                <button onClick={() => deleteButt(td?._id)}>Delete</button>
                                <button onClick={() => editButt(td?._id)}>Edit</button>
                            </td>
                        </tr>
                    )).slice(firstIndex, lastIndex)
                }


            </table>

            <div className="pagination">
                <div className="prev">
                    <span onClick={prevPage}>Previous</span>
                </div>
                {
                    numbers.map((n, i) => (
                        <span key={i} className={`page-item ${currentpage === n ? 'active' : ''}`} onClick={() => changeCPage(n)}>
                            {n}
                        </span>
                    ))
                }
                <div className="next">
                    <span onClick={nextPage}>Next</span>
                </div>
            </div>
        </>
    )
}

export default Table
