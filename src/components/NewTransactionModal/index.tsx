import React, { useState } from 'react'
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeSvg from '../../assets/close.svg';
import incomeSvg from '../../assets/income.svg';
import outcomeSvg from '../../assets/outcome.svg';
import { api } from '../../services/api';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');
  const [valuesNewTransaction, setValuesNewTransaction] = useState({
    title: '',
    value: 0,
    category: ''
  });

  function handleNewTransaction(event: React.FormEvent) {
    event.preventDefault();
    const data = {
      ...valuesNewTransaction,
      type
    }

    api.post('/transactions', data)

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeSvg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={valuesNewTransaction.title}
          onChange={event=>setValuesNewTransaction({...valuesNewTransaction, title:event.target.value})}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valuesNewTransaction.value}
          onChange={event=>setValuesNewTransaction({...valuesNewTransaction, value:Number(event.target.value)})}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeSvg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeSvg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={valuesNewTransaction.category}
          onChange={event=>setValuesNewTransaction({...valuesNewTransaction, category:event.target.value})}
        />
        <button type="submit">
          Cadastrar
     </button>
      </Container>
    </Modal>
  )
}