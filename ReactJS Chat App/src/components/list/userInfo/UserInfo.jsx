import './userInfo.css'

import { useState } from 'react';

import { useUserStore } from "../../../configs/userStore";

import { CurrentUserInfoModal } from "./currentUserInfoModal/CurrentUserInfoModal";
import { EditCurrentUserInfo } from './editCurrentUserInfo/EditCurrentUserInfo';

export const UserInfo = () => {
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const { currentUser } = useUserStore();

    const onMoreClick = () => {
        setShowMoreModal(!showMoreModal);
    };

    const onEditClick = () => {
        setShowEditModal(!showEditModal);
    };

    return (
        <div className="userInfo">
            {showMoreModal && <CurrentUserInfoModal onMoreClick={onMoreClick}/>}
            {showEditModal && <EditCurrentUserInfo onEditClick={onEditClick}/>}
            
            <div className="userInfo-user">
                <img src={currentUser.avatar || './avatar.png'} alt="user image" className="userInfo-avatar" />
                <h2 className='userInfo-username'>{currentUser.username}</h2>
            </div>

            <div className="userInfo-icons">
                <img src="./more.png" alt="more icon" className="userInfo-more-icon" onClick={onMoreClick}/>
                <img src="./edit.png" alt="edit icon" className="userInfo-edit-icon" onClick={onEditClick}/>
            </div>
        </div>
    )
}