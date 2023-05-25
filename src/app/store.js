import { configureStore } from '@reduxjs/toolkit'
import { chatSlice } from '../features/chat/chatSlice'

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer
  },
})

export default store;