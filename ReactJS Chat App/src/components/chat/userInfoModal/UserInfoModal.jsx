import './userInfoModal.css';

import { useChatStore } from '../../../configs/chatStore';

export const UserInfoModal = ({
    onInfoClick
}) => {
    const { user } = useChatStore();

    const onCloseClick = () => {
        onInfoClick(false)
    };

    return (
        <div className="userInfoModal">
            <i class="fa-solid fa-xmark" id='cross-icon' onClick={onCloseClick}></i>

            <div className="chat-info-userInformation">
                <img src={user?.avatar || "./avatar.png"} alt="chat-info-avatar" className='chat-info-avatar' />
                <h2 className='chat-info-username'>{user?.username}</h2>
                <span className='chat-info-email'>{user?.email}</span>
                <p className='chat-info-status'>Grateful for every sunrise and sunset</p>
            </div>
        </div>
    )
}