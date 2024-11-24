import React, { useEffect, useState } from "react";
import { TableWrapper, StyledTable, ActionButton, DangerButton } from "./style";
import DialogBox from "./DialogBox";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import { deleteUser, fetchUsers } from "../../services/api";
import { setPage, setUsers } from "../../reducers/usersReducer";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

const UsersList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, currentPage, loading, error, totalPages } = useSelector((state: RootState) => state.users);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchParam, setSearchParam] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers({
            page: currentPage,
            searchParam
        }))
    }, [currentPage, dispatch, searchParam])


    const handleDialog = (id: string) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const handleEdit = (id: string) => {
        // Handle edit functionality here
        navigate(`/addUser?id=${id}`)
      
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setPage(currentPage + 1))
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1))
        }
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedUserId(null);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users: {error}</div>;

    function handleDelete() {
        if (selectedUserId) {
            dispatch(deleteUser(selectedUserId)).then(()=>{
                dispatch(setUsers(users.filter(user => user._id !== selectedUserId)))
            });
            setOpen(false);
        }
    }

    return (
        <>
            <Search setSearchParam={setSearchParam} intialSearch={searchParam} />
            <TableWrapper>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user["_id"]}>
                                <td>{user["name"]}</td>
                                <td>{user["age"]}</td>
                                <td>{user["email"]}</td>
                                <td>{user["role"]}</td>
                                <td>{user["status"]}</td>
                                <td>
                                    <ActionButton onClick={() => handleEdit(user["_id"])}>Edit</ActionButton>
                                    <DangerButton onClick={() => handleDialog(user["_id"])}>Delete</DangerButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
                <DialogBox openDialog={open} onClose={handleCloseDialog} handleDelete={handleDelete} />
            </TableWrapper>
            <Box display="flex" justifyContent={'center'} marginTop={2}>
                <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1 || loading}>
                    Previous
                </Button>
                <Box display={"flex"} alignItems={'center'} mx={2}>Current Page : {currentPage}</Box>

                <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages || loading}>
                    Next
                </Button>
            </Box>
        </>
    );
};

export default React.memo(UsersList);
