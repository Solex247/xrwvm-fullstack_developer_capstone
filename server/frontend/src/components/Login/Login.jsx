import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)

  let login_url = window.location.origin+"/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);        
    }
    else {
      alert("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    <div>
      <Header/>
    <div onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
          <form className="login_panel" onSubmit={login}>
              <div className="auth-header">
                <h2>Sign in</h2>
                <p>Access your dealership account.</p>
              </div>
              <div className="field_group">
                <label className="field_label" htmlFor="login-username">Username</label>
                <input id="login-username" type="text" name="username" placeholder="Username" className="field_input" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div className="field_group">
                <label className="field_label" htmlFor="login-password">Password</label>
                <input id="login-password" name="psw" type="password"  placeholder="Password" className="field_input" onChange={(e) => setPassword(e.target.value)}/>            
              </div>
              <div className="action_row">
                <input className="action_button primary" type="submit" value="Login"/>
                <input className="action_button ghost" type="button" value="Cancel" onClick={()=>setOpen(false)}/>
              </div>
              <a className="loginlink auth-link" href="/register">Register Now</a>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
