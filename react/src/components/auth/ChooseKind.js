import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import planter from './images/planter.jpg'
import retailer from './images/retailer.jpg'
import wholesaler from './images/wholesaler.jpg'
import transformer from './images/transformer.jpg'

export default function ChooseKind() {
  return (
    <div className='container py-5'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header '>
                        <h4> Register as a simple user
                            <Link to={'/register'}>
                                <button className='btn btn-success float-end btn-sm'>Register</button>
                            </Link>
                        </h4>
                    </div>
                    <div className='card-body row' >
                        <h3>Or register as</h3>
                        <div className="card col-sm-3 " >
                        <Link to={'/register'}>
                            <img src={planter} alt="Planter" style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>Planter</b></h4>
                                </div>
                        </Link>
                        </div>
                        <div className="card col-sm-3">
                        <Link to={'/register'}>
                            <img src={wholesaler} alt="WholeSaler" style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>WholeSaler</b></h4>
                                </div>
                        </Link>
                        </div>
                        <div className="card col-sm-3">
                        <Link to={'/register'}>
                            <img src={retailer } alt="Retailer"  style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>Retailer</b></h4>
                                </div>
                        </Link>
                        </div>
                        <div className="card col-sm-3">
                        <Link to={'/register'}>
                            <img src={transformer } alt="Transformer"  style={{width:'200px'}}/>
                                <div className="container">
                                    <h4><b>Transformer</b></h4>
                                </div>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
