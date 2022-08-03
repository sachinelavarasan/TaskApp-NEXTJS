import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

import CloseModalIcon from "../public/close-modal.svg";

export const CustomModal = ({ show, onHide, children, title, isDelete }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header className="flex items-center justify-between ">
        <div className="flex items-center h-full">
          {isDelete ? (
            <FiTrash2 className="text-red-500 font-bold mr-5" size={20} />
          ) : null}
          <span className="text-black text-[20px] font-semibold">{title}</span>
        </div>
        <button onClick={onHide} type="button">
          <Image src={CloseModalIcon} alt="Close" height={25} width={25} />
        </button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
