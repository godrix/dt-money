import { useState } from 'react';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionProvider } from './hooks/useTransactions';



export function App() {
  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false);

  function handleOpenNewTransectionModal() {
    setIsModalTransactionOpen(true)
  }

  function handleCloseNewTransectionModal() {
    setIsModalTransactionOpen(false)
  }

  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransectionModal} />
      <Dashboard />
      <NewTransactionModal isOpen={isModalTransactionOpen} onRequestClose={handleCloseNewTransectionModal} />

      <GlobalStyle />
    </TransactionProvider>
  );
}
