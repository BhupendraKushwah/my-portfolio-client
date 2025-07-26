import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/axios.config';


export const fetchProjects = createAsyncThunk('project/fetchProject', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/common/projects');
        return response.data.project;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
})

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        loading: false,
        error: null
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
            state.error = null;
        },
        addProjects: (state, action) => {
            state.projects.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
                state.loading = false
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
})

export const { addProjects, setProjects } = projectSlice.actions
export default projectSlice.reducer;