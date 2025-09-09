"use client";
import { useState } from 'react';
import Modal from '../../modal';
import Upload from '../../upload';

function UploadButton() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleOpen = () => setShowUploadModal(true);
  const handleClose = () => setShowUploadModal(false);

  return (
    <div>
      <button onClick={handleOpen}>Videó feltöltése</button>

      {showUploadModal && (
        <Modal onClose={handleClose}>
          <Upload />
        </Modal>
      )}
    </div>
  );
}

export { UploadButton };
