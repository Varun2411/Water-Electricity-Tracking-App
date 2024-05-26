import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
         <div className="container-fluid d-flex justify-content-center">
           <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-disabled="true">About </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
