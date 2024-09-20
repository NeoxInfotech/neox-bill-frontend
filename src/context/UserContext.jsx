import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { server } from "../main";



export const UserContext = createContext();



export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [clientlength, setClientLength] = useState([])
    const [invlength, setInvLength] = useState([])
    const [getallinv, setGetAllInv] = useState([])
    const [getallsale, setGetAllSale] = useState([])

    const getClients = async () => {
        const res = await axios.get(`${server}/client/getallclients`, { withCredentials: true })
        const inv = await axios.get(`${server}/invoice/getinvoices`, { withCredentials: true })
        const getsales = inv.data.message.map((e) => e.project.map((e) => e.pamount))
        const getTotalsales = getsales.map(e => e.reduce((a, e) => a = ~~a + ~~e, 0)).slice(0, 4)
        setGetAllSale(getTotalsales)
        const getAllInv = inv.data.message.map((e) => e.specify).slice(0, 4)
        setGetAllInv(getAllInv)
        console.log(getAllInv, getTotalsales)

        setInvLength(inv.data.message.length)
        setClientLength(res.data.response.length)
    }

    const getUser = async () => {
        try {
            const res = await axios.get(`${server}/auth/refetch`, { withCredentials: true })
            setUser(res?.data.user)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUser();
        getClients()
    }, [])



    return (
        <UserContext.Provider value={{ user, setUser, clientlength, invlength, getallinv, getallsale }}>
            {children}
        </UserContext.Provider>
    )
}