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
        if (props.user.id===0){
            props.setPage(5)
        }
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
        console.log(portfolio)
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
                        newPrice =(asset[0].quantity*asset[0].avgprice + orders[i].quantity*orders[i].price)/(orders[i].quantity+asset[0].quantity);
                    } else {
                        newPrice = asset[0].avgprice
                    }    
                    newQuantity = asset[0].quantity +orders[i].quantity; 
                    // Updated Asset 
                    let newAsset = {
                        symbol: asset[0].symbol,
                        name: asset[0].name,
                        avgprice: (Math.round(newPrice* 100) / 100).toFixed(2),
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
            let newOrders = (res.data.message).sort( (a,b) => a.id - b.id );
            setOrders(newOrders)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }

    // HTML Functions

    // Render
    return (
    <section id='user'>
        <div className='page-nav'>
            <div>
                <p className={(props.userDisplay===0)?'fgo':''} onClick={()=>{props.setUserDisplay(0)}}>Overview</p>
            </div>
            <div>
                <p className={(props.userDisplay===1)?'fgo':''} onClick={()=>{props.setUserDisplay(1)}}>Operations</p>
            </div>
            <div>
                <p>In Depth Analysis</p>
            </div>
            <div>
                <p>Recommendations</p>
            </div>
        </div>
        <div id='current-balance'>
            <div id='current'>
                <p className='cat'>Current Balance:</p>
                <p className='value'>$ {(Math.round(props.user.balance * 100) / 100).toFixed(2)}</p>
            </div>
            <div id='divide'></div>
            <div id='total'>
                <p className='cat'>Portfolio Value:</p>
                <p className='value'>$ {total}</p>
            </div>
        </div>
        {(props.userDisplay===0)?<UserPortfolio
            user={props.user}
            orders={orders}
            portfolio={portfolio}
            setPage={props.setPage}
            setStockDisplay={props.setStockDisplay}
            setCurrentAsset={props.setCurrentAsset}
            total={total}
        />:null}
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