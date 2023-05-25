import React, { useState } from 'react'
import './LeftSideBar.scss'
import InputComponent from '../Input/InputComponent'
import { searchOutline } from 'ionicons/icons';
import ChatList from '../ChatList/ChatList'

const LeftSideBar = () => {
    const [searchText, setSearchText] = useState("")
    const handleSearchBarChange = (event) => {
        setSearchText(event.target.value)
        if (searchText.trim() !== "") {
            
        }
    }
    
    return (
        <div className='left-container'>
            <div className="header">
                <h1>
                    What's App
                </h1>
            </div>
            <div className="searchContainer">
                <InputComponent searchText={searchText}
                    icon={searchOutline}
                    placeholder={"Search for"}
                    handleOnChange={handleSearchBarChange} />
            </div>

            <ChatList searchText={searchText}/>
        </div>
    )
}

export default LeftSideBar