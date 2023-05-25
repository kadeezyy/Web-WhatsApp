import React from 'react'
import { IonIcon } from '@ionic/react';
import './InputComponent.scss'

const InputComponent = ({ handleOnChange, placeholder, searchText, icon }) => {
    return (
        <div className="search-container">
            {icon && <IonIcon icon={icon} className='search-icon' />}
            <div className="search-bar">
                <input type="text" className="search-bar"
                    placeholder={placeholder}
                    value={searchText}
                    onChange={handleOnChange} />
            </div>
        </div>
    )
}

export default InputComponent