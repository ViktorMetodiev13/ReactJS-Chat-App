import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase";

import { useEffect } from "react";

import { Chat } from "./components/chat/Chat";
import { Detail } from "./components/detail/Detail";
import { List } from "./components/list/List";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Notification } from "./components/notification/notification";


const App = () => {
    const user = false;

    useEffect(() => {
        const onSub = onAuthStateChanged(auth, (user) => {
            console.log(user);
        });

        return () => {
            onSub();
        };
    }, []);

    return (
        <div className="container">
            {user ?
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