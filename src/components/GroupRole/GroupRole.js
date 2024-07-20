import './GroupRole.scss';
import React, { useEffect, useState } from 'react';
import { fetchGroup } from '../../services/userServices';
import { fetchAllRole, fetchRoleByGroup, assignRolesByGroup } from '../../services/roleServices';
import { toast } from 'react-toastify';
import _ from 'lodash';

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

    useEffect(() => {
        getGroup();
        getAllRoles();
    }, []);

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
        } else {
            toast.error(res.EM);
        }
    }

    const getAllRoles = async () => {
        let data = await fetchAllRole();
        console.log(data);
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    }

    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRoleByGroup(value);
            if (data && +data.EC === 0) {
                let result = buildDataRoleByGroup(data.DT.Roles, listRoles);
                setAssignRoleByGroup(result);
            }
        }
    }

    const buildDataRoleByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url);
                }
                result.push(object);
            });
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        let foundIndex = _assignRoleByGroup.findIndex(item => +item.id === +value);
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned;
        }
        console.log(_assignRoleByGroup);
        setAssignRoleByGroup(_assignRoleByGroup);
    }

    const buildDataToSave = () => {
        let result = {};
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        result.groupId = selectGroup;
        console.log(_assignRoleByGroup);
        let groupRolesFilter = _assignRoleByGroup.filter(item => item.isAssigned === true);
        console.log(groupRolesFilter);
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = {
                groupId: +selectGroup,
                roleId: +item.id
            };
            return data;
        });
        result.groupRoles = finalGroupRoles;
        return result;
    }

    const handleSave = async () => {
        let data = buildDataToSave();
        let res = await assignRolesByGroup(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container mt-3'>
                    <h4>Group Role:</h4>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Select Group: <span className='red'>(*)</span>:</label>
                            <select className={'form-select'}
                                onChange={(event) => handleOnChangeGroup(event.target.value)}
                            >
                                <option value="">Please select your group</option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <hr />
                        {selectGroup &&
                            <div className='roles'>
                                <h5>Assign Role:</h5>
                                {assignRoleByGroup && assignRoleByGroup.length > 0
                                    && assignRoleByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )

}

export default GroupRole;