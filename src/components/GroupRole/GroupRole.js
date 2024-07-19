import './GroupRole.scss';
import React, { useEffect, useState } from 'react';
import { fetchGroup } from '../../services/userServices';
import { toast } from 'react-toastify';

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroup();
    }, []);

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
        } else {
            toast.error(res.EM);
        }
    }

    const handleOnChangeSelect = () => {

    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container mt-3'>
                    <h4>Group Role:</h4>
                    <div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Select Group: <span className='red'>(*)</span>:</label>
                            <select className={'form-select'}>
                                <option value="">Please select your group</option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GroupRole;