import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";

const EditProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productInput, setProduct] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    qtyUnity: "",
    priceUnity: "",
    qty: "",
  });
  const [error, setError] = useState([]);

  const [image, setImage] = useState("");

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const { product_id } = useParams();
  useEffect(() => {
    axios.get(`api/categories/`).then((res) => {
      if (res.data.status === 200) {
        setCategoryList(res.data.category);
      }
    });

    axios.get(`/api/editProduct/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.product.qty);
        setProduct(res.data.product);
        setImage(res.data.product.image);
        console.log(image);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/dashboard/products");
      }
    });
  }, [product_id]);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.image);
    formData.append("category_id", productInput.category_id);
    formData.append("name", productInput.name);
    formData.append("price", productInput.price);
    formData.append("description", productInput.description);
    formData.append("qty", productInput.qty);
    formData.append("qtyUnity", productInput.qtyUnity);
    formData.append("priceUnity", productInput.priceUnity);
    axios.post(`/api/updateProduct/${product_id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        navigate("/dashboard/products");
      } else if (res.data.status === 422) {
        setCategory({ ...productInput});
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/dashboard/products");
      }
    });
  };

  return (
    <div className="data">
      <div className="recentData">
        <div className="cardHeader">
          <h1 className="title">Edit Product</h1>
          <Link to="/dashboard/products">
            <button className="button" type="button">
              Back
            </button>
          </Link>
        </div>
        <form className="form-card" onSubmit={updateProduct}>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-3 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Name
                <span className="text-danger"> *</span>
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                onChange={handleInput}
                value={productInput.name}
              />
              {<span style={{ color: "red" }}>{error.name}</span>}
            </div>
            <div className="form-group col-sm-2 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Price
                <span className="text-danger"> *</span>
              </label>
              <input
                name="price"
                type="text"
                className="form-control"
                onChange={handleInput}
                value={productInput.price}
              />
              <span style={{ color: "red" }}>{error.price}</span>
                {console.log(error.price)}
            </div>
            <div className="form-group col-sm-7 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Price Unity
                <span className="text-danger"> *</span>
              </label>
                <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceUnity"
                  value="dt"
                  onChange={handleInput}

                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  dt (tunisian dinar)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceUnity"
                  value="usd"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  usd (U.S. Dollar)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceUnity"
                  value="eur"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  eur (European Euro)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceUnity"
                  value="pound"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  pound (Britsh Pound sterling)
                </label>
              </div>
              
              </div>
              
              <span style={{ color: "red" }}>
                {error.priceUnity}
              </span>
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-4 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Category
                <span className="text-danger"> *</span>
              </label>
              <select
                name="category_id"
                className="form-control"
                onChange={handleInput}
                value={productInput.category_id}
              >
                {categoryList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {" "}
                      {item.name}{" "}
                    </option>
                  );
                })}
              </select>
              <span style={{ color: "red" }}>{error.category_id}</span>
            </div>
            <div className="form-group col-sm-3 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Quantity
                <span className="text-danger"> *</span>
              </label>
              <input
                name="qty"
                type="text"
                className="form-control"
                onChange={handleInput}
                value={productInput.qty}
              />
              <span style={{ color: "red" }}>{error.qty}</span>
            </div>
            <div className="form-group col-sm-5 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Quantity Unity
                <span className="text-danger"> *</span>
              </label>
                <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qtyUnity"
                  value="kg"
                  onChange={handleInput}

                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  kg (kilogram)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qtyUnity"
                  value="g"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  g (gram)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qtyUnity"
                  value="t"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  t (ton)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qtyUnity"
                  value="oz"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  oz (ounce)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qtyUnity"
                  value="lb"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  lb (pounds)
                </label>
              </div>
              </div>
              
              <span style={{ color: "red" }}>
                {error.qtyUnity}
              </span>
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                onChange={handleInput}
                value={productInput.description || ""}
              />
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Image
                <span className="text-danger"> *</span>
              </label>
              <div className="text-center mb-2">
                <img src={image} alt="No photo" width="200px" />
              </div>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control-file"
                onChange={handleImage}
              />
              <span style={{ color: "red" }}>{error.image}</span>
              {}
            </div>
          </div>
          <br></br>

          <button
            style={{ width: "600px", marginLeft: "200px", fontSize: "17px" }}
            type="submit"
            className="btn btn-outline-success"
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
