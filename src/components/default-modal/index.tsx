import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
interface IDefaultModalProps {
  title: string;
  children: React.ReactNode;
  showAccept?: boolean;
  showDecline?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  labelAccept?: string;
  labelDecline?: string;
  isOpen: boolean;
  isDisabledAccept?: boolean;
  isDisabledDecline?: boolean;
}

function DefaultModal(props: IDefaultModalProps) {
  const {
    title,
    children,
    showAccept = true,
    showDecline = true,
    onClose,
    onAccept,
    onDecline,
    labelAccept = 'Simpan',
    labelDecline = 'Batal',
    isOpen,
    isDisabledAccept = false,
    isDisabledDecline = false,
  } = props;

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => onClose?.()}>
        <ModalHeader className=" border-gray-200">{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {(showAccept || showDecline) && (
          <ModalFooter>
            {showAccept && (
              <Button
                className="cursor-pointer"
                onClick={() => onAccept?.()}
                disabled={isDisabledAccept}
              >
                {labelAccept}
              </Button>
            )}
            {showDecline && (
              <Button
                className="cursor-pointer"
                color="secondary"
                onClick={() => onDecline?.()}
                disabled={isDisabledDecline}
              >
                {labelDecline}
              </Button>
            )}
          </ModalFooter>
        )}
      </Modal>
    </>
  );
}
export default DefaultModal;
