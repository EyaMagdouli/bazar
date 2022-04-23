import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";
import '../../assets/css/marketplace.css'

const Profile = () => {
  const [marketplace, setMarketplace] = useState([]);

  const { marketplace_id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    axios
      .get(`/api/viewMarket/${marketplace_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.marketplace);
          setMarketplace(res.data.marketplace);
        }
      });
  }, [marketplace_id]);

  return (
<div className="container mt-5">
    <div className="row d-flex justify-content-center">
        <div className="col-md-7">
            <div className="card p-3 py-4" style={{top:"60px"}}>
                <div className="text-center"> 
                </div>
                <div className="text-center mt-3">
                    <h5 className="mt-2 mb-0">Alexender Schidmt</h5> <span>UI/UX Designer</span>
                    <div className="px-4 mt-1">
                        <p className="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="buttons">
                     <Link to="/profile/edit">
                     <button className="btn btn-outline-success px-4" style={{fontSize:"15px", height:"30px"}}>
                       Edit
                     </button>
                     </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Profile;
