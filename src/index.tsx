import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import {createServer, Model} from 'miragejs'

createServer({
  models:{
    transactions:Model
  },
  seeds(server){
    server.db.loadData({
      transactions:[{
        id:1,
        title:'Teste',
        type:'deposit',
        category:'Dev',
        amount:600,
        createdAt:new Date('2021-02-12 09:30:02')
      }]
    })
  },
  routes(){
    this.namespace = 'api';
    this.get('/transactions', ()=>{
      return this.schema.all('transactions')
    });

    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody);
       return schema.create('transactions', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

