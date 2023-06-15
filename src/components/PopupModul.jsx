import React from 'react'

function PopupModul({display, setDisplay}) {
const deleteHistory = ()=>{
    localStorage.setItem("flights", JSON.stringify([]))
    localStorage.clear("total-provision-earned")
    setDisplay(false)

}

  return (
    <div className={display ? 'popupContainer' : "popupContainer displayNone"}>
        <div className="popup">
            <h2 className='deleteAlert'>Are you sure you want to delete your flights? You will not get them back.</h2>
            <div className="buttonContainer">
        <button onClick={()=>deleteHistory()} className='modulBtn'>Delete</button>
        <button onClick={()=>setDisplay(false)} className='modulBtn'>Keep</button>
            </div>
        </div>
    </div>
  )
}

export default PopupModul