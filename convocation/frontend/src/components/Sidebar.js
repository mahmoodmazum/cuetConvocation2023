import React from 'react'
import {Link} from 'react-router-dom'; 

export default function Sidebar(props) {
  return (
    <div>
       <aside className="left-sidebar sidebar-dark" id="left-sidebar">
          <div id="sidebar" className="sidebar sidebar-with-footer">
            
            <div className="app-brand">
              <a href="/index.html">
                <img src="images/cuet_logo.png" alt="Mono"/>
                <span className="brand-name">{props.title}</span>
              </a>
            </div>
            <div className="sidebar-left" data-simplebar >
              
              <ul className="nav sidebar-inner" id="sidebar-menu">
                
      
                
                  <li
                   className="active"
                   >
                    <a className="sidenav-item-link" href="https://www.cuet.ac.bd/">
                      <i className="mdi mdi-briefcase-account-outline"></i>
                      <span className="nav-text">{props.uniName}</span>
                    </a>
                  </li>
                
      
                
      
                
                  <li
                   >
                    <Link className="sidenav-item-link" to="/">
                      <i className="mdi mdi-home"></i>
                      <span className="nav-text">{props.home}</span>
                    </Link>
                  </li>
                
      
                
      
                
                  <li className="section-title">
                    {props.sectionName1}
                  </li>
                
      
                
      
                
                  <li
                   >
                    <a className="sidenav-item-link" href="/registration_info">
                      <i className="mdi mdi-information"></i>
                      <span className="nav-text">{props.subSectionName1}</span>
                    </a>
                  </li>
                
      
                
      
                
                  <li
                   >
                    
                      <Link className="sidenav-item-link" to="online_registration_form">
                      <i className="mdi mdi-account-group"></i>
                      <span className="nav-text">{props.subSectionName2}</span>
                      </Link>
                      
                   
                  </li>
                
      
                  <li>
                   <Link className="sidenav-item-link" to="/download_entry_pass">
                     <i className="mdi mdi-download"></i>
                     <span className="nav-text">{props.subSectionName3}</span>
                   </Link>
                 </li>
      
                
                  <li>
                    <a className="sidenav-item-link" href="team.html">
                      <i className="mdi mdi-comment-check"></i>
                      <span className="nav-text">{props.subSectionName4}</span>
                    </a>
                  </li>
                
      
                
      
                
                  <li
                   >
                    <a className="sidenav-item-link" href="calendar.html">
                      <i className="mdi mdi-close-octagon"></i>
                      <span className="nav-text">{props.subSectionName5}</span>
                    </a>
                  </li>
      
                  <li
                   >
                    <a className="sidenav-item-link" href="calendar.html">
                      <i className="mdi mdi-calendar-check"></i>
                      <span className="nav-text">{props.subSectionName6}</span>
                    </a>
                  </li>
                
      
                
      
                
      
                
                  
                
      
      
               
              </ul>
      
            </div>
      
            
          </div>
        </aside>
    </div>
  )
}
