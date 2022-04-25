import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import swal from 'sweetalert';

const Category = () => {

  const  [categoryList, setCategoryList] = useState([])   
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [categoriesPerPage] = useState(3)


  
  useEffect(() => {
    setLoading(true)

    const token = localStorage.getItem("auth_token");
    axios.get(`/api/viewCategory`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }},).then(res=>{
      setCategoryList(res.data.category)
      setLoading(false)
      
    })

  }, [])

  const deleteCategory= (e, id) => {
    e.preventDefault();

    axios.delete(`api/deleteCategory/${id}`).then(res=>{
      if(res.data.status === 200){
        
        swal("Success",res.data.message,"success")
        setCategoryList(prev => prev.filter(item=>item.id == id))
        location.reload();

      }
      else if(res.data.status === 404) {
        swal("Success",res.data.message,"success")

      }

    })
  }

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstProduct = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categoryList.slice(
    indexOfFirstProduct,
    indexOfLastCategory
  );

  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(categoryList.length / categoriesPerPage); i++) {
    PageNumbers.push(i);
  }


  if (loading) {
    return <h2 style={{ marginLeft: "80px", marginTop: "40px" }}>Loading..</h2>;
  }

  var viewCategory_table=currentCategories.map( (item)=> {
    return (
      <tr key={item.id} >
        <td className="text-nowrap align-middle"> {item.id} </td>
        <td className="text-nowrap align-middle"> {item.name} </td>
        <td className="text-nowrap align-middle"> {item.slug} </td>
        <td className="text-nowrap align-middle"> {item.description} </td>
        <td className="text-center align-middle">
        <div className="btn-group align-top">
        <button type="button" >
            <Link to={`/dashboard/categories/edit/${item.id}`} style={{color:"blue", fontSize:"17px" ,marginRight:"10px", textDecoration:"none"}}  >
            <i className="far fa-edit" ></i> Edit </Link>
        </button>
        <button type="button" onClick={(e)=>deleteCategory(e, item.id)} style={{color:"red", fontSize:"16px" }} >
            <i className="fa fa-trash" ></i>
            Delete
         </button>
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
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return <div className='data'>
  <div className='recentData' >
    <div className='cardHeader' >
            <h1 className='title'>Categories</h1>
            <Link to="/dashboard/categories/add">
            <button className='button' type="button" >
              Add Category
              </button>
            </Link>
      </div>
              <table> 
                    <thead>
                        <tr>
                        <td>ID</td>
                        <td> Name</td>
                        <td>Slug</td>
                        <td>Description</td>
                        <td>Actions</td>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {viewCategory_table}
                    </tbody>
              </table>
              <nav style={{marginLeft:"900px"}}>
         <ul className="pagination">
            {PageNumbers.map(number=>(
              <li key={number} className="page-item">
                  <a onClick={()=> paginate(number) }  className="page-link">
                      {number}
                      </a>
              </li>
            ))}          
         </ul>
        </nav>
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