import { Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "../context/Modal";

export default function AuthLayout() {
  return (
    <ModalProvider>
      <Outlet />
      <Modal />
    </ModalProvider>
  );
}
