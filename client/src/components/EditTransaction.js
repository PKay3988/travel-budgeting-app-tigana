import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const EditTransaction = (props) => { 
    const [expense, setExpense] = useState({date: "" , category: "", amount: "", amount_native_currency: "", notes: "", wallet_id: ""});
    // const editFormInitialState = { date: "", category: "Food", amount: "", amount_native_currency: 0, notes: "", wallet_id: ""};
    // const [formData, setFormData] = useState(editFormInitialState);
    // const [date, setDate] = useState("");
    // const [amount, setAmount] = useState("");
    // const [notes, setNotes] = useState("");
    // const [category, setCategory] = useState("");    
    const onChangeEdit = (e) => {
        setExpense({...expense, [e.target.name] : e.target.value});
    }
    
//    const handleInputChangeEdit = (event) => {
//     let { name, value } = event.target;
//     setFormData({ ...formData,  [name]: value});
//   }
    // setFormData({ ...formData,  [date]: value, [category]: value, [amount]:value, [amount_native_currency]: value, [notes]: value, [wallet_id]: value});
  

  // let strDate = new Date();
  // let shortYear = strDate.getFullYear();
  // let twoDigitYear = shortYear.toString().substr(-2);


    // const getTransaction = (id) => {
    // // console.log('hi')
    //   fetch(`/expenses/${id}`)
    //     .then((response) => response.json())
    //     .then(json => {
    //       console.log(json);
    //       setExpense(json);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    const handleSubmitEdit = (event) => {
    event.preventDefault();
    props.updateTransaction(expense.date, expense.category,expense.amount, expense.amount_native_currency, expense.notes, expense.wallet_id);
  }; 
    

    return (
        <div className="add-transaction">
        <div className="nav"> <p> <Link className="exp-nav" to={`/walletdetail/${props.cityId}`} > &lt; expenses </Link>
        </p> 
        </div>
        <h2>New expense</h2>
          <form className="form">
            <label></label>
            <input  type="date"
            onChange={onChangeEdit} name="date"  placeholder="date"  value= {expense.date} className="date">
            </input>
            
            {/* <input type="text"
            onChange={(e) => handleInputChange(e)} name="category" value= {formData.category} placeholder="category">
            </input> */}

            <select id="categories" name="category" onChange={onChangeEdit}> 
            <option value={"Food"}>Food</option>
            <option value={"Travel"}>Travel</option>
            <option value={"Shopping"}>Shopping</option>
            <option value={"Others"}>Others</option>
            <option value={"Accommodation"}>Accommodation</option>
            </select>

            <input type="text"
            onChange= {onChangeEdit}  name="amount" value= {expense.amount} placeholder="amount">
            </input>
       
           <input type="notes"
            onChange= {onChangeEdit} name="notes" value= {expense.notes} placeholder="notes">
            </input>
          
            <div className="col text-center">
            <button className="btn btn-light new-button" onClick={handleSubmitEdit} type ="submit">
            submit
            </button>
           
          
            </div>
          </form>

            
        </div>
    )
}

export default EditTransaction;