import React from 'react'
import { IonIcon } from '@ionic/react';
import {searchOutline} from 'ionicons/icons';
import './InputComponent.scss'

const InputComponent = ({ handleOnChange, placeholder, searchText }) => {
    return (
        <div className="search-container">
                <IonIcon icon={searchOutline} className='search-icon'/>
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