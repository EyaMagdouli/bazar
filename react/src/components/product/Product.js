import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <div className='container py-5'>
  <div className="card" style={{display: 'flex',  justifyContent:'center', width:"900px", marginLeft:"140px"}}>
    <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          
      <div className="row flex-lg-nowrap">
        
        <div>
          <div className="e-panel card" >
            
            <div className="card-body">
            <div className='cardHeader' >
            <h2 >Products</h2>
            <Link to="/buyer/dashboard/products/add">
            <button className="btn btn-success" type="button" data-toggle="modal" data-target="#user-form-modal">Add Product</button>
            </Link>
            </div>
            

              <div className="e-table"> 
                <div className="table-responsive table-lg mt-3">
                  <table className="table table-bordered"  style={{width:"800px "}}>
                    <thead>
                        <tr>
                        <th className="max-width">
                            ID
                        </th>
                        <th className="max-width">
                            Image
                        </th>
                        <th className="max-width">
                            Name
                        </th>
                        <th className='sortable' >
                            Slug
                        </th>
                        <th className='max-width' >
                            Price
                        </th>
                        <th className="max-width"> 
                          Description
                        </th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {/* {viewCategory_table} */}
                    </tbody>
                  </table>
                </div>

              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Product