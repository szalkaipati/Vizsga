"use client";
import { usePopup } from "../PopupContext";
export default function UploadPopup() {
    const { uploadOpen, closeAllPopups } = usePopup();

    if (!uploadOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Upload Files</h2>
                <input type="file" />
                <button onClick={closeAllPopups}>Close</button>
            </div>
        </div>
    );
}
