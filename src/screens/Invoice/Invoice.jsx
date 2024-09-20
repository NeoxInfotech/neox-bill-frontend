import React, { useEffect, useRef, useState } from 'react'
import "./styles.scss"
import { useReactToPrint } from 'react-to-print'
import nneox from "../../assets/neox-full.png"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main'

const Invoice = () => {
    const componentRef = useRef()
    const pdfRef = useRef()
    const params = useParams().name
    const [inv, setInv] = useState([])
    console.log(params)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
        documentTitle: "Client-Data",
        onAfterPrint: () => alert("Print Success"),
        pageStyle: `
      @media print {
        @page { margin: 0; }
      }
    //   body {
    //     -webkit-print-color-adjust: exact;
    //   }
    `,
    })

    const getInvoice = async () => {
        try {
            const res = await axios.get(`${server}/invoice/getinvoice/${params}`, { withCredentials: true })
            setInv(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const arrayOfNumbers = inv?.project?.reduce((a, e) => a = ~~a + ~~e.pamount, 0)
    useEffect(() => {
        getInvoice()
    }, [])

    return (
        <div className='all'>
            <div className="doc" ref={componentRef} >
                <div className="doc-head">
                    <img src={nneox} alt="" className='neox-img' />
                    <div className="doc-head-text">
                        <h2>NEOX INOTECH</h2>
                        <h4>Get your future tech solutions with us</h4>
                    </div>
                </div>
                <div className="doc-addresses">
                    <div className="client-address">
                        <h4>{inv.specify}</h4>
                        <h4>{inv.address1}</h4>
                        <h4>{inv.address2}</h4>
                        <h4>{inv.phone}</h4>
                    </div>
                    <div className="company-address">
                        <h4>Neox Infotech</h4>
                        <h4>Kolaghat, Mecheda</h4>
                        <h4>Purba Medinipur, West Bengal</h4>
                        <h4>+91 7001735441 / +91 9153422783</h4>
                    </div>

                </div>
                <div className="inv-date">
                    <span>Invoice No - {inv.pinv}</span>
                    <span>Date - {inv?.createdAt?.slice(0, 10)}</span>
                </div>

                <div className="inv-table">
                    <table className='table-box'>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Details</th>
                            <th>Price</th>
                        </tr>
                        {
                            inv?.project?.map((p) => (
                                <tr>
                                    <td>{p.pname}</td>
                                    <td>{p.pqty}</td>
                                    <td>{p.pdetails}</td>
                                    <td>{p.pamount}</td>
                                </tr>
                            ))
                        }

                    </table>
                    <div className="total">
                        <h4>Total - Rs - {arrayOfNumbers}</h4>
                    </div>
                </div>
                <div className="bottom">
                    <p className='personalinfo'>
                        Make all checks payable to NEOX INFOTECH <br />
                        If you have any questions concerning this bill, contact NEOX INFOTECH,<br />
                        info@neoxinfotech.com https://www.neoxinfotech.com/ <br />
                        UCO BANK,<br />
                        NEOX INFOTECH(ANIMESH QUILA) <br />
                        A/C NO : 08000110010952 <br />
                        IFSC CODE: UCBA0000800 <br />
                        UPI ID: ANIBCOMP@OKICICI <br />
                        BRANCH NAME : MECHEDA <br />
                        <br />
                    </p>
                    <h2>THANK YOU FOR YOUR BUSINESS!</h2>
                </div>
            </div>
            <button onClick={handlePrint} >Download</button>
        </div>
    )
}

export default Invoice
