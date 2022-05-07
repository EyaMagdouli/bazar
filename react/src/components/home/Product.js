import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const Product = () => {

    const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);

  const { product_id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`api/product/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        console.log(res.data.product)
        setLoading(false);
      }
    });
  }, [product_id]);


  return (
    <section className="section about-section gray-bg" id="about">
    {loading ? (
      <h2 style={{ marginLeft: "80px", marginTop: "-20px" }}>Loading..</h2>
    ) : (
      product.map((item, i) => {
        return (
          <div key={i} className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div
                className="about-text go-to"
                style={{ marginLeft: "150px" }}
              >
                <h3 className="dark-color"> {item.name} </h3>
                <h6 className="theme-color lead"> {item.slug} </h6>
                <p>
                  <mark> By {item.marketplace.name} </mark>
                </p>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-avatar"
                style={{ marginLeft: "200px", marginTop: "-40px" }}
              >
                <img
                  src={`http://127.0.0.1:8000/${item.image}`}
                  alt={item.name}
                /> 
              </div>
            </div>
          </div>
        );
      })
    )}

   
  </section>
  )
}

export default Product