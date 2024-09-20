import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './screens/home/Home'
import Login from './screens/auth/Login/Login'
import Header from './components/Header/Header'
import CreateInvoice from './screens/CreateInvoice/CreateInvoice'
import Clients from './screens/Clients/Clients'
import AddClient from './screens/addclient/AddClient'
import AllHistory from './screens/history/AllHistory'
import Report from './screens/report/Report'
import Invoice from './screens/Invoice/Invoice'
import Profile from './screens/profile/Profile'
import Request from './screens/auth/Register/Request'
import RegisterUser from './screens/RegisterUser/RegisterUser'
import { UserContext } from './context/UserContext'

const App = () => {
  const { user } = useContext(UserContext)
  return (

    <>
      {
        user ?
          <div className='page'>
            <Header />
            <div className="body">
              <div className="head">
                <span>App Updates and Details</span>
                <div className='head-right'>
                  <Link className='link' to={"/profile"}>Profile</Link>
                </div>
              </div>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/createinvoice' element={<CreateInvoice />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/addclients' element={<AddClient />} />
                <Route path='/history' element={<AllHistory />} />
                <Route path='/report' element={<Report />} />
                <Route path='/invoice/:name' element={<Invoice />} />
                <Route path='/profile' element={<Profile />} />
                {user?.relation === "Owner" ? <Route path='/registeruser' element={<RegisterUser />} /> : null}
                <Route path='*' element={<Home />} />
              </Routes>
            </div>
          </div> :
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/request' element={<Request />} />
            <Route path='*' element={<Login />} />
          </Routes>
      }
    </>


  )
}

export default App
