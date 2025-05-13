import React from "react";

export default function Modal({ children }) {
  return (
    <dialog className="modal" open>
      {children}
    </dialog>
  );
}
