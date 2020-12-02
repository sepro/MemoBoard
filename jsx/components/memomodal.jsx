import React from 'react';
import ReactDom from 'react-dom';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


class MemoModal extends React.Component{

    render() {
      return (
        <Modal isOpen={this.props.open} onRequestHide={this.props.close}>
          <ModalHeader>
            <ModalClose onClick={this.closeModal}/>
            <ModalTitle>Confirm delete</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>You are about to delete a list with items. Do you want to proceed ?</p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.props.close}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={this.props.delete}>
              Delete
            </button>
          </ModalFooter>
        </Modal>
      )
    }
}


export default MemoModal;