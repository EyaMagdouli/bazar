import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router'

const Marketplace = () => {

  const [marketplace, setMarketplace] = useState([])

  const { marketplace_id } = useParams();
  
  useEffect(() => {
    axios.get(`/api/viewMarket/${marketplace_id}`).then(res=>{
      if(res.data.status === 200){
        console.log(res.data.marketplace)
        setMarketplace(res.data.marketplace)
      }
    })
}, [marketplace_id])




  return (
    <div className='data'>
        <div className='recentData' >
            <div className="row gutters-sm" >
                <div className="col-md-4 mb-3" >
                <div className="card">
                    <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                    <img src={`http://127.0.0.1:8000/${marketplace.image}`} width="50px" alt={marketplace.name} />
                        {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"> */}  
                    </div>
                    </div>
                </div>
                </div>   
            </div>
            <div className="col-md-8" style={{ width:"500px"}}>
              <div className="card mb-3" style={{ left:"400px", top:"-60px", height:"100%"}}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {marketplace.name}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Slug</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {marketplace.slug}
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Description</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {marketplace.description}
                    </div>
                  </div>
                  <br>
                  </br>
                  <div className="row">
                    <div className="col-sm-12">
                    <Link to="/buyer/dashboard/marketplace/edit">
                    <button className='button' type="button" >
                    Edit
                    </button>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
    </div>

  )
}

export default Marketplace