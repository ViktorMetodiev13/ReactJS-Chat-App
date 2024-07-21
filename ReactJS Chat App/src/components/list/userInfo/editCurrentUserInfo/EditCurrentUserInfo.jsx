import { useUserStore } from '../../../../configs/userStore';
import './editCurrentUserInfo.css';

export const EditCurrentUserInfo = ({
    onEditClick 
}) => {
    const { currentUser } = useUserStore();

    const onCloseClick = () => {
        onEditClick(false);
    };

    return (
        <div className="editCurrentUser"></div>
        // <div className="user-info-modal-list">
        //     <i class="fa-solid fa-xmark" id='cross-icon' onClick={onCloseClick}></i>

        //     <div className="chat-info-userInformation">
        //         <img src={currentUser?.avatar || "./avatar.png"} alt="chat-info-avatar" className='chat-info-avatar' />
        //         <h2 className='chat-info-username'>{currentUser?.username}</h2>
        //         <span className='chat-info-email'>{currentUser?.email}</span>
        //         <p className='chat-info-status'>Grateful for every sunrise and sunset</p>
        //     </div>
        // </div>
    )
}