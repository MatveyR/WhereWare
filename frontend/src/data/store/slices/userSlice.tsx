import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User.tsx';
import usersData from '../../databases/users.json';

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: usersData
};

const userSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter((user: User) => user.id != action.payload)
        },
    },
});

export const {removeUser} = userSlice.actions;
export default userSlice.reducer;