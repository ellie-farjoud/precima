import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";

/**
 * A Modal to confirm deleting a grocery item
 */

const DeleteModal = ({ isOpen, toggle, title, removeItem }) => (
  <Modal isOpen={isOpen} toggle={() => toggle()}>
    <ModalHeader toggle={() => toggle()}>Remove</ModalHeader>
    <ModalBody>
      Are you sure you want to remove <b>{title}</b>?
    </ModalBody>
    <ModalFooter>
      <Link to="/">
        <Button color="danger" onClick={() => removeItem()}>
          YES
        </Button>
      </Link>
    </ModalFooter>
  </Modal>
);

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default DeleteModal;
