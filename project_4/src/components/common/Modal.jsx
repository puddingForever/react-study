import React from "react";

export default function Modal({ children }) {
  return (
    <dialog className="modal" open>
      {children}
      <div className="modal-actions ">
        <button className="text-button">닫기</button>
        <button className="button">Go to checkout</button>
      </div>
    </dialog>
  );
}
