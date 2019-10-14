import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#app")

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel="Opção selecionada"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Opção selecionada</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button" onClick={props.handleClearSelectedOption}>Ok</button>
    </Modal>
);

export default OptionModal;