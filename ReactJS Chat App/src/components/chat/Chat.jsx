import './chat.css'

import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'

import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/firebase';

import { useChatStore } from '../../configs/chatStore';
import { useUserStore } from '../../configs/userStore';

export const Chat = () => {
    const [chat, setChat] = useState();
    const [emojisMenu, setEmojisMenu] = useState(false);
    const [text, setText] = useState();

    const { chatId, user } = useChatStore();
    const { currentUser } = useUserStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };
    }, [chatId]);

    const onSendClick = async () => {
        if (text == "") {
            return;
        };

        try {
            await updateDoc(doc(db, "chats", chatId), {
                message: arrayUnion({
                    senderId: currentUser.id,
                    textField: text,
                    createdAt: new Date(),
                })
            });

            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, "userChats", id);
                const userChatsSnapShot = await getDoc(userChatRef);
    
                if (userChatsSnapShot.exists()) {
                    const userChatsData = userChatsSnapShot.data();
    
                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);
    
                    userChatsData[chatIndex].lastMessage = text;
                    userChatsData[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData[chatIndex].updatedAt = Date.now();
    
                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats
                    });
                };
            });
        } catch (error) {
            console.log(error);
        };
    };

    const onUserClick = () => {
        setEmojisMenu(!emojisMenu);
    };

    const onEmojiAddHandler = (e) => {
        setText(state => state + e.emoji);
    };

    const onChangeHandler = (e) => {
        setText(e.target.value);
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
                {chat?.messages?.map(message => (
                    <div className="main-message-own" key={message?.createAt}>
                        <div className="main-message-params">
                            {message.img &&
                                <img src={message.img} alt="image message" />
                            }
                            <p className="main-text-own">{message.textField}</p>
                            {/* <span className="main-date">{message.createdAt}</span> */}
                        </div>
                    </div>
                ))
                }

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
                    value={text}
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
                    <button className="footer-send-button" onClick={onSendClick}>Send</button>
                </div>
            </div>
        </div>
    )
}