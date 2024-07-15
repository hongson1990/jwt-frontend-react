import React, { isValidElement, useState } from 'react';
import './Login.scss';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userServices';
import { useEffect } from "react";
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
    const { loginContext } = React.useContext(UserContext);
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        history.push("/register");
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
            toast.error("Please enter your email address or phone number");
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            toast.error("Please enter your password");
            return;
        }

        let response = await loginUser(valueLogin, password);
        if (response && response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let data = {
                isAuthen: true,
                token: token,
                account: { groupWithRoles, email, username }
            }
            // sessionStorage.setItem('account', JSON.stringify(data));
            loginContext(data);
            history.push("/users");
            // window.location.reload();

        }

        if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className='login-container'>
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
                        <input className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            type='text'
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            type='password' placeholder='Password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>Create new account</button>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
}

export default Login;