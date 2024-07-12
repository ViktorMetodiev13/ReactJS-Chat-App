import { useEffect, useRef, useState } from 'react'
import './chat.css'

import EmojiPicker from 'emoji-picker-react'

export const Chat = () => {
    const [emojisMenu, setEmojisMenu] = useState(false);
    const [textField, setTextField] = useState();

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [])

    const onUserClick = () => {
        setEmojisMenu(!emojisMenu);
    };

    const onEmojiAddHandler = (e) => {
        setTextField(state => state + e.emoji);
    };

    const onChangeHandler = (e) => {
        setTextField(e.target.value);
    };

    return (
        <div className="chat">
            <div className="heading">
                <div className="heading-user">
                    <img src="./avatar.png" alt="avatar png" className="heading-avatar" />

                    <div className="heading-userInfomation">
                        <span className="heading-username">Maria Nelson</span>
                        <p className="heading-status">Grateful for every sunrise and sunset</p>
                    </div>
                </div>

                <div className="heading-icons">
                    <img src="./phone.png" alt="more icon" className="heading-phone-icon" />
                    <img src="./video.png" alt="video icon" className="heading-video-icon" />
                    <img src="./info.png" alt="edit icon" className="heading-info-icon" />
                </div>
            </div>

            <div className="main">
                <div className="main-message">
                    <img src="./avatar.png" alt="avatar png" className="main-avatar" />

                    <div className="main-message-params">
                        <p className="main-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ab ipsum velit eligendi optio,
                            sapiente error nesciunt voluptate quis expedita?</p>
                        <span className="main-date">1 min ago</span>
                    </div>
                </div>

                <div className="main-message-own">
                    <div className="main-message-params">
                        <img src="./theme.png" alt="image message" />
                        <p className="main-text-own">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ab ipsum velit eligendi optio,
                            sapiente error nesciunt voluptate quis expedita?</p>
                        <span className="main-date">1 min ago</span>
                    </div>
                </div>

                <div className="main-message">
                    <img src="./avatar.png" alt="avatar png" className="main-avatar" />
                    <div className="main-message-params">
                        <p className="main-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ab ipsum velit eligendi optio,
                            sapiente error nesciunt voluptate quis expedita?</p>
                        <span className="main-date">1 min ago</span>
                    </div>
                </div>

                <div className="main-message-own">
                    <div className="main-message-params">
                        <p className="main-text-own">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ab ipsum velit eligendi optio,
                            sapiente error nesciunt voluptate quis expedita?</p>
                        <span className="main-date">1 min ago</span>
                    </div>
                </div>

                <div className="main-message">
                    <img src="./avatar.png" alt="avatar png" className="main-avatar" />
                    <div className="main-message-params">
                        <p className="main-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ab ipsum velit eligendi optio,
                            sapiente error nesciunt voluptate quis expedita?</p>
                        <span className="main-date">1 min ago</span>
                    </div>
                </div>

                <div className="main-message-own">
                    <div className="main-message-params">
                        <p className="main-text-own">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ab ipsum velit eligendi optio,
                            sapiente error nesciunt voluptate quis expedita?</p>
                        <span className="main-date">1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>

            <div className="footer">
                <div className="footer-icons">
                    <img src="./img.png" alt="img icon" className="footer-img-icon" />
                    <img src="./camera.png" alt="camera icon" className="footer-camera-icon" />
                    <img src="./mic.png" alt="microphone icon" className="footer-mic-icon" />
                </div>
                <input
                    type="text"
                    placeholder='Type a message'
                    className='footer-input-field'
                    onChange={onChangeHandler}
                    value={textField}
                />

                <div className="footer-emojis-send-span">
                    <img
                        src="./emoji.png"
                        alt="emoji-png"
                        className="footer-emoji"
                        onClick={onUserClick}
                    />

                    <div className="footer-emoji-menu">
                        <EmojiPicker
                            open={emojisMenu}
                            onEmojiClick={onEmojiAddHandler}
                        />
                    </div>
                    <button className="footer-send-button">Send</button>
                </div>
            </div>
        </div>
    )
}