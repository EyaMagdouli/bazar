import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";

const Product = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { product_id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`api/product/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
        navigate("/");
      }
    });
  }, [product_id]);
  const handleDecrement = () => {
      if(quantity > 1)
      setQuantity(prevCount => prevCount - 1);
  };
  const handleIncrement = () => {
     if(quantity < product[0].qty) 
      setQuantity(prevCount => prevCount + 1);
     
  };


  const submitAddToCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: product[0].id,
      // product_qty : product.qty,
    };
    const token = localStorage.getItem("auth_token");
    axios
      .post(`/api/addToCart`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 201) {
          swal("Success", res.data.message, "success");
          location.reload();
        } else if (res.data.status == 409) {
          swal("Success", res.data.message, "success");
        } else if (res.data.status == 401) {
          swal("Error", res.data.message, "error");
        } else if (res.data.status == 404) {
          swal("Warning", res.data.message, "warning");
        }
      });
  };

  return (
    <div
      className="container py-5"
      style={{ top: "20px", left: "200px", justifyContent: "center" }}
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
          <h2 style={{ marginLeft: "80px" }}>Loading..</h2>
        ) : (
          <div
            className="card-body"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {product.map((item, i) => {
              return (
                <div className="row" key={i}>
                  <div className="col-md-4 border-end">
                    <img
                      src={`http://127.0.0.1:8000/${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-8 about-text go-to">
                    <h3 className="dark-color ">
                      {item.name}
                      <span className="float-end badge btn-sm btn-danger badge-pill"></span>
                    </h3>
                    <mark style={{ fontSize: 20 }}>
                     {" "}
                      By {item.marketplace.name}{" "}
                    </mark>

                    <p>{item.description}</p>
                    <br></br>
                    <h4 className="mb-1">
                      <s className="ms-2"> price: {item.price} </s>
                      <br></br>
                      <br></br>
                      <s className="ms-2">
                        {" "}
                        quantity available: {item.qty} {item.unity}
                      </s>
                    </h4>
                    <br></br>
                    {item.qty > 0 ? (
                      <div>
                        
                          {/* <div className="row">
                            <div className="col-md-3 mt-3">
                              <div
                                className="input-group"
                                style={{ width: 120, fontSize: 15 }}
                              >
                                <button
                                  type="button"
                                  className="input-group-text"
                                  onClick={handleDecrement}
                                >
                                  -
                                </button>
                                <div className="form-control text-center">
                                  {quantity}
                                </div>
                                <button
                                  type="button"
                                  className="input-group-text"
                                  onClick={handleIncrement}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div> */}
                          <div className="col-md-3 mt-3" style={{ width: 120 }}>
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                              style={{ fontSize: 15 }}
                              onClick={submitAddToCart}
                            >
                              Add to Cart
                            </button>
                          </div>
                      </div>
                    ) : (
                      <div>
                        <label className="btn-sm btn-danger px-4 mt-2">
                          Out of stock
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
