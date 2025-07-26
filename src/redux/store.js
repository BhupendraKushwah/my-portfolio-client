import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/auth.slice'; // Adjust path to where userSlice is located
import projectReducer from './slice/project.slice'; // Adjust path to where userSlice is located

export default configureStore({
  reducer: {
    auth: userReducer, // Register the userSlice reducer under the 'user' key
    project: projectReducer
  },
});