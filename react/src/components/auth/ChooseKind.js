import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import planter from '../../assets/images/planter.jpg'
import retailer from '../../assets/images/retailer.jpg'
import wholesaler from '../../assets/images/wholesaler.jpg'
import transformer from '../../assets/images/transformer.jpg'
import { isLoggedIn } from './checkIsLoggedIn'

export default function ChooseKind() {
const navigate = useNavigate()
  useEffect(() => {
    if(isLoggedIn()) navigate("/")
  }, [])
  return (
    <div className='container py-5' style={{top:'100px', left:"70px"}}>
                <div className='card1'>
                    <div className='card-header ' style={{height:50}}>
                        <h3> Register as a simple user
                            <Link to={'/register'} state={{kind: "simpleUser"}}>
                                <button className='btn btn-success float-end btn-sm' style={{fontSize:"18px"}}>Register</button>
                            </Link>
                        </h3>
                    </div>
                    <div className='card-body row'  style={{height:"300px"}}>
                        <h3>Or register as</h3>
                        <div className="card col-sm-3 " >
                        <Link to={'/register'} state={{kind: "planter"}}>
                            <img src={planter} alt="Planter" style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>Planter</b></h4>
                                </div>
                        </Link>
                        </div>
                        <div className="card col-sm-3">
                        <Link to={'/register'} state={{kind: "wholesaler"}}>
                            <img src={wholesaler} alt="WholeSaler" style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>WholeSaler</b></h4>
                                </div>
                        </Link>
                        </div>
                        <div className="card col-sm-3">
                        <Link to={'/register'} state={{kind: "retailer"}}>
                            <img src={retailer } alt="Retailer"  style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>Retailer</b></h4>
                                </div>
                        </Link>
                        </div>
                        <div className="card col-sm-3">
                        <Link to={'/register'} state={{kind: "transformer"}}>
                            <img src={transformer } alt="Transformer"  style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>Transformer</b></h4>
                                </div>
                        </Link>
                        </div>
                    </div>
                </div>
     


    </div>
  )
}
