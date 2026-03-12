import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    allUsers: null,      // original unfiltered list
    selectedUser: null,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
      state.allUsers = action.payload;  // save original
    },
    setFilteredUsers: (state, action) => {
      state.otherUsers = action.payload;  // only filter display
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setAuthUser, setOtherUsers, setFilteredUsers, setSelectedUser, setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
