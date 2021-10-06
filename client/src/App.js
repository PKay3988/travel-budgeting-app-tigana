import './App.css';
import React, { useEffect, useState} from "react";
import WalletDetail from "./components/WalletDetail";
import NewWallet from "./components/NewWallet";
import NewTransaction from "./components/NewTransaction";
import WalletList from "./components/WalletList";
import ExchangeRates from "./components/ExchangeRates";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function App() {

const [wallets, setWallets] = useState([]); 
const [expenses, setExpenses] = useState([]);
const [currency, setCurrency] = useState(0);
const [error, setError] = useState("");


const formInitialState = { date: "", category: " ", amount: "", amount_native_currency: "", notes: "", wallet_id: "",};
// const walletInitialState = { city: "", currency: "", native_currency: "",sum :" ", sum_native_currency:" ", user_id:"" };
const [formData, setFormData] = useState(formInitialState);
// const [walletData, setWalletData] = useState(walletInitialState)
const [walletId, setWalletId] = useState(0);
// const [sumWallet, setSumWallet] = useState(0);
//add onlick wallet map or add a button
// key needs to be added {item.id}
// after onclick, create function getWalletId
//update setWalletId hook
//replace 34 by hookId 
//add condition inside addExpense function to avoid new transaction without walletId



const getWallets = () => {
  // console.log('hi')
    fetch("/wallets")
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        setWallets(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getExpenses = () => {
  // console.log('hi')
    fetch("/expenses")
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        setExpenses(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const onSelectWallet = (id) => {
    setWalletId(id);
    console.log(walletId)
  }

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    
    setFormData({ ... formData,  [name]: value});
  }


   const handleSubmit = (event) => {
    event.preventDefault();
    addExpense(formData.date, formData.category,formData.amount, 0, formData.notes, walletId );
    setFormData(formInitialState);
  };
  

 

  const addExpense = async (date, category, amount, amount_native_currency, notes, wallet_id) => {
    let expense = { date, category, amount, amount_native_currency, notes, wallet_id};
    let options = { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)};

      try {
        await fetch ("/expenses", options);
        getExpenses();
      } catch (err) {
        console.log("network error:" , err);
      }
  }
  const addWallet = async (city, currency, native_currency, sum, sum_native_currency, user_id) => {
    let wallet = { city, currency, native_currency, sum, sum_native_currency, user_id};
    let options = { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wallet)};

      try {
        await fetch ("/wallets", options);
        console.log(wallets)
        getWallets();
      } catch (err) {
        console.log("network error:" , err);
      }
  }




  //try out static external API call - USD to GBP
async function getCurrency(currency) {
  let currency_url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=GBP&apikey=4E8ZBH6BEU83RWHA";


try {
  let response = await fetch(currency_url);
  if(response.ok) {
    let currencyResult = await response.json();
    let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    setCurrency(currency)
    // console.log(currency)
  } else {
    setError ("server error")
  }
} catch (err) {
  setError("network error");
}
}

useEffect(() => {
    // console.log("goodbye")
    getWallets();
    getExpenses();
    getCurrency();
    sumWallet();
  }, []);


const sumWallet = () => {
  wallets.map (wallets => {
    expenses.map( expenses => {
      if(wallets.id === expenses.wallet_id) {
        let walletSum = 0;
        walletSum += expenses.amount;
        console.log(walletSum)
      }
    })
  })
}

//component wallets - render in app js as a list
//inside of wallets component - fetch get wallets 
// display list of wallets - 
//state called sum  to display later
// create individual wallet component -> get all transactions -> loop through transactions and create function getSum, loop through transactions add it up together, setSum(total)
//pass props 


  
  //First version
//  wallets.map( wallet = () => {
//   expenses.map( expense = () =>{
//       //if wallet id  === expense wallet id
//           //then wallet sum += expense sum
         
//   })
//  }
//   //display sum in a html tag
//  )



  return (
    <Router> 
      <div className="App">
   
      <h1> TRAVEL EXPENSE TRACKER APP</h1>
      <Switch>
          <Route path ="/" exact> <WalletList wallets={wallets}/> </Route> 
          <Route path ="/walletdetail"> <WalletDetail expenses={expenses} /> </Route>
          <Route path ="/newwallet" > <NewWallet addWallet={(city, currency, native_currency, sum, sum_native_currency, user_id) => addWallet(city, currency, native_currency, sum, sum_native_currency, user_id)} /> </Route>
          <Route path ="/newtransaction"> <NewTransaction addExpense={(date, category, amount, mount_native_currency , notes, wallet_id) => addExpense(date, category, amount, mount_native_currency , notes, wallet_id)} /> </Route>
          <Route path ="/exchangerates"> <ExchangeRates currency={currency} /> </Route>

      </Switch>  
    </div>
    </Router>
  );
}




export default App;
