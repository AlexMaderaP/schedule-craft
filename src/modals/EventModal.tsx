import { createPortal } from "react-dom";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";

type EventModalProps = {
  openEventModal: boolean;
  children: ReactNode;
};

function EventModal({ openEventModal, children }: EventModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

  useLayoutEffect(() => {
    if (!openEventModal && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = openEventModal;
  }, [openEventModal]);

  if (!openEventModal && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => {
        setIsClosing(false);
      }}
      className={`modal ${isClosing ? "closing" : ""}`}
    >
      <div className="overlay"></div>
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modals")!
  );
}

export default EventModal;
