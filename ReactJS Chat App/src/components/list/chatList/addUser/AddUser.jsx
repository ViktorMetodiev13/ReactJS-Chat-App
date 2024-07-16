import "./addUser.css";

import { db } from "../../../../configs/firebase";
import { where, query, getDocs, collection, setDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { useState } from "react";

import { useUserStore } from "../../../../configs/userStore";

export const AddUser = () => {
    const [user, setUser] = useState(null);

    const { currentUser } = useUserStore();

    const onSearchClick = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", username));

            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            };
        } catch (error) {
            console.log(error);
        }
    };

    const onAddUserClick = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="addUser">
            <form className="addUser-form" onSubmit={onSearchClick}>
                <input type="text" placeholder="username" className="addUser-username" name="username" />
                <button className="addUser-btn">Search</button>
            </form>

            {user &&
                <div className="users-list">
                    <div className="user-item">
                        <div className="found-user">
                            <img src={user.avatar || "./avatar.png"} alt="avatar png" className="found-user-avatar-png" />
                            <span className="found-user-username">{user.username}</span>
                        </div>
                        <button className="user-list-add-user-btn" b onClick={onAddUserClick}>Add User</button>
                    </div>
                </div>
            }
        </div>
    )
}