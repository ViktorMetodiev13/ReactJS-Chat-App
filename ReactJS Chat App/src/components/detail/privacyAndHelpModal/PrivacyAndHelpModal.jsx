import "./privacyAndHelpModal.css";

export const PrivacyAndHelpModal = ({
    onPrivacyAndHelpClick
}) => {
    const onAgreeClick = () => {
        onPrivacyAndHelpClick(false);
    };

    return (
        <div className="privacyAndHelp">
            <div className="privacy-policy">
                <div className="privacy-policy-title-section">
                    <h2 className="privacyAndHelpTitle">Privacy Policy</h2>
                    <p className="privacyAndHelpSubtitle">Privacy Policy for ReactJS Chat App</p>
                    <span className="privacryAndHelpPublishDate">Effective Date: 25.07.2024</span>
                </div>

                <div className="privacy-policy-content-section">
                    <ul className="privacryAndHelpIntroSection">
                        <li className="privacryAndHelpIntroSection-item">
                            <p className="item-title">1. Introduction</p>
                            <p className="item-content">
                                Welcome to ReactJS Chat App. We value your privacy and are committed to protecting your personal information.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
                            </p>
                        </li>
                        <li className="privacryAndHelpIntroSection-item">
                            <p className="item-title">2. Information We Collect</p>
                            <p className="item-content">
                                We may collect personal information such as your name, email address, phone
                                number, and profile picture. Additionally, we collect information about your
                                interactions with the app, such as messages sent, features used, and time spent.
                                Furthermore, we may collect information about your device, including device ID,
                                operating system, and browser type.
                            </p>
                        </li>
                        <li className="privacryAndHelpIntroSection-item">
                            <p className="item-title">3. How We Use Your Information</p>
                            <p className="item-content">
                                The information we collect is used to provide and maintain our services,
                                communicate with you including sending updates and notifications,
                                improve our app and develop new features, and ensure the security of our services.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="help-section">
                <div className="privacy-policy-title-section">
                    <h2 className="privacyAndHelpTitle">Help Section</h2>
                    <p className="privacyAndHelpSubtitle">Help & Support for ReactJS Chat App</p>
                </div>

                <div className="privacy-policy-content-section">
                    <ul className="privacryAndHelpIntroSection">
                        <li className="privacryAndHelpIntroSection-item">
                            <p className="item-title">1. Getting Started</p>
                            <p className="item-content">
                                To create an account tap "Sign Up". Enter your details and create a password. For logging in, open
                                the app and tap "Log In," then enter your email and password.
                            </p>
                        </li>
                        <li className="privacryAndHelpIntroSection-item">
                            <p className="item-title">2. Using the App</p>
                            <p className="item-content">
                                To send a message, go to the "Chats" tab, select a contact or start a new chat, type your message, and tap "Send."
                                To change your profile picture, go to "edit user" tap on your profile picture, and choose a new picture from your gallery
                                or take a new one then click on save and refresh the page. The changes should be saved successfully.
                            </p>
                        </li>
                        <li className="privacryAndHelpIntroSection-item">
                            <p className="item-title">4. Contact Support</p>
                            <p className="item-content">
                                If you need further assistance, please contact our support team at support_chat_app@gmai.com.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <button className="privacy-and-help-modal-footer-btn" onClick={onAgreeClick}>I agree</button>
        </div>
    )
}