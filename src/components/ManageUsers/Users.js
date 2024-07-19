import React, { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUser, deleteUser } from '../../services/userServices';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setdataModalUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setListUsers(response.DT.users);
            setTotalPage(response.DT.totalPage);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        console.log(response);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }

    const handleDeleteUser = (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);

    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    }

    const handleCloseModalUser = async () => {
        setIsShowModalUser(false);
        setdataModalUser({});
        await fetchUsers();
    }

    const handleEditUser = async (user) => {
        setActionModalUser('UPDATE');
        setdataModalUser(user);
        setIsShowModalUser(true);
    }

    const handleRefresh = async () => {
        await fetchUsers();
    }

    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div className='title mt-3'>
                            <h3>Manage Users</h3>
                        </div>
                        <div className='action my-3'>
                            <button className='btn btn-success mx-1'
                                onClick={() => handleRefresh()}> <i className='fa fa-refresh'></i>Refesh</button>
                            <button className='btn btn-primary'
                                onClick={() => { setIsShowModalUser(true); setActionModalUser("CREATE") }}
                            ><i className='fa fa-plus-circle'></i>Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span className='edit'
                                                            title='Edit'
                                                            onClick={() => handleEditUser(item)}><i className='fa fa-pencil' /></span>
                                                        <span className='delete'
                                                            title='Delete'
                                                            onClick={() => handleDeleteUser(item)}><i className='fa fa-trash-o' /></span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><tr><td colSpan={6}>Not found user</td></tr></>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPage > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                previousLabel="Previous"
                                nextLabel="Next"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={totalPage}
                                marginPagesDisplayed={4}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    }
                </div >
                <ModalDelete
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    confirmDeleteUser={confirmDeleteUser}
                    dataModal={dataModal}
                />

                <ModalUser
                    show={isShowModalUser}
                    handleClose={handleCloseModalUser}
                    action={actionModalUser}
                    dataModalUser={dataModalUser}
                />
            </div >
        </>
    );
}

export default Users;