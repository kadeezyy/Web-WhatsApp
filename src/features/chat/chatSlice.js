import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatList: []
    },
    reducers: {
        setSelectedChatList: (state, action) => {
            state.selectedChatList = action.payload;
        }
    }
})

export const {setSelectedChatList} = chatSlice.actions
export default chatSlice.reducer
