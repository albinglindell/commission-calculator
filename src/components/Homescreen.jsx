import React, {useContext, useState}from 'react'
// import { Link } from 'react-router-dom'
import PopupModul from './PopupModul'
import Nav from './Nav'
import Header from './Header'
import DataContext from '../store/dataContext'
import LineChart from './LineChart'

function Homescreen() {
    const [display, setDisplay]= useState(false)
    const { totalProvision, monthlyTotals } = useContext(DataContext);



  return (
    <div className='homeScreen'>
      <div>
      <Header heading={"Dashboard"}/>
        <h2 className='total-provision'>Total commission: {totalProvision ? totalProvision : "0"}kr</h2>
        {monthlyTotals && <LineChart />}
      </div>
        <PopupModul display={display} setDisplay={setDisplay} />
        <Nav page={"home"}/>
    </div>
  )
}

export default Homescreen