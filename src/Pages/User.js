import { useState, useEffect } from 'react'
import { ReactDOM } from 'react';
import { Ref } from 'react';
import axios from 'axios';
import UserPortfolio from '../Components/UserPortfolio';
import UserOperation from '../Components/UserOperation';

const User =(props)=> {
    // Variables

    // States
    const [total, setTotal] = useState(0);
    const [orders, setOrders] = useState([]);
    const [portfolio, setPortfolio] = useState([]);

    // On Load
    useEffect(()=>{
        getOrders()
    },[]);
    useEffect(()=>{
        const interval = setInterval(()=>{
            getOrders()
            buildPortfolio()
            getTotal()
        }, 2000);
        
        return ()=>{
            if (interval) {
                clearInterval(interval)
            }
        }
    });
    useEffect(()=>{
        buildPortfolio()
    },[orders]);
    useEffect(()=>{
        getTotal()
    },[portfolio]);

    // Page Functions
    const getTotal =()=> {
        let newTotal = 0;
        // Take each asset value in portfolio
        for (let i=0;i<portfolio.length;i++){
            newTotal += portfolio[i].quantity*portfolio[i].lastsale
        }
        setTotal(
            (Math.round(newTotal * 100) / 100).toFixed(2)
        );
    }
    const buildPortfolio =()=> {
        // Create New Portfolio
        let newPortfolio = []
        // Loop Through the prders
        for(let i=0;i<orders.length;i++){
            // Check if it is an operation order
            if (orders[i].type === "Buy" || orders[i].type === "Sell") {
                // Check if asset already included
                let asset = (newPortfolio.filter(function(e){
                    return e.symbol === orders[i].symbol
                }))
                if (asset.length>0){   
                    // Assign new quantity and price based on type of operation
                    let newQuantity = 0;  
                    let newPrice =0;
                    if (orders[i].type === "Buy") {
                        newPrice =(asset[0].quantity*asset[0].avgprice + orders[i].quantity*orders[i].price)/newQuantity;
                    } else {
                        newPrice = asset[0].avgprice
                    }    
                    newQuantity = asset[0].quantity +orders[i].quantity; 
                    // Updated Asset 
                    let newAsset = {
                        symbol: asset[0].symbol,
                        name: asset[0].name,
                        avgprice: newPrice,
                        lastsale: asset[0].lastsale,
                        quantity: newQuantity,
                        lastOperation: orders[i].date,
                    }
                    let updatePortfolio = newPortfolio.filter(function(e){
                        return e.symbol !== orders[i].symbol
                    })
                    // Check if asset position wasn't liquidaded
                    if (newQuantity>0){
                        updatePortfolio.push(newAsset)
                    }
                    newPortfolio = updatePortfolio
                } else {
                    let newAsset = {
                        symbol: orders[i].symbol,
                        name: orders[i].name,
                        avgprice: orders[i].price,
                        lastsale: orders[i].lastsale,
                        quantity: orders[i].quantity,
                        lastOperation: orders[i].date,
                    }
                    newPortfolio.push(newAsset)
                }
            }
        }
        setPortfolio(newPortfolio)
    }

    // Connection Functions 
    const getOrders =  () => {
        axios.get(props.baseURL + 'order/fetch', { withCredentials: true })
        .then((res) => {

            setOrders(res.data.message)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }

    // HTML Functions

    // Render
    return (
    <section id='user'>
        <h1>User</h1>
        <div className='page-nav'>
            <div>
                <p onClick={()=>{props.setUserDisplay(0)}}>Overview</p>
            </div>
            <div>
                <p onClick={()=>{props.setUserDisplay(1)}}>Operations</p>
            </div>
            <div>
                <p>In Depth Analysis</p>
            </div>
            <div>
                <p>Recommendations</p>
            </div>
        </div>
        <div>
            <p>Current Balance:</p>
            <p>$ {(Math.round(props.user.balance * 100) / 100).toFixed(2)}</p>
            <p>Total Portfolio Value:</p>
            <p>$ {total}</p>
        </div>
        {(props.userDisplay===0)?<UserPortfolio/>:null}
        {(props.userDisplay===1)?
        <UserOperation 
            currentAsset={props.currentAsset}
            setCurrentAsset={props.setCurrentAsset}
            setPage={props.setPage}
            setStockDisplay={props.setStockDisplay}
            baseURL={props.baseURL}
            orders={orders}
            user={props.user}
            setUser={props.setUser}
            setUserDisplay={props.setUserDisplay}
        />:null}
    </section>
    );
}

export default User;