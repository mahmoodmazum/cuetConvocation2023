import React from 'react'
import {Link} from 'react-router-dom'; 

export default function EligibilityCheck(props) {
  return (
    <>
    <div className="d-flex flex-column justify-content-between">
    <div className="row justify-content-center mt-5">
      <div className="text-center page-404">
        <h1 className="error-title">Hi</h1>
        <p className="pt-4 pb-5 error-subtitle">{props.msg}</p>
        <Link className="btn btn-primary btn-pill" to={props.url}>{props.btnName}</Link>
      </div>
    </div>
  </div>
          
               </>
  )
}
