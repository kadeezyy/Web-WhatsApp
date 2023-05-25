import React, { useEffect, useState } from 'react'
import './ChatList.scss'
import { api_host, api_token, idInstance } from '../../config'
import { useDispatch } from 'react-redux'
import { setSelectedChatList, setSelectedChat } from '../../features/chat/chatSlice'

const ChatList = ({ searchText }) => {
    const [chatList, setChatList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        fetchChatList()
    }, [])

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
                    dispatch(setSelectedChat(element));
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchChatList = async () => {
        if (searchText !== undefined && searchText.trim() !== "") {
            try {
                const url = `${api_host}/waInstance${idInstance}/checkWhatsapp/${api_token}`
                const param = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Request headers
                        // Authorization: 'Bearer your_token', // Add any required authorization headers
                    },
                    body: JSON.stringify({
                        phoneNumber: searchText
                    })
                }

                const response = await fetch(url, param)
                if (response.ok) {
                    response.json().then(data => {
                        if (data.existsWhatsapp) { 
                            getChatDetails()
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        } else {
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
    }

    const getChatList = () => {
        if (searchText !== undefined && searchText.trim() !== "") {
            const filteredChatList = chatList.filter(
                (chat) =>
                    chat.id.split("@")[0].includes(searchText)
            )
            return <>
                {filteredChatList.map((el, ind) => (
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