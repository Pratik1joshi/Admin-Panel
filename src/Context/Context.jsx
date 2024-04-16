import React, { createContext, useEffect, useState } from "react";


export const Context = createContext(null);

const getDEfultCart = () =>{
  let cart={};
  for (let index = 0; index < 300+1; index++) {
    cart[index]=0;
  }
  return cart;
}

const ContextProvider = (props) => {

  const [all_product, setall_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDEfultCart)

  useEffect(()=>{
    fetch('https://myshopbackend-iou3.onrender.com/allproducts')
    .then((response)=>response.json())
    .then((data)=>setall_product(data))

    if(localStorage.getItem('auth-token')){
      fetch('https://myshopbackend-iou3.onrender.com/getcart',{
        method: 'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:"",
      }).then((response)=>response.json())
      .then((data)=>setCartItems(data));
    }
  },[])
  
  const addToCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    if(localStorage.getItem('auth-token')){
      fetch('https://myshopbackend-iou3.onrender.com/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',

        },
        body:JSON.stringify({"itemId":itemId})
      }).then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  }

  const deleteToCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    if(localStorage.getItem('auth-token')){
      fetch('https://myshopbackend-iou3.onrender.com/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',

        },
        body:JSON.stringify({"itemId":itemId})
      }).then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  }

  const getTotalAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = all_product.find((product)=>product.id === Number(item))
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount
  }

  const getTotalCartNumber = ()=>{
    let totalNumber = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalNumber += cartItems[item]
      }
    }
    return totalNumber
  }

  const contextValue = {getTotalCartNumber, getTotalAmount, all_product, cartItems, addToCart, deleteToCart};

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
