import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUser, fetchUsers } from '../services/api';


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
    users: User[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'usersData',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload; // Assign the payload to the users state
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
         state.users = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.totalPages = action.payload.totalPage;
            state.loading = false;
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(deleteUser.fulfilled, (state, action) => {
             state.users = state.users.filter(user => user._id !== action.payload.id)
        }).addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload as string;
        }) 
    }
});

export const { setPage, setUsers } = userSlice.actions;
export default userSlice.reducer;
