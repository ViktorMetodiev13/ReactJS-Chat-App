import { ChatList } from './chatList/ChatList';
import './list.css'

import { UserInfo } from "./userInfo/UserInfo";

export const List = () => {
    return (
        <div className="list">
            <UserInfo />
            <ChatList />
        </div>
    )
}