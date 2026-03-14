import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };

  let curr_user = sessionStorage.getItem('username')

  let home_page_items = (
    <div className="loginlink">
      <a className="homepage_links" href="/login">Login</a>
      <a className="homepage_links" href="/register">Register</a>
    </div>
  );

  if (curr_user !== null && curr_user !== "") {
    home_page_items = (
      <div className="loginlink">
        <span className="homepage_links">{curr_user}</span>
        <a className="homepage_links" href="/" onClick={logout}>Logout</a>
      </div>
    );
  }

  return (
    <div className="page">
      <nav className="navbar navbar-expand-lg navbar-light top-nav">
        <div className="container-fluid">
          <a className="navbar-brand brand" href="/">Dealerships</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" style={{ fontSize: "larger" }} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/contact">Contact Us</a>
              </li>
            </ul>
            <span className="navbar-text">
              {home_page_items}
            </span>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
