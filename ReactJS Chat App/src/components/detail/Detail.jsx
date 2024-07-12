import './detail.css'

import { useState } from "react";

export const Detail = () => {
    const [chatSettings, setChatSettings] = useState(true);
    const [privacyAndHelp, setPrivacyAndHelp] = useState(true);
    const [sharedPhotos, setSharedPhotos] = useState(true);
    const [sharedFiles, setSharedFiles] = useState(true);

    return (
        <div className="detail">
            <div className="detail-userInformation">
                <img src="./avatar.png" alt="detail-avatar" className='detail-avatar' />
                <h2 className='detail-title'>Maria Nelson</h2>
                <p className='detail-subtitle'>Grateful for every sunrise and sunset</p>
            </div>

            <div className="detail-options">
                <div className="detail-option">
                    <div className="option-title">
                        <span>Chat Setting</span>
                        <img
                            src={chatSettings ? "./arrowUp.png" : "./arrowDown.png"}
                            alt="arrowUp png" className='arrow-png'
                            onClick={() => setChatSettings(!chatSettings)}
                        />
                    </div>
                </div>

                <div className="detail-option">
                    <div className="option-title">
                        <span>Privacy & help</span>
                        <img
                            src={privacyAndHelp ? "./arrowUp.png" : "./arrowDown.png"}
                            alt="arrowUp png" className='arrow-png'
                            onClick={() => setPrivacyAndHelp(!privacyAndHelp)}
                        />
                    </div>
                </div>

                <div className="detail-option">
                    <div className="option-title">
                        <span>Shared photos</span>
                        <img
                            src={sharedPhotos ? "./arrowUp.png" : "./arrowDown.png"}
                            alt="arrowUp png" className='arrow-png'
                            onClick={() => setSharedPhotos(!sharedPhotos)}
                        />
                    </div>

                    {!sharedPhotos ?
                        <>
                            {/* TODO: Replace with actual data */}
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

                <div className="detail-option">
                    <div className="option-title">
                        <span>Shared files</span>
                        <img
                            src={sharedFiles ? "./arrowUp.png" : "./arrowDown.png"}
                            alt="arrowUp png" className='arrow-png'
                            onClick={() => setSharedFiles(!sharedFiles)}
                        />
                    </div>
                </div>
            </div>

            <footer className="buttons">
                <button className="block-user">Block User</button>
                <button className="logout-btn">Logout</button>
            </footer>
        </div>
    )
}