import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
  return (
      <div id="app" className="container">
        <div id="nav" className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link to="/" className="d-flex align-items-center mb-1 mb-md-0 me-md-auto text-dark text-decoration-none" >
            <span className="fs-4">BizTrips</span>
          </Link>
          <ul className="nav nav-pills">
            <li className="nav-item"><Link to="/trips" className="nav-link">Trips</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
          </ul>
        </div>
      </div>
  );
}
