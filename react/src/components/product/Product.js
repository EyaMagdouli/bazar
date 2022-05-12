import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get(`/api/viewProduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(res.data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const deleteProduct = (e, id) => {
    e.preventDefault();

    axios.delete(`api/deleteProduct/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setProduct((prev) => prev.filter((item) => item.id == id));
        location.reload();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
      }
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(product.length / productsPerPage); i++) {
    PageNumbers.push(i);
  }

  if (loading) {
    return <h2 style={{ marginLeft: "80px", marginTop: "40px" }}>Loading..</h2>;
  }
  var displayProductData = currentProducts.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          {" "}
          <img
            src={`http://127.0.0.1:8000/${item.image}`}
            width="50px"
            alt={item.name}
          />{" "}
        </td>
        <td>{item.name}</td>
        <td>{item.category.name}</td>
        <td>{item.price} {item.priceUnity} </td>
        <td> {item.qty} {item.qtyUnity}</td>
        <td>{item.description}</td>
        <td>
          <div className="btn-group align-top">
            <button type="button">
              <Link
                to={`/dashboard/products/edit/${item.id}`}
                style={{
                  color: "blue",
                  fontSize: "17px",
                  marginRight: "10px",
                  textDecoration: "none",
                }}
              >
                <i className="far fa-edit"></i> Edit{" "}
              </Link>
            </button>
            <button
              type="button"
              onClick={(e) => deleteProduct(e, item.id)}
              style={{ color: "red", fontSize: "16px" }}
            >
              <i className="fa fa-trash"></i>
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });



  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="data" style={{top:-40, left:80}}>
      <div className="recentData">
        <div className="cardHeader">
          <h1 className="title">Products</h1>
          <Link to="/dashboard/products/add">
            <button className="button" type="button">
              Add Product
            </button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Image</td>
              <td>Name</td>
              <td>Category</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>{displayProductData}</tbody>
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
  );
};

export default Product;
