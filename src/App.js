import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from "./components/Alert";
import { v4 as uuidv4 } from 'uuid';

// const initialExpenses = [
//   {
//     id:uuidv4(),
//     charge: 'rent',
//     amount: 1600
//   },
//   {
//     id:uuidv4(),
//     charge: 'car payment',
//     amount: 400
//   },
//   {
//     id:uuidv4(),
//     charge: 'credit card',
//     amount: 1200
//   }
// ]
const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  },[expenses])

  const handleCharge = (e) => {
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount} : item
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited successfully'})
      }else{
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'item added successfully'})
      }
      setCharge('');
      setAmount('');

    }else{
      handleAlert({ type: 'danger', text: 'please enter the values'})
    }
  }

  const clearItems = () => {
      setExpenses([]);
      handleAlert({ type: 'success', text: 'all item deleted successfully'})
  }

  const handleDelete = (id) => {
      let tempExpenses = expenses.filter(item => item.id !== id)
      setExpenses(tempExpenses);
      handleAlert({ type: 'success', text: 'item deleted successfully'})
  }

  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <Fragment>
      { alert.show && <Alert type={alert.type} text={alert.text}/> }
      <Alert/>
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm 
          charge={charge} 
          amount={amount} 
          handleCharge={handleCharge}
          handleAmount={handleAmount} 
          submit={handleSubmit}
          edit={edit}/>
        <ExpenseList 
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}/>
      </main>
      <h1>
        total spending: <span className='total'>
          ${expenses.reduce((acc,curr) => {
            return (acc += parseInt(curr.amount))
           },0)}
        </span>
      </h1>
    </Fragment>
  );
}

export default App;
