import { createSlice } from "@reduxjs/toolkit"
import { Cookies } from "react-cookie"
import { RootState } from "../store"
import { DecodedToken, Role } from "../../../types/auth";
import { jwtDecode } from "jwt-decode";

interface AuthState {
    isAuthorized: boolean;
    userRole: Role
}

function checkTokens(): boolean {
    const cookies = new Cookies();
    return cookies.get('AccessToken') || cookies.get('RefreshToken')
}

function checkRole(): Role {
    const cookies = new Cookies();
    let role: Role;

    try {
        const { userRole } = jwtDecode<DecodedToken>(cookies.get('AccessToken'));
        role = userRole;
        console.log(role)
    }
    catch (err) {
        role = 'None';
    }
    
    return role;
}

const initialState: AuthState = {
    isAuthorized: checkTokens(),
    userRole: checkRole()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthorized: (state, action) => {
            const cookies = new Cookies();
            cookies.set('AccessToken', action.payload.accessToken);
            cookies.set('RefreshToken', action.payload.refreshToken);
            state.userRole = checkRole();

            state.isAuthorized = true;
        },
        logout: (state) => {
            const cookies = new Cookies();
            cookies.remove('AccessToken');
            cookies.remove('RefreshToken')

            state.isAuthorized = false;
        }
    }
})

export const { setIsAuthorized, logout } = authSlice.actions;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectUserRole = (state: RootState) => state.auth.userRole;

export default authSlice.reducer;