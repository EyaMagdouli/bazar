import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";

const EditProduct = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [productInput, setProduct] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
  });
  const [error, setError] = useState([]);

  const [image, setImage] = useState([]);

  const handleImage = (e) => {
    setImage({ image: e.target.files[0] });
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
        //console.log(res.data.product_id)
        setProduct(res.data.product);
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

    axios.post(`/api/updateProduct/${product_id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        navigate("/dashboard/products");
      } else if (res.data.status === 422) {
        setCategory({ ...productInput, error_list: res.data.errors });
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
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Name
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
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Price
              </label>
              <input
                name="price"
                type="text"
                className="form-control"
                onChange={handleInput}
                value={productInput.price}
              />
              <span style={{ color: "red" }}>{error.price}</span>
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Category
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
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="form-control-file"
                onChange={handleImage}
              />
              <span style={{ color: "red" }}>{error.image}</span>
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
