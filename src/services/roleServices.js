import axios from '../setup/axios';

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
}

const deleteRole = (role) => {
    return axios.delete('/api/v1/role/delete', { data: { id: role.id } });
}

const fetchAllRole = () => {
    return axios.get('/api/v1/role/read');
}

export {
    createRoles,
    deleteRole,
    fetchAllRole
}