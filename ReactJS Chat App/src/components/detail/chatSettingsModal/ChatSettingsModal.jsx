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
                    <li className="chat-settings-list-item">Notifications: Toggle notifications, set sounds, and enable Do Not Disturb.</li>
                    <li className="chat-settings-list-item">Privacy: Control who sees your last seen, profile picture, and read receipts.</li>
                    <li className="chat-settings-list-item">Customization: Change chat wallpaper, select themes, and adjust font size.</li>
                    <li className="chat-settings-list-item">Account: Update your email, username, status, or delete your account.</li>
                    <li className="chat-settings-list-item">Security: Never share your account information to anyone.</li>
                </ul>
            </div>

            <button className="ok-btn" onClick={onOkClick}>OK</button>
        </div>
    )
}