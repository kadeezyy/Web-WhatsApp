import React from 'react'
import './ChatList.scss'

const ChatList = () => {


    return (
        <div className='chatList'>
            <div className="block">
                <div className="details">
                    <div className="listHead">
                        <h4>
                            Kanat
                        </h4>
                        <div className="time">
                            10:59
                        </div>
                    </div>
                    <div className="message_p">
                        <p>
                            he says hello
                        </p>
                    </div>

                </div>
            </div>

            <div className="block">
                <div className="details">
                    <div className="listHead">
                        <h4>
                            Kanat
                        </h4>
                        <div className="time">
                            10:59
                        </div>
                    </div>
                    <div className="message_p">
                        <p>
                            he says hello only when its needed because he doesn't want to sound 
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ChatList