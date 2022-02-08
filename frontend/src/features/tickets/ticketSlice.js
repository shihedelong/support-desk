import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// create initial state, about tickets, so tickets array
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoaidng: false,
  message: '',
}

// creat new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  // ticket from the form
  // thunkAPI, this object actually has on it a method called getState, and we can get anything else from any other state we want, like user and token
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.isLoaidng = true
    })
    builder.addCase(createTicket.fulfilled, (state) => {
      state.isLoaidng = false
      state.isSuccess = true
    })
    builder.addCase(createTicket.rejected, (state, action) => {
      state.isLoaidng = false
      state.isError = true
      state.message = action.payload
    })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
