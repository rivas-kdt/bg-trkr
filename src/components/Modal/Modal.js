import React, { createContext, useContext } from "react";
import { ImCross } from "react-icons/im";

// Create a context to track if the modal is being used correctly
const ModalContext = createContext(false);

// Modal container component
const Modal = ({ className, children, onClose, color }) => {
  return (
    <ModalContext.Provider value={true}>
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${className} `}>
        <div className={`relative rounded-lg shadow-lg w-[85%] bg-zinc-700 ${color}`}>
          <button
            className="absolute top-3 right-3"
            onClick={onClose}
          >
            <ImCross className="text-white  hover:text-red-500"/>
          </button>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

// Modal Header component
const ModalHeader = ({ className, children }) => {
  const isInsideModal = useContext(ModalContext);

  if (!isInsideModal) {
    throw new Error("ModalHeader must be used inside a Modal component.");
  }

  return (
    <div className={`text-xl font-bold border-b pb-2 p-4 ${className}`}>
      {children}
    </div>
  );
};

// Modal Body component
const ModalBody = ({ className, children }) => {
  const isInsideModal = useContext(ModalContext);

  if (!isInsideModal) {
    throw new Error("ModalBody must be used inside a Modal component.");
  }

  return <div className={`p-4 ${className}`}>{children}</div>;
};

// Modal Footer component
const ModalFooter = ({ className, children }) => {
  const isInsideModal = useContext(ModalContext);

  if (!isInsideModal) {
    throw new Error("ModalFooter must be used inside a Modal component.");
  }

  return (
    <div className={`flex justify-end space-x-2 p-4 border-t ${className}`}>
      {children}
    </div>
  );
};

export { Modal, ModalHeader, ModalBody, ModalFooter };
