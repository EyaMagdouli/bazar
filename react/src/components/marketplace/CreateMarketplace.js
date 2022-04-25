import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateMarketplace = () => {
  const navigate = useNavigate();
  const [marketInput, setMarket] = useState({
    name: "",
    slug: "",
    description: "",
    error_list: [],
  });

  const [image, setImage] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setMarket({ ...marketInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage({ image: e.target.files[0] });
  };

  const marketSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", marketInput.name);
    formData.append("slug", marketInput.slug);
    formData.append("image", image.image);
    formData.append("description", marketInput.description);
    formData.append("token", localStorage.getItem("auth_token"));

    const token = localStorage.getItem("auth_token");
    axios
      .post("/api/createMarket", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data);
          swal("Success", res.data.message, "success");
          navigate(`/dashboard/marketplace`);
        } else {
          setMarket({ ...marketInput, error_list: res.data.errors });
        }
      });
  };

  return (
    <div className="container py-5">
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "800px",
          left: "200px",
          top: "20px",
        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <form className="login100-form validate-form" onSubmit={marketSubmit}>
            <span className="login100-form-title">Create Marketplace</span>

            <div className="wrap-input100 validate-input">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Name
                <span className="text-danger"> *</span>
              </label>
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInput}
                value={marketInput.name || ""}
              />
              <span style={{ color: "red" }}>
                {marketInput.error_list.name}
              </span>
            </div>
            <div className="wrap-input100 validate-input">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Slug
                <span className="text-danger"> *</span>
              </label>
              <input
                className="input100"
                type="text"
                name="slug"
                placeholder="Slug"
                onChange={handleInput}
                value={marketInput.slug || ""}
              />
              <span style={{ color: "red" }}>
                {marketInput.error_list.slug}
              </span>
            </div>
            <div className="wrap-input100 validate-input">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Description
                <span className="text-danger"> *</span>
              </label>
              <textarea
                className="input100"
                type="text"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                onChange={handleInput}
                value={marketInput.description || ""}
              />
              <span style={{ color: "red" }}>
                {marketInput.error_list.description}
              </span>
            </div>
            <label
              style={{ fontSize: "15px" }}
              className="form-control-label px-3"
            >
              Image
              <span className="text-danger"> *</span>
            </label>
            <button type="button" className="btn btn-success ">
              <input
                style={{ width: "300px", height: "30px", fontSize: "14px" }}
                type="file"
                name="image"
                onChange={handleImage}
              />
            </button>

            <i className="fa fa-picture-o" aria-hidden="true"></i>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketplace;
