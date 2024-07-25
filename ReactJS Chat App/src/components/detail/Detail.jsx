import './detail.css';

import { useState } from "react";

import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useChatStore } from '../../configs/chatStore';
import { auth, db } from '../../configs/firebase';
import { useUserStore } from '../../configs/userStore';

import { DeleteUserModal } from './deleteUserModal/DeleteUserModal';
import { PrivacyAndHelpModal } from './privacyAndHelpModal/PrivacyAndHelpModal';
import { ChatSettingsModal } from './chatSettingsModal/ChatSettingsModal';

export const Detail = () => {
    const [chatSettings, setChatSettings] = useState(false);
    const [privacyAndHelp, setPrivacyAndHelp] = useState(false);
    const [sharedPhotos, setSharedPhotos] = useState(false);
    // const [sharedFiles, setSharedFiles] = useState(true);

    const [deleteUserModal, setDeleteUserModal] = useState(false);

    const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const onLogoutClick = () => {
        auth.signOut();
    };

    const onBlockUserClick = async () => {
        if (!user) {
            return;
        };

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });

            changeBlock();
        } catch (error) {
            console.log(error);
        }
    };

    const onDeleteMyAccountClick = async () => {
        setDeleteUserModal(!deleteUserModal);
    };

    const onChatSettingsClick = () => {
        setChatSettings(!chatSettings);
    };

    const onPrivacyAndHelpClick = () => {
        setPrivacyAndHelp(!privacyAndHelp);
    };

    const onSharedPhotosClick = () => {
        setSharedPhotos(!sharedPhotos);
    };

    return (
        <div className="detail">
            {chatSettings && <ChatSettingsModal onChatSettingsClick={onChatSettingsClick} />}
            {privacyAndHelp && <PrivacyAndHelpModal onPrivacyAndHelpClick={onPrivacyAndHelpClick} />}

            <div className="detail-userInformation">
                <img src={user?.avatar || "./avatar.png"} alt="detail-avatar" className='detail-avatar' />
                <h2 className='detail-title'>{user?.username}</h2>
                <p className='detail-subtitle'>{user?.status}</p>
            </div>

            <div className="detail-options">
                <div className="detail-option">
                    <div className="option-title">
                        <span>Chat Setting</span>
                        <img
                            src={chatSettings ? "./arrowDown.png" : "./arrowUp.png"}
                            alt={chatSettings ? "./arrowDown.png" : "./arrowUp.png"} className='arrow-png'
                            onClick={onChatSettingsClick}
                        />
                    </div>
                </div>

                <div className="detail-option">
                    <div className="option-title">
                        <span>Privacy & help</span>
                        <img
                            src={privacyAndHelp ? "./arrowDown.png" : "./arrowUp.png"}
                            alt={privacyAndHelp ? "./arrowDown.png" : "./arrowUp.png"} className='arrow-png'
                            onClick={onPrivacyAndHelpClick}
                        />
                    </div>
                </div>

                <div className="detail-option">
                    <div className="option-title">
                        <span>Shared photos</span>
                        <img
                            src={sharedPhotos ? "./arrowDown.png" : "./arrowUp.png"}
                            alt={sharedPhotos ? "./arrowDown.png" : "./arrowUp.png"} className='arrow-png'
                            onClick={onSharedPhotosClick}
                        />
                    </div>

                    {sharedPhotos ?
                        <>
                            <div className="items">
                                <div className="item">
                                    <div className="item-image-date">
                                        <img src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg" alt="photo" className='item-image' />
                                        <span>photo_2024_2.png</span>
                                    </div>
                                    <img src="./download.png" alt="download png" className='download' />
                                </div>

                                <div className="item">
                                    <div className="item-image-date">
                                        <img src="https://media.istockphoto.com/id/1672317574/photo/ama-dablam-mountain-peak.webp?b=1&s=170667a&w=0&k=20&c=Ea8yDEHpUemrRuMZUKGPDBE11YTWVksIupMN8FkEBf8=" alt="photo" className='item-image' />
                                        <span>photo_2024_2.png</span>
                                    </div>
                                    <img src="./download.png" alt="download png" className='download' />
                                </div>
                            </div>
                        </> : ""}
                </div>
{/* 
                <div className="detail-option">
                    <div className="option-title">
                        <span>Shared files</span>
                        <img
                            src={sharedFiles ? "./arrowUp.png" : "./arrowDown.png"}
                            alt="arrowUp png" className='arrow-png'
                            onClick={() => setSharedFiles(!sharedFiles)}
                        />
                    </div>
                </div> */}
            </div>

            <footer className="buttons">
                {deleteUserModal && <DeleteUserModal onDeleteUserClick={onDeleteMyAccountClick} />}

                <button className="block-user" onClick={onBlockUserClick}>
                    {isCurrentUserBlocked
                        ? "You are Blocked!"
                        : isReceiverBlocked
                            ? "User blocked"
                            : "Block User"
                    }
                </button>
                <button className="logout-btn" onClick={onLogoutClick}>Logout</button>
                <button className='delete-user-btn' onClick={onDeleteMyAccountClick}>Delete My Account</button>
            </footer>
        </div>
    )
}