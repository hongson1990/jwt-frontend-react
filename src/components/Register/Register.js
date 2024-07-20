import React from 'react';
import './Register.scss';
import { useHistory, Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerNewUser } from '../../services/userServices';
import { UserContext } from "../../context/UserContext";

const Register = (props) => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    const handleRegister = async () => {
        let check = isValidInputs();

        if (check === true) {
            let serverData = await registerNewUser(email, phone, username, password);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");
            } else {
                toast.error(serverData.EM);
            }
        }
    }

    useEffect(() => {
        if (user && user.isAuthen) {
            history.push('/');
        }
    }, []);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            toast.error("Email is required");
            return false;
        }

        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!phone) {
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            toast.error("Phone number is required");
            return false;
        }

        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            toast.error("Password is required");
            return false;
        }

        if (password !== confirmPassword) {
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            toast.error("Your password is not the same");
            return false;
        }

        return true;
    }

    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            <Link to='/'><span title='Return to HomePage'>Son</span></Link>
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
                            <input className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} type='text' placeholder='Email address'
                                value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} type='text' placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input className='form-control' type='text' placeholder='Username'
                                value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} type='password' placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} type='password' placeholder='Re-enter password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>Already have an account? Login</button>
                            <div className='mt-3 return'>
                                <Link to='/'>
                                    <i className='fa fa-arrow-circle-left'></i>
                                    <span title='Return to HomePage'>Return to HomePage</span>
                                </Link>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
}

export default Register;