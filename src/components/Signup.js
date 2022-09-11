import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const host = "http://localhost:5000";

    const [credential, setCredential] = useState({name:"",email: "", password: "",cpassword: ""})

    let navigate  = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        //  API CALL
        const {name, email, password} = credential;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            navigate("/");
            props.showAlert("Successfully Account created", "success" )
        }
        else {
            props.showAlert("Invalid Credential", "danger" )
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

  return (
    <div className='container'>
      <h2 className='mt-5'>Create new account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name"  onChange={onChange} name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email"  onChange={onChange} name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password"  onChange={onChange} name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="cpassword"  onChange={onChange} name="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
