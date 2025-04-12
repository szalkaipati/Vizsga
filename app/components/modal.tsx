'use client';
import { ReactNode } from 'react';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}




// // Modal.tsx
// import React, { ReactNode, useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';

// type ModalProps = {
//   children: ReactNode;
//   onClose: () => void;
// };

// const Modal = ({ children, onClose }: ModalProps) => {
//   const [mounted, setMounted] = useState(false);
//   const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

//   useEffect(() => {
//     let root = document.getElementById('modal-root');
  
//     if (!root) {
//       root = document.createElement('div');
//       root.id = 'modal-root';
//       document.body.appendChild(root);
//     }
  
//     setModalRoot(root);
//     setMounted(true);
//   }, []);
  

//   if (!mounted || !modalRoot) return null;

//   return ReactDOM.createPortal(
//     <div className="overlay">
//       <div className="modal">
//         <button onClick={onClose} className="closeButton">X</button>
//         {children}
//       </div>
//     </div>,
//     modalRoot
//   );
// };

// export default Modal;
