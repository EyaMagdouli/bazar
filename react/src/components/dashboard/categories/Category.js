import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { rolesCategories } from './rolesCategories'
import { Row, Column } from 'react-foundation';
import { Link } from 'react-router-dom';
import axios from "axios"
import swal from 'sweetalert';

const Category = () => {

  const  [categoryList, setCategoryList] = useState([

  ])            
  useEffect(() => {
    
    axios.get(`/api/viewCategory`).then(res=>{
      console.log(res.data.category)
      if(res.status === 200){
        setCategoryList(res.data.category)
      }
    })

  }, [])

  const deleteCategory= (e, id) => {
    e.preventDefault();

    axios.delete(`api/deleteCategory/${id}`).then(res=>{
      if(res.data.status === 200){
        swal("Success",res.data.message,"success")

      }
      else if(res.data.status === 404) {
        swal("Success",res.data.message,"success")

      }

    })
  }

  var viewCategory_table=categoryList.map( (item)=> {
    return (
      <tr key={item.id} >
        <td className="text-nowrap align-middle"> {item.id} </td>
        <td className="text-nowrap align-middle"> {item.name} </td>
        <td className="text-nowrap align-middle"> {item.slug} </td>
        <td className="text-nowrap align-middle"> {item.description} </td>
        <td className="text-center align-middle">
        <div className="btn-group align-top">
                            <Link to={`/buyer/dashboard/categories/edit/${item.id}`} style={{
                              backgroundColor: "#4CAF50", /* Green */
                              border: "1px solid ",
                              color: "white",
                              padding: "5px 12px",
                              textAlign: "center",
                              textDecoration: "none",
                              display: "inline-block",
                              fontSize: "12px"
                            }}  data-toggle="modal" data-target="#user-form-modal">Edit</Link>
                            <button type="button" style={{
                              backgroundColor: "#4CAF50",
                              border: "1px solid ",
                              color: "white",
                              padding: "5px 12px",
                              textAlign: "center",
                              textDecoration: "none",
                              display: "inline-block",
                              fontSize: "12px",
                              marginLeft:"5px"
                            }} onClick={(e)=>deleteCategory(e, item.id)}
                            ><i className="fa fa-trash" style={{color:"red"}}></i></button>
                        </div>
        </td>
      </tr>
    )
  } );


  /* const params = useParams()
  const nav = useNavigate()
  const categories = rolesCategories.find(e=>e.role === params.role)
  useEffect(() => {
    if(!categories) nav("/")
  }, []) */
  return <div className='container py-5'>
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
            <h2 className="mr-2">Categories</h2>
            <Link to="/buyer/dashboard/categories/add">
            <button style={{
                              backgroundColor: "#4CAF50", /* Green */
                              border: "1px solid ",
                              top:"-80px",
                              color: "white",
                              padding: "6px 15px",
                              textAlign: "center",
                              textDecoration: "none",
                              display: "inline-block",
                              fontSize: "14px",
                              marginLeft:"700px"
                            }} type="button" data-toggle="modal" data-target="#user-form-modal">Add Category</button>
                          </Link>

              <div className="e-table"> 
                <div className="table-responsive table-lg mt-3">
                  <table className="table table-bordered"  style={{width:"800px "}}>
                    <thead>
                        <tr>
                        <th className="max-width">
                            ID
                        </th>
                        <th className="max-width">
                            Name
                        </th>
                        <th className='sortable' >
                            Slug
                        </th>
                        <th className="max-width"> 
                          Description
                        </th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {viewCategory_table}
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
  
  
  
  
  
  /* !categories ? null : (
    <div>
      YOU ARE A {
        categories.role
      }
      <br />
      YOU HAVE THESE CATEGS: <br />
      <ul>
        {
          categories.categories.map((e,i)=>(
            <li key={i}>{e.name}</li>
          ))
        }
      </ul>
    </div>
  ) */
}

export default Category