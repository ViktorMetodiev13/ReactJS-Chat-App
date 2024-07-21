import './deleteUserModal.css';

import { toast } from 'react-toastify';

import { deleteUser, getAuth } from 'firebase/auth';

import { db } from '../../../configs/firebase';
import { useUserStore } from '../../../configs/userStore';
import { deleteDoc, doc } from 'firebase/firestore';

export const DeleteUserModal = ({
    onDeleteUserClick
}) => {
    const { currentUser } = useUserStore();

    const onDeleteUserSubmit = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        try {
            await deleteDoc(doc(db, 'users', currentUser.id));

            if (user) {
                await deleteUser(user);
            }

            toast.success('Account deleted successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const onCancelClick = () => {
        onDeleteUserClick(false);
    };

    return (
        <div className='deleteUserModal'>
            <h2 className='deleteUserModal-title'>Are you sure you want to delete your account?</h2>

            <div className='deleteUserModal-buttons'>
                <button className="deleteUserModal-delete" onClick={onDeleteUserSubmit}>Delete</button>
                <button className="deleteUserModal-cancel" onClick={onCancelClick}>Cancel</button>
            </div>
        </div>
    )
}