import React from 'react'
import './citypage.css'

const CityPage = () => {
  return (
    <div className='container'>
      <div style={{ maxHeight: "200px",minHeight:"75vh" ,overflowY: "",width:"100%",background:"#fff",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}} className='scroll-container'>
          
      </div>
      <div style={{width:"100%"}}>
        <div style={{ padding: '20px', background: '#0a75ad', color: '#fff',borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px" }}>

        <input type="text" style={{ padding: '10px', width: '70%', borderRadius: '5px' }}/>
        <button style={{borderRadius:"50%" ,height:"40px",width:"40px" , background:"#ff9800",marginLeft:"7px"}}>
          {
            "->"
          }
        </button>
        </div>
      </div>
    </div>
  )
}

export default CityPage