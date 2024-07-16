import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase";

import { useEffect } from "react";

import { useUserStore } from "./configs/userStore";

import { Chat } from "./components/chat/Chat";
import { Detail } from "./components/detail/Detail";
import { List } from "./components/list/List";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Notification } from "./components/notification/notification";


const App = () => {
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();

    useEffect(() => {
        const onSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid)
        });

        return () => {
            onSub();
        };
    }, [fetchUserInfo]);

    if (isLoading) {
        return <div className="loading">Loading...</div>
    };

    return (
        <div className="container">
            {currentUser ?
                <>
                    <List />
                    <Chat />
                    <Detail />
                </>
                :
                <>
                    <Login />
                    <Register />
                </>
            }
            <Notification />
        </div>
    )
}

export default App;