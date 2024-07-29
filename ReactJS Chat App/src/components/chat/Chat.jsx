import './chat.css';

import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/firebase';

import { useChatStore } from '../../configs/chatStore';
import { useUserStore } from '../../configs/userStore';
import { upload } from '../../configs/upload';

import { UserInfoModal } from './userInfoModal/UserInfoModal';

export const Chat = () => {
    const [chat, setChat] = useState();
    const [emojisMenu, setEmojisMenu] = useState(false);
    const [text, setText] = useState();
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [img, setImg] = useState({
        file: null,
        url: "",
    });
    const [updateTime, setUpdateTime] = useState(Date.now());

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, } = useChatStore();
    const { currentUser } = useUserStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };
    }, [chatId]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setUpdateTime(Date.now());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        };
    };

    const onSendClick = async () => {
        if (text == "") {
            return;
        };

        let imgUrl = null;

        try {
            if (img.file) {
                imgUrl = await upload(img.file);
            };

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    textField: text,
                    createdAt: new Date().toISOString(),
                    imgUrl: imgUrl || "",
                }),
            });

            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, "userchats", id);
                const userChatsSnapShot = await getDoc(userChatRef);

                if (userChatsSnapShot.exists()) {
                    const userChatsData = userChatsSnapShot.data();

                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats
                    });
                };
            });
        } catch (error) {
            console.log(error);
        };

        setImg({
            file: null,
            url: ""
        });

        setText("");
    };

    const getTimeAgo = (timestamp) => {
        const messageTime = new Date(timestamp);
        const currentTime = new Date();
        const timeDifferenceMinutes = Math.floor((currentTime - messageTime) / 60000);

        if (timeDifferenceMinutes < 1) {
            return 'Just now';
        } else if (timeDifferenceMinutes === 1) {
            return '1 minute ago';
        } else if (timeDifferenceMinutes < 60) {
            return `${timeDifferenceMinutes} minutes ago`;
        } else if (timeDifferenceMinutes < 1440) {
            const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
            return `${timeDifferenceHours} ${timeDifferenceHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (timeDifferenceMinutes < 43200) {
            const timeDifferenceDays = Math.floor(timeDifferenceMinutes / 1440);
            return `${timeDifferenceDays} ${timeDifferenceDays === 1 ? 'day' : 'days'} ago`;
        } else {
            const timeDifferenceMonths = Math.floor(timeDifferenceMinutes / 43200);
            return `${timeDifferenceMonths} ${timeDifferenceMonths === 1 ? 'month' : 'months'} ago`;
        }
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

    const onInfoClick = () => {
        setShowUserInfoModal(!showUserInfoModal);
    };

    return (
        <div className="chat">
            <div className="heading">
                <div className="heading-user">
                    <img src={user?.avatar || "./avatar.png"} alt="avatar png" className="heading-avatar" />

                    <div className="heading-userInfomation">
                        <span className="heading-username">{user?.username}</span>
                        <p className="heading-status">{user?.status}</p>
                    </div>
                </div>

                <div className="heading-icons">
                    <img src="./info.png" alt="edit icon" className="heading-info-icon" onClick={onInfoClick} />
                    {showUserInfoModal && <UserInfoModal onInfoClick={onInfoClick} />}
                </div>
            </div>

            <div className="main">
                {chat?.messages?.map((message) => (
                    <div className={message.senderId === currentUser?.id ? "main-message-own" : "main-message"} key={message?.createAt}>
                        <div className="main-message-params">
                            {message.img &&
                                <img src={message.img} alt="image message" />
                            }
                            <p className={message.senderId === currentUser?.id ? "main-text-own" : "main-text"}>{message.textField}</p>
                            <span className="main-date">{getTimeAgo(message.createdAt)}</span>
                        </div>
                    </div>
                ))}
                {img.url &&
                    <div className='main-message-own'>
                        <div className='texts'>
                            <img src={img.url} alt="" />
                        </div>
                    </div>}

                <div ref={endRef} />
            </div>

            <div className="footer">
                {/* <div className="footer-icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="img icon" className="footer-img-icon" />
                    </label>
                    <input type='file' id='file' style={{ display: "none" }} onChange={handleImg} />
                </div> */}
                <input
                    type="text"
                    placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "This user is currently blocked" : "Type a message"}
                    className='footer-input-field'
                    onChange={onChangeHandler}
                    value={text}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
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
                    <button
                        className="footer-send-button"
                        onClick={onSendClick}
                        disabled={isCurrentUserBlocked || isReceiverBlocked}
                    >Send</button>
                </div>
            </div>
        </div>
    )
}