import './chatList.css'

import { useEffect, useState } from 'react'

import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../configs/firebase';

import { useUserStore } from '../../../configs/userStore'
import { useChatStore } from '../../../configs/chatStore';

import { AddUser } from './addUser/AddUser';

export const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    const onSelectedChat = async (chat) => {
        const userChats = chats.map(item => {
            const { user, ...rest } = item;

            return rest;
        });

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id);

        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            });
            changeChat(chat.chatId, chat.user);
        } catch (error) {
            console.log(error);
        };

    };

    const showUsersList = () => {
        setAddMode(!addMode);
    };

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="search png" className="searchIcon icon" />
                    <input type="text" className='searchInput' placeholder='Search' />
                </div>

                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="add" className="addPerson icon"
                    onClick={showUsersList}
                />
            </div>

            {chats.map((chat) => (
                <div
                    className='users'
                    key={chat.chatId}
                    onClick={() => onSelectedChat(chat)}
                    style={{
                        backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
                    }}
                >
                    <img src={chat.user.avatar || "./avatar.png"} alt="user image" className="userImage" />

                    <div className="userBriefInfo">
                        <span className="username">{chat.user.username}</span>
                        <p className="latestMessage">{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    )
}