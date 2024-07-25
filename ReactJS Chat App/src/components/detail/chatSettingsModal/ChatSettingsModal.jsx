import "./chatSettingsModal.css";

export const ChatSettingsModal = ({
    onChatSettingsClick
}) => {
    const onOkClick = () => {
        onChatSettingsClick(false);
    };

    return (
        <div className="chatSettingsModal">
            <div className="chat-settings-title-section">
                <h2 className="chatSettingsTitle">Chat Settings</h2>
                <p className="chat-settings-subtitle">Customize your chat experience with the following settings:</p>
            </div>

            <div className="chat-settings-content-section">
                <ul className="chat-settings-list">
                    <li className="chat-settings-list-item"><span className="chat-settings-list-item-category">Notifications</span>: Toggle notifications, set sounds, and enable Do Not Disturb.</li>
                    <li className="chat-settings-list-item"><span className="chat-settings-list-item-category">Privacy</span>: Control who sees your last seen, profile picture, and read receipts.</li>
                    <li className="chat-settings-list-item"><span className="chat-settings-list-item-category">Customization</span>: Change chat wallpaper, select themes, and adjust font size.</li>
                    <li className="chat-settings-list-item"><span className="chat-settings-list-item-category">Account</span>: Update your avatar, username, status, or delete your account.</li>
                    <li className="chat-settings-list-item"><span className="chat-settings-list-item-category">Security</span>: Never share your account information to anyone.</li>
                </ul>
            </div>

            <button className="ok-btn" onClick={onOkClick}>OK</button>
        </div>
    )
}