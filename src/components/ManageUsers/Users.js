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
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT.users);
            setTotalPage(response.data.DT.totalPage);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        console.log(response);
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
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
        await fetchUsers();
    }

    const handleEditUser = async (user) => {
        setActionModalUser('UPDATE');
        setdataModalUser(user);
        setIsShowModalUser(true);
    }

    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table Users</h3>
                        </div>
                        <div className='action mb-2'>
                            <button className='btn btn-success mx-1'>Refesh</button>
                            <button className='btn btn-primary'
                                onClick={() => setIsShowModalUser(true)}
                            >Add new user</button>
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
                                                        <button className='btn btn-warning mx-1'
                                                            onClick={() => handleEditUser(item)}>Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><tr><td>Not found user</td></tr></>
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
            </div>
        </>
    );
}

export default Users;