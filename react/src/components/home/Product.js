import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Product = () => {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);

  const { product_id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`api/product/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        console.log(res.data.product);
        setLoading(false);
      }
    });
  }, [product_id]);

  return (
    <div
      className="container py-5"
      style={{ top: "60px", left: "200px", justifyContent: "center" }}
    >
      <div
        className="card"
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          width: 800,
        }}
      >
        {loading ? (
          <h2 style={{ marginLeft: "80px"}}>Loading..</h2>
        ): (
          <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {product.map((item,i) => {
            return (
              <div className="row" key={i}>
            <div className="col-md-4 border-end">
              <img
                  src={`http://127.0.0.1:8000/${item.image}`}
                   alt={item.name}
                 /> 
            </div>
            <div className="col-md-8">
              <h4>
                {item.name}
                <span className="float-end badge btn-sm btn-danger badge-pill"></span>
              </h4>
              <p>{item.description}</p>
              <p>category:{item.category.name}</p>
              <p>marketplace:{item.marketplace.name}</p>
              <h4 className="mb-1">
               price: {item.price}
                <s className="ms-2"> quantity {item.qty}</s>
              </h4>
              <div>
                <label className="btn-sm btn-success px-4 mt-2">In stock</label>
                <div className="row">
                  <div className="col-md-3 mt-3">
                    <div className="input-group" style={{ width: 100 }}>
                      <button type="button" className="input-group-text">
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        // value="1"
                      />
                      <button type="button" className="input-group-text">
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="col-md-3 mt-3"
                    style={{ width: 100, marginLeft: 200 }}
                  >
                    <button type="button" className="btn btn-primary w-100">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          })}
          
        </div>
        )}
        
      </div>
    </div>

    //   <section className="container mt-5">
    //   {loading ? (
    //     <h2 style={{ marginLeft: "80px", marginTop: "-20px" }}>Loading..</h2>
    //   ) : (
    //     <div className="row d-flex justify-content-center">
    //     <div className="col-md-7">

    //     {product.map((item, i) => {
    //       return (
    //         <div key={i} assName="card p-3 py-4">
    //           <div className="col-lg-6">
    //             <div
    //               className="about-text go-to"
    //               style={{ marginLeft: "150px" }}
    //             >
    //               <h3 className="dark-color"> {item.name} </h3>
    //               <h6 className="theme-color lead"> {item.slug} </h6>
    //               <p>
    //                 <mark> By {item.marketplace.name} </mark>
    //               </p>
    //               <p>{item.description}</p>
    //               <p>quantity:{item.qty}</p>
    //               <p>price:{item.price}</p>
    //             </div>
    //           </div>
    //           <div className="col-lg-6">
    //             <div
    //               className="about-avatar"
    //               style={{ marginLeft: "200px", marginTop: "-40px" }}
    //             >
    //               <img
    //                 src={`http://127.0.0.1:8000/${item.image}`}
    //                 alt={item.name}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    //   </div>

    //   )}

    // </section>
  );
};

export default Product;
