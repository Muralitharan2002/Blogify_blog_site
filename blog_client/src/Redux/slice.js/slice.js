import { createSlice } from "@reduxjs/toolkit"

const userLogin = sessionStorage.getItem("status") === "true"
// console.log(userLogin, "slice")

const initialState = {
    authId: "",
    firstname: "",
    lastname: "",
    isLogin: userLogin
}

const userSlice = createSlice({
    name: "authDetails",
    initialState,
    reducers: {
        setAuthId: (state, action) => {
            state.authId = action.payload
        },
        RemoveAuthId: (state) => {
            state.authId = ""
        },
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

export const { setAuthId, RemoveAuthId, setFirstName, setLastName, RemoveFirstName, RemoveLastName, setStatus, RemoveStatus } = userSlice.actions

export const userReducer = userSlice.reducer