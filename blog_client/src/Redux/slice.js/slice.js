import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstname: "",
    lastname: "",
    isLogin: sessionStorage.getItem("status") === true
}

const userSlice = createSlice({
    name: "authDetails",
    initialState,
    reducers: {
        setStatus: (state) => {
            state.isLogin = true
        },
        RemoveStatus: (state) => {
            state.isLogin = false
        },
        setFirstName: (state, action) => {
            state.firstname = action.payload
        },
        setLastName: (state, action) => {
            state.lastname = action.payload
        },
        RemoveFirstName: (state) => {
            state.firstname = ""
        },
        RemoveLastName: (state) => {
            state.lastname = ""
        },
    }
})

export const { setFirstName, setLastName, RemoveFirstName, RemoveLastName, setStatus, RemoveStatus } = userSlice.actions

export const userReducer = userSlice.reducer