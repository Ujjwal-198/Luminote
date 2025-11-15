import api from '../api/axiosInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const handleLogin = createAsyncThunk('user/handleLogin',

    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('user/login', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Login failed');
        }
    }
);

export const handleSignup = createAsyncThunk('user/handleSignup',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('user/signup', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Registration failed');
        }
    }
);

export const handleLogout = createAsyncThunk('user/handleLogout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post('user/logout');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Logout failed');
        }
    }
);

export const handleGetUser = createAsyncThunk('user/handleGetUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('user/getuser');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Failed to get user');
        }
    }
);

export const handleCheckAuth = createAsyncThunk('user/handleCheckAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('user/checkauth');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Authentication failed');
        }
    }
);

export const handleDeleteUser = createAsyncThunk('user/handleDeleteUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete('user/deleteUser');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Failed to delete user');
        }
    }
);

const initialState = {
    user: null,
    authenticated: false,
    loading: true,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.authenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.authenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(handleSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(handleSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(handleLogout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleLogout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.authenticated = false;
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // In userSlice, ensure handleGetUser sets loading properly:
            .addCase(handleGetUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleGetUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;  // ✅ This sets authenticated to true
            })
            .addCase(handleGetUser.rejected, (state, action) => {
                state.loading = false;
                state.authenticated = false;  // ✅ This keeps authenticated false
                state.error = action.payload;
            })

            .addCase(handleCheckAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleCheckAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(handleCheckAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(handleDeleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleDeleteUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.authenticated = false;
            })
            .addCase(handleDeleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export const { setUser, logout, clearError } = userSlice.actions;

export default userSlice.reducer;
