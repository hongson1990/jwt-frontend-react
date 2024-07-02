import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { fetchGroup, createNewUser } from '../../services/userServices';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
    const { action, dataModalUser } = props;
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");
    const [group, setGroup] = useState("");

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }


    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroup();
        if (props.action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }
    }, []);

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData(dataModalUser);
        }
    }, [dataModalUser]);

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(res.data.EM);
        }
    }

    const handleOnChangeInput = (value, name) => {
        let _userDate = _.cloneDeep(userData);
        _userDate[name] = value;
        setUserData(_userDate);
    }

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }

        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check === true) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] });
            if (res.data && res.data.EC === 0) {
                props.handleClose();
                setUserData({ ...defaultUserData, group: userGroups[0].id });
            }

            if (res.data && res.data.EC !== 0) {
                toast.error(res.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data.DT] = false;
                setValidInputs(_validInputs);
            }

        }
    }


    return (
        <>
            <Modal size='lg' show={props.show} onHide={props.handleClose} className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email adress <span className='red'>(*)</span>:</label>
                            <input disabled={action === 'CREATE' ? false : true}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'} type='email' value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, "email")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number <span className='red'>(*)</span>:</label>
                            <input disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} type='text' value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>User name:</label>
                            <input className='form-control' type='text' value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, "username")}
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            {
                                action === 'CREATE'
                                &&
                                <>
                                    <label>Password <span className='red'>(*)</span>:</label>
                                    <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} type='password' value={userData.password}
                                        onChange={(event) => handleOnChangeInput(event.target.value, "password")}
                                    />
                                </>
                            }
                        </div>


                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address:</label>
                            <input className='form-control' type='text' value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, "address")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender:</label>
                            <select className='form-select'
                                onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group <span className='red'>(*)</span>:</label>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, "group")}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )

}

export default ModalUser;