import { useState } from 'react'
import './chatList.css'

export const ChatList = () => {
    const [addMode, setAddMode] = useState(true);

    const showUsersList = () => {
        setAddMode(!addMode);
    };

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="search png" className="searchIcon icon" />
                    <input type="text" className='searchInput' placeholder='Search' />
                </div>

                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="add" className="addPerson icon"
                    onClick={showUsersList}
                />
            </div>

            {addMode ? <div className='users'>
                <img src="./avatar.png" alt="user image" className="userImage" />

                <div className="userBriefInfo">
                    <span className="username">Maria Neison</span>
                    <p className="latestMessage">Hello</p>
                </div>
            </div> : ""}
        </div>
    )
}