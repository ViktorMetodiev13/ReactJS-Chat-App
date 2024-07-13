import "./addUser.css";

export const AddUser = () => {
    return (
        <div className="addUser">
            <form className="addUser-form">
                <input type="text" placeholder="username" className="addUser-username" />
                <button className="addUser-btn">Search</button>
            </form>

            <div className="users-list">
                <div className="user-item">
                    <div className="found-user">
                        <img src="./avatar.png" alt="avatar png" className="found-user-avatar-png" />
                        <span className="found-user-username">Jane Doe</span>
                    </div>
                    <button className="user-list-add-user-btn">Add User</button>
                </div>

                <div className="user-item">
                    <div className="found-user">
                        <img src="./avatar.png" alt="avatar png" className="found-user-avatar-png" />
                        <span className="found-user-username">Jane Doe</span>
                    </div>
                    <button className="user-list-add-user-btn">Add User</button>
                </div>
            </div>
        </div>
    )
}