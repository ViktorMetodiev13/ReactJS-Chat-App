import "./addUser.css";

import { db } from "../../../../configs/firebase";
import { where, query, getDocs, collection } from "firebase/firestore";

import { useState } from "react";

export const AddUser = () => {
    const [user, setUser] = useState(null);

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

    return (
        <div className="addUser">
            <form className="addUser-form" onSubmit={onSearchClick}>
                <input type="text" placeholder="username" className="addUser-username" name="username"/>
                <button className="addUser-btn">Search</button>
            </form>

            {user &&
                <div className="users-list">
                    <div className="user-item">
                        <div className="found-user">
                            <img src={user.avatar || "./avatar.png"} alt="avatar png" className="found-user-avatar-png" />
                            <span className="found-user-username">{user.username}</span>
                        </div>
                        <button className="user-list-add-user-btn">Add User</button>
                    </div>
                </div>
            }
        </div>
    )
}