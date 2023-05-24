import React, { useEffect, useState } from 'react'
import './ChatList.scss'
import { api_host, api_token, idInstance } from '../../config'
import { useDispatch } from 'react-redux'
import { setSelectedChatList } from '../../features/chat/chatSlice'

const ChatList = () => {
    useEffect(() => {
        fetchChatList()
    }, [])

    const [chatList, setChatList] = useState([])
    const dispatch = useDispatch()

    const fetchChatList = async () => {
        try {
            const url = `${api_host}/waInstance${idInstance}/getChats/${api_token}`
            const response = await fetch(url)
            if (response.ok) {
                response.json().then(data => {
                    setChatList(data)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getChatDetails = async (element) => {
        try {
            const url = `${api_host}/waInstance${idInstance}/getChatHistory/${api_token}`
            const param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Request headers
                    // Authorization: 'Bearer your_token', // Add any required authorization headers
                },
                body: JSON.stringify({
                    chatId: element.id,
                    count: 100
                })
            }
            const response = await fetch(url, param)
            if (response.ok) {
                response.json().then(data => {
                    dispatch(setSelectedChatList(data));
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getChatList = () => {
        return <>
            {chatList.map((el, ind) => (
                <div className="block" key={ind} onClick={() => getChatDetails(el)}>
                    <div className="details" key={ind}>
                        <div className="listHead" key={ind}>
                            <h4 key={ind}> {el.id.split("@")[0]}</h4>

                        </div>

                    </div>
                </div>
            ))}
        </>

    }


    return (
        <div className='chatList'>
            {getChatList()}

        </div>
    )
}

export default ChatList