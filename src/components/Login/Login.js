import React from 'react';
import './Login.scss';

const Login = (props) => {
    return (
        <div className='login-container mt-3'>
            <div className='container'>
                <div className='row'>
                    <div className='content-left col-7'>
                        <div className='brand'>
                            Nguyen Hong Son
                        </div >
                        <div className='detail'>
                            Giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div >
                    </div >
                    <div className='content-right col-5 d-flex flex-column gap-3 py-3'>
                        <input className='form-control' type='text' placeholder='Email address or phone number' />
                        <input className='form-control' type='password' placeholder='Password' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>Forgot your password?</span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new account</button>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
}

export default Login;