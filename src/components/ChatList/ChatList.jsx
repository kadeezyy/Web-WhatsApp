import React, { useEffect, useState } from 'react'
import './ChatList.scss'
import { api_host, api_token, idInstance } from '../../config'
import { useDispatch } from 'react-redux'
import { setSelectedChatList, setSelectedChat } from '../../features/chat/chatSlice'
import { addOutline } from 'ionicons/icons'
import { IonIcon } from '@ionic/react'
import ErrorModal from '../ModalWindow/ErrorModal'

const ChatList = ({ searchText }) => {
    const [chatList, setChatList] = useState([])
    const [error, setError] = useState(null);
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

    const handleChatCreation = async () => {
        if (searchText !== undefined && searchText.trim() !== "") {
            chatList.forEach(chat => {
                if (chat.id.split("@")[0] === searchText) {
                    dispatch(setSelectedChat(chat))
                    return;
                }
            })
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
                    response.json().then(async data => {
                        if (data.existsWhatsapp) {
                            const urlToGetInfo = `${api_host}/waInstance${idInstance}/GetContactInfo/${api_token}`
                            const param = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', // Request headers
                                    // Authorization: 'Bearer your_token', // Add any required authorization headers
                                },
                                body: JSON.stringify({
                                    chatId: searchText + '@c.us'
                                })
                            }
                            console.log(searchText + '@c.us')
                            const data = await fetch(urlToGetInfo, param)
                            var chat = {}
                            if (data.ok) {
                                data.json().then((a) => {
                                    chat = a
                                    chat["id"] = chat.chatId
                                    dispatch(setSelectedChat(chat))
                                })

                            }
                        } else {
                            handleError("There is no whatsapp account with this phone number")
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    const handleCloseModal = () => {
        setError(null);
    };


    return (
        <div className='chatList'>
            {error && (
                <ErrorModal message={error} onClose={handleCloseModal} />
            )}
            <div className="block" onClick={handleChatCreation}>
                <div className="details" >
                    <div className="listHead">
                        <IonIcon icon={addOutline} className='add-icon' />
                        <h4> Create new chat</h4>
                    </div>
                </div>
            </div>
            {getChatList()}
        </div>
    )
}


export default ChatList