import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUser, ILoginCredentials } from '@/types/auth';

/**
 * Auth slice following SOLID principles:
 * - Single Responsibility: Only manages authentication state
 * - Open/Closed: Easy to extend with new authentication methods
 * - Liskov Substitution: Actions can be substituted without breaking functionality
 * - Interface Segregation: Clear separation of concerns in actions
 * - Dependency Inversion: Depends on interfaces, not concrete implementations
 */

// Initial state
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

// Async thunks for authentication actions
export const loginOrRegisterUser = createAsyncThunk(
  'auth/loginOrRegisterUser',
  async (credentials: ILoginCredentials & { name?: string }, { rejectWithValue }) => {
    try {
      // This will handle both login and registration
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('An error occurred during authentication');
    }
  }
);

// Keep the old loginUser for backward compatibility
export const loginUser = loginOrRegisterUser;

export const loginWithLinkedIn = createAsyncThunk(
  'auth/loginWithLinkedIn',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('An error occurred during LinkedIn login');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      return null;
    } catch (error) {
      return rejectWithValue('An error occurred during logout');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue('Invalid token');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('An error occurred while fetching user data');
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login or Register user
      .addCase(loginOrRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginOrRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginOrRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      // LinkedIn login
      .addCase(loginWithLinkedIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithLinkedIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginWithLinkedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
        state.isLoading = false;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

// Export actions
export const { clearError, setToken, clearAuth } = authSlice.actions;

// Selectors (following Single Responsibility Principle)
export const selectAuth = (state: any) => state.auth;
export const selectUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectIsLoading = (state: any) => state.auth.isLoading;
export const selectAuthError = (state: any) => state.auth.error;
export const selectToken = (state: any) => state.auth.token;

// Export the reducer
export default authSlice.reducer;