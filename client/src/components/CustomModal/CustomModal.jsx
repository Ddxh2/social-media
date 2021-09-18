import React, { useState, useEffect } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
const CustomModal = ({ iconName, header, content, isOpen, onClose }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      basic
      onClose={() => {
        setOpen(false);
        onClose();
      }}
      open={open}
      size='small'
    >
      <Header icon>
        <Icon name={iconName} />
        {header}
      </Header>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Okay
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CustomModal;
