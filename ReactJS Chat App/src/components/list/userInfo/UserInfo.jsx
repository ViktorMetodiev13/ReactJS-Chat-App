import './userInfo.css'

export const UserInfo = () => {
    return (
        <div className="userInfo">
            <div className="user">
                <img src="./avatar.png" alt="user image" className="avatar" />
                <h2 className='username'>John Smith</h2>
            </div>

            <div className="icons">
                <img src="./more.png" alt="more icon" className="more icon" />
                <img src="./video.png" alt="video icon" className="video icon" />
                <img src="./edit.png" alt="edit icon" className="edit icon" />
            </div>
        </div>
    )
}