import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoaidng: false,
  message: '',
}

// Get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  // ticket from the form
  // thunkAPI, this object actually has on it a method called getState, and we can get anything else from any other state we want, like user and token
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create a ticket notes
export const createNote = createAsyncThunk(
  'notes/create',
  // ticket from the form
  // thunkAPI, this object actually has on it a method called getState, and we can get anything else from any other state we want, like user and token
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.isLoaidng = true
    })
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoaidng = false
      state.isSuccess = true
      state.notes = action.payload
    })
    builder.addCase(getNotes.rejected, (state, action) => {
      state.isLoaidng = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(createNote.pending, (state) => {
      state.isLoaidng = true
    })
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.isLoaidng = false
      state.isSuccess = true
      // only redux toolkit can use
      state.notes.push(action.payload)
    })
    builder.addCase(createNote.rejected, (state, action) => {
      state.isLoaidng = false
      state.isError = true
      state.message = action.payload
    })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
