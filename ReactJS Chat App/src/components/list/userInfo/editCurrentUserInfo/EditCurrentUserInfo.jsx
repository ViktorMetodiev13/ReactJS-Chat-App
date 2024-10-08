import './editCurrentUserInfo.css';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { doc, setDoc } from 'firebase/firestore';

import { useUserStore } from '../../../../configs/userStore';
import { upload } from '../../../../configs/upload';
import { db } from '../../../../configs/firebase';

export const EditCurrentUserInfo = ({
    onEditClick
}) => {
    const { currentUser } = useUserStore();

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState({
        file: currentUser.avatar,
        url: "",
    });

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        } else {
            setAvatar({
                file: currentUser.avatar,
                url: currentUser.avatar
            });
        }
    };

    const onEditUserSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.target);

        const { username, status } = Object.fromEntries(formData);

        try {
            let imgUrl;
            if (avatar.file instanceof File) {
                imgUrl = await upload(avatar.file);
            } else {
                imgUrl = avatar.file;
            };

            await setDoc(doc(db, "users", currentUser.id), {
                ...currentUser,
                avatar: imgUrl,
                username,
                status,
            });

            onEditClick(false);
            toast.success("User edited!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const onCloseClick = () => {
        onEditClick(false);
    };

    const onCancelClick = () => {
        onEditClick(false);
    };

    return (
        <div className="editCurrentUser">
            <i className="fa-solid fa-xmark" id='cross-icon' onClick={onCloseClick}></i>
            <h2 className='edit-user-title'>Edit User</h2>

            <form className='edit-user-form' onSubmit={onEditUserSubmit}>
                <label htmlFor="file" className="register-upload-avatar-label">
                    <img
                        src={avatar.url || currentUser.avatar}
                        alt="avatar png"
                        className="register-avatar-png"
                    />
                    <span className="upload-avatar-text">Upload an avatar</span>
                </label>
                <input type="file" id="file" className="register-upload-avatar-field" onChange={handleAvatar} />
                <input type="text" placeholder='Username' className='edit-username' name="username" defaultValue={currentUser.username} />
                <input type="text" placeholder='Status' className='edit-status' name="status" defaultValue={currentUser.status} />

                <div className="edit-buttons">
                    <button className="edit-save" disabled={loading}>{loading ? "Loading" : "Save"}</button>
                    {!loading &&
                        <button className="edit-cancel" onClick={onCancelClick}>Cancel</button>
                    }
                </div>
            </form>
        </div>
    )
}