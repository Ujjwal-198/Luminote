import api from '../api/axiosInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const uploadFiles = createAsyncThunk('files/uploadFiles',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            console.log('Uploading files...');

            // Simulate progress updates
            const fileCount = formData.getAll('files').length;
            let progress = 0;

            const progressInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 90) progress = 90;
                dispatch(setUploadProgress({
                    progress: Math.round(progress),
                    fileName: 'Uploading to MEGA...'
                }));
            }, 500);

            const response = await api.post('files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            clearInterval(progressInterval);
            dispatch(setUploadProgress({ progress: 100, fileName: 'Upload complete!' }));

            console.log('Upload response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Upload error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getDocuments = createAsyncThunk('files/getDocuments',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const response = await api.get('files/documents', { params: filters });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getDocumentsById = createAsyncThunk('files/getDocumentsById',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`files/user/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const viewDocument = createAsyncThunk('files/viewDocument',
    async (nodeId, { rejectWithValue }) => {
        try {
            const response = await api.get(`files/view/${nodeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const downloadDocument = createAsyncThunk('files/downloadDocument',
    async (nodeId, { rejectWithValue }) => {
        try {
            const response = await api.get(`files/download/${nodeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const deleteDocument = createAsyncThunk('files/deleteDocument',
    async (nodeId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`files/delete/${nodeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);


const fileSlice = createSlice({
    name: 'files',
    initialState: {
        documents: [],
        userDocuments: [],
        loading: false,
        userLoading: false,
        error: null,
        uploadSuccess: false,
        uploadProgress: 0,
        currentFile: null
    },
    reducers: {
        clearUploadSuccess: (state) => {
            state.uploadSuccess = false;
            state.uploadProgress = 0;
            state.currentFile = null;
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload.progress;
            state.currentFile = action.payload.fileName;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadSuccess = true;
                // Add uploaded files to documents array
                if (action.payload.files) {
                    state.documents = [...(state.documents || []), ...action.payload.files];
                }
            })
            .addCase(uploadFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDocuments.fulfilled, (state, action) => {
                state.documents = action.payload;
            })
            .addCase(getDocumentsById.pending, (state) => {
                state.userLoading = true;
                state.error = null;
            })
            .addCase(getDocumentsById.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userDocuments = action.payload;
            })
            .addCase(getDocumentsById.rejected, (state, action) => {
                state.userLoading = false;
                state.error = action.payload;
            })
            .addCase(viewDocument.fulfilled, (state, action) => {
                state.currentFile = action.payload;
            })
            .addCase(viewDocument.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(viewDocument.pending, (state) => {
                state.loading = true;
            })
            .addCase(downloadDocument.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(downloadDocument.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(downloadDocument.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.loading = false;
                // Remove from both documents arrays
                state.documents = state.documents.filter((doc) => doc.nodeId !== action.meta.arg);
                state.userDocuments = state.userDocuments.filter((doc) => doc.nodeId !== action.meta.arg);
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteDocument.pending, (state) => {
                state.loading = true;
            });
    }
});

export const { clearUploadSuccess, setUploadProgress } = fileSlice.actions;
export default fileSlice.reducer;