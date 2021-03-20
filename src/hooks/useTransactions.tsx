import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../services/api';

interface Transaction{
  id:number;
  title:string;
  type:'deposit'|'withDraw';
  category:string;
  amount:number;
  createdAt:string;
}

interface TransactionContextDTO{
  transactions:Transaction[];
  createTransaction:(transaction:TransactionInput)=>Promise<void>;
}

interface TransactionProviderProps{
  children:ReactNode
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

const TransactionContext = createContext<TransactionContextDTO>({} as TransactionContextDTO);

export function TransactionProvider({children}:TransactionProviderProps){
const [transactions, setTransactions] = useState<Transaction[]>([]);

async function createTransaction(transaction:TransactionInput){

 const response = await api.post('/transactions', {
   ...transaction,
   createdAt:new Date() 
 });
 const {transactions:transactionsResponse} = response.data;

 setTransactions([
   ...transactions,
   transactionsResponse
 ])
}

useEffect(() => {
  api.get('/transactions').then(response => setTransactions(response.data.transactions))
}, []);

return <TransactionContext.Provider value={{transactions, createTransaction}}>
  {children}
</TransactionContext.Provider>
}

export function useTransactions(){
  const context = useContext(TransactionContext);

  return context;
}