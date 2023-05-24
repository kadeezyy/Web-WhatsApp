import React, { useState } from 'react'
import './LeftSideBar.scss'
import InputComponent from '../Input/InputComponent'
import ChatList from '../ChatList/ChatList'

const LeftSideBar = () => {
    const [searchText, setSearchText] = useState('')
    const handleSearchBarChange = (event) => {
        setSearchText(event.target.value)
    }
    return (
        <div className='left-container'>
            <div className="header">
                <h1>
                    What's App
                </h1>
            </div>
            <InputComponent searchText={searchText}
                placeholder={"Search for"}
                handleOnChange={handleSearchBarChange} />
            <ChatList />

        </div>
    )
}

export default LeftSideBar