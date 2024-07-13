import { Chat } from "./components/chat/Chat";
import { Detail } from "./components/detail/Detail";
import { List } from "./components/list/List";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Notification } from "./components/notification/notification";


const App = () => {

    const user = true;

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