import React, { useState } from "react";
import { TableWrapper, StyledTable, ActionButton, DangerButton } from "./style";
import useFetchUsers from "../../hooks/useFetchUsers";
import DialogBox from "./DialogBox";

const UsersList: React.FC = () => {
    const { users, loading, error } = useFetchUsers();
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const handleEdit = (id: string) => {
        // Handle edit functionality here
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedUserId(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users: {error}</div>;

    return (
        <TableWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Role</th>
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
                            <td>
                                <ActionButton onClick={() => handleEdit(user["_id"])}>Edit</ActionButton>
                                <DangerButton onClick={() => handleDelete(user["_id"])}>Delete</DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
            <DialogBox openDialog={open} onClose={handleCloseDialog} userId={selectedUserId} />
        </TableWrapper>
    );
};

export default UsersList;
