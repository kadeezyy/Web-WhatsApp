import React, { useState, useEffect } from 'react'
import './RightSideBar.scss'
import { api_host, api_token, idInstance } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import InputComponent from '../Input/InputComponent'
import { IonIcon } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import { setSelectedChatList } from '../../features/chat/chatSlice'

const RightSideBar = () => {
    const selectedChat = useSelector((state) => state.chat.selectedChat)
    const chatList = useSelector((state) => state.chat.selectedChatList)
    const [textMessage, setTextMessage] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('Chat list updated:');
    }, [chatList]);
    useEffect(() => {
        // console.log('Selected chat is updated')
    }, [selectedChat])


    const getChatMessages = () => {
        return <>
            {chatList.slice().reverse().map((element, ind) => {
                const time = new Date(element.timestamp * 1000)
                if (element.type === "outgoing") {
                    return (
                        <div className="message my_message" key={ind}>
                            <p>
                                {element.textMessage}
                                <br />
                                <span>{time.getHours()}:{time.getMinutes()}</span>
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div className="message companion_message" key={ind}>
                            <p>{element.textMessage}</p>
                        </div>
                    );
                }
            })}
        </>
    }

    const handleTextMessageChange = (event) => {
        setTextMessage(event.target.value);
    }

    const handleSend = async () => {
        if (textMessage === "") return;
        try {
            const url = `${api_host}/waInstance${idInstance}/sendMessage/${api_token}`
            const param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Request headers
                    // Authorization: 'Bearer your_token', // Add any required authorization headers
                },
                body: JSON.stringify({
                    chatId: selectedChat.id,
                    message: textMessage
                })
            }
            const response = await fetch(url, param)
            if (response.ok) {
                const updatedChatList = [...chatList, textMessage];
                setTimeout(() => {
                    dispatch(setSelectedChatList(updatedChatList))
                }, 300)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='right-container'>
            <div className="header">
                <h4>
                    {selectedChat.id !== undefined && selectedChat.id.split("@")[0]}
                </h4>
            </div>

            <div className="chatBox">
                {chatList.length !== 0 && getChatMessages()}
            </div>
            {selectedChat.id !== undefined &&
                <div className="input-container">
                    <InputComponent searchText={textMessage} handleOnChange={handleTextMessageChange} placeholder={"Type a message"} className="text-input" />
                    <IonIcon icon={sendOutline} className='send-icon' onClick={handleSend} />
                </div>}
        </div>
    )
}

export default RightSideBar