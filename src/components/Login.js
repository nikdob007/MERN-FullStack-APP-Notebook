import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const host = "http://localhost:5000";

    const [credential, setCredential] = useState({email: "", password: ""})

    let navigate  = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        //  API CALL
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            navigate("/");
            props.showAlert("Successfully Log in", "success" )
        }
        else {
            props.showAlert("Invalid Credentials", "danger" )
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
        <h2 className='mt-5'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credential.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} onChange={onChange} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
