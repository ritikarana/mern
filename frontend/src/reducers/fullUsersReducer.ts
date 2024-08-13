import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the interface for a single user
interface User {
    _id: string;
    name: string;
    age: number;
    email: string;
    password: string;
    role: string;
}


interface UsersState {
    users: User[]
}

const initialState: UsersState = {
    users: []
}

const userSlice = createSlice({
    name: 'usersData',
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload; // Assign the payload to the users state
        },
    },
});

export const { getUsers } = userSlice.actions;
export default userSlice.reducer;
