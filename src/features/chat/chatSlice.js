import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatList: [],
        selectedChat: {}
    },
    reducers: {
        setSelectedChatList: (state, action) => {
            state.selectedChatList = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    }
})

export const {setSelectedChatList, setSelectedChat} = chatSlice.actions
export default chatSlice.reducer
