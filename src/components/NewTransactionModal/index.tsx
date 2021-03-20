import React, { useState } from 'react'
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeSvg from '../../assets/close.svg';
import incomeSvg from '../../assets/income.svg';
import outcomeSvg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const {createTransaction} = useTransactions()
  const [type, setType] = useState<'deposit'|'withDraw'>('deposit');
  const [valuesNewTransaction, setValuesNewTransaction] = useState({
    title: '',
    amount: 0,
    category: ''
  });

  function handleNewTransaction(event: React.FormEvent) {
    event.preventDefault();
    
    createTransaction({
      ...valuesNewTransaction,
      type
    })

    setValuesNewTransaction({
      title: '',
      amount: 0,
      category: ''
    })
    setType('deposit');
    onRequestClose()

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
          value={valuesNewTransaction.amount}
          onChange={event=>setValuesNewTransaction({...valuesNewTransaction, amount:Number(event.target.value)})}
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
            onClick={() => setType('withDraw')}
            isActive={type === 'withDraw'}
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