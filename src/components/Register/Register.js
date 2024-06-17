import React from 'react';
import './Register.scss';
import { useHistory } from "react-router-dom";

const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            Nguyen Hong Son
                        </div >
                        <div className='detail'>
                            JWT Demo.
                        </div >
                    </div >
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 mx-sm-0 mx-3'>
                        <div className='brand d-sm-none'>
                            Nguyen Hong Son
                        </div >
                        <div className='form-group'>
                            <label>Email:</label>
                            <input className='form-control' type='text' placeholder='Email address' />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input className='form-control' type='text' placeholder='Phone number' />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input className='form-control' type='text' placeholder='Username' />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input className='form-control' type='password' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input className='form-control' type='password' placeholder='Re-enter password' />
                        </div>
                        <button className='btn btn-primary'>Login</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>Already have an account? Login</button>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
}

export default Register;