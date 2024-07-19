import './currentUserInfoModal.css';

import { useUserStore } from '../../../../configs/userStore';

export const CurrentUserInfoModal = ({
    onMoreClick,
}) => {
    const { currentUser } = useUserStore();

    const onCloseClick = () => {
        onMoreClick(false);
    };

    return (
        <div className="user-info-modal-list">
            <i class="fa-solid fa-xmark" id='cross-icon' onClick={onCloseClick}></i>

            <div className="chat-info-userInformation">
                <img src={currentUser?.avatar || "./avatar.png"} alt="chat-info-avatar" className='chat-info-avatar' />
                <h2 className='chat-info-username'>{currentUser?.username}</h2>
                <span className='chat-info-email'>{currentUser?.email}</span>
                <p className='chat-info-status'>Grateful for every sunrise and sunset</p>
            </div>
        </div>
    )
}