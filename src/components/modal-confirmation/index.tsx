import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import image from '@/assets/person-ask-question.webp';

function ModalConfirmation({
  message,
  onAccept,
  onDecline,
  isOpen,
  setIsOpen,
}: {
  message: string;
  onAccept: () => void;
  onDecline: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <>
      <Modal show={isOpen} size="sm" onClose={() => setIsOpen(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center space-y-4">
            <img src={image} alt="person-ask-question" className="w-auto h-auto mx-auto" />
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{message}</p>

            <div className="flex justify-center gap-4">
              <Button className="cursor-pointer" onClick={onAccept}>
                Yakin
              </Button>
              <Button className="cursor-pointer" color="secondary" onClick={onDecline}>
                Tidak
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalConfirmation;
