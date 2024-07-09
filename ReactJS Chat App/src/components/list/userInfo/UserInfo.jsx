import './userInfo.css'

export const UserInfo = () => {
    return (
        <div className="userInfo">
            <div className="userInfo-user">
                <img src="./avatar.png" alt="user image" className="userInfo-avatar" />
                <h2 className='userInfo-username'>John Smith</h2>
            </div>

            <div className="userInfo-icons">
                <img src="./more.png" alt="more icon" className="userInfo-more-icon" />
                <img src="./video.png" alt="video icon" className="userInfo-video-icon" />
                <img src="./edit.png" alt="edit icon" className="userInfo-edit-icon" />
            </div>
        </div>
    )
}