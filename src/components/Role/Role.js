import './Role.scss';
import { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleServices';
import TableRole from './TableRole';

const Role = (props) => {
    const dataChildDefault = {
        url: '', description: '', isValidUrl: true
    }
    const childRef = useRef();
    const [listChild, setListChild] = useState({
        child1: dataChildDefault
    })

    const handleOnChangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChild);
        _listChilds[key][name] = value;
        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChild(_listChilds);
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChild);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChild(_listChilds);
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChild);
        delete _listChilds[key];
        setListChild(_listChilds);
    }

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChild);
        let data = [];
        Object.entries(_listChilds).map(([key, child], index) => {
            data.push({
                url: child.url,
                description: child.description
            });
        });
        return data;
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url;
        });
        if (!invalidObj) {
            let data = buildDataToPersist();
            let res = await createRoles(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetchListRolesAgain();
            }
        } else {
            toast.error('Input URL must not be empty...');
            console.log(">>> invalid:", invalidObj);
            let _listChilds = _.cloneDeep(listChild);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChild(_listChilds);

        }
    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='adding-roles mt-3'>
                    <div className='tilte-role'>
                        <h4>Add a new role...</h4>
                    </div>
                    <div className='role-parent'>
                        {Object.entries(listChild).map(([key, child], index) => {
                            return (
                                <div className=' row role-child' key={`child-${key}`}>
                                    <div className={`col-5 form-gorup ${key}`}>
                                        <label>URL:</label>
                                        <input type='text'
                                            className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                            value={child.url}
                                            onChange={(event) => handleOnChangeInput('url', event.target.value, key)}
                                        />
                                    </div>
                                    <div className='col-5'>
                                        <label>Description:</label>
                                        <input type='text'
                                            value={child.description}
                                            className='form-control'
                                            onChange={(event) => handleOnChangeInput('description', event.target.value, key)}
                                        />
                                    </div>
                                    <div className='col-2 mt-4 actions'>
                                        <i className='fa fa-plus-circle add' onClick={() => handleAddNewInput()}></i>
                                        {index >= 1 &&
                                            <i className='fa fa-trash-o delete'
                                                onClick={() => handleDeleteInput(key)}
                                            ></i>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                        <div>
                            <button className='btn btn-warning mt-3' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='mt-3 table-role'>
                    <h4>List Current Roles: </h4>
                    <TableRole ref={childRef} />
                </div>
            </div>

        </div>
    )
}

export default Role;