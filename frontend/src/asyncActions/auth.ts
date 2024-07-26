import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConnector from "../apiConnector";
import { auth } from "../backendUrls/auth";


//singing up user
export const signup: any = createAsyncThunk('signup', async ( data: any )=> {   // fix type here
    try {
        const responce = await apiConnector('POST', auth.Signup, data, { 'Content-Type': 'application/json'});
        return responce;
    } catch (error: any) {
        throw new Error("Something went wrong")
    }
})

//loging up user
export const login: any = createAsyncThunk('login', async (data: any)=> {    //fix typo here
    try {
        const responce = await apiConnector('POST', auth.login, data, { 'Content-Type': 'application/json'} );
        return responce.data;
    } catch (error: any) {
        throw new Error(error)
    }
})
