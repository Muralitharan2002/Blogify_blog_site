import { createSlice } from "@reduxjs/toolkit"

const userLogin = sessionStorage.getItem("status") === "true"
// console.log(userLogin, "slice")

const initialState = {
    firstname: "",
    lastname: "",
    isLogin: userLogin
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