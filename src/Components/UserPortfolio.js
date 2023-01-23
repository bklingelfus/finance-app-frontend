import { useState, useEffect } from 'react'
import axios from 'axios';

const UserPortfolio =(props)=> {
    // Variables

    // States

    // On Load

    // Page Functions
    const goToStock =(symbol)=> {
        props.setCurrentAsset(symbol)
        props.setPage(2)
        props.setStockPage(1)
    }

    // Connection Functions 

    // HTML Functions

    // Render
    return (
    <div className='portfolio-home'>
        <h1>Breakdown</h1>
        <div>
            <img className='portfolio-img1' src={require('../Breakdown.png')} alt='portfolio-breakdown'></img>
            <img className='portfolio-img2' src={require('../Projection.png')} alt='portfolio-breakdown'></img>
        </div>
        <h1>Stocks Breakdown</h1>
        <div>
            <table className='stocks-breakdown'>
                <tr>
                    <th>Logo</th>
                    <th>Symbol</th>
                    <th>Stocks Owned</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>Growth</th>
                    <th>% in Portfolio</th>
                </tr>
                {props.portfolio.map((stock,index)=>{
                    return(
                        <tr key={index}>
                            <td>
                                <img alt='logo' src={"https://s3.polygon.io/logos/"+(stock.symbol).toLowerCase()+"/logo.png"}></img>
                            </td>
                            <td>{stock.symbol}</td>
                            <td>{stock.quantity}</td>
                            <td>$ {stock.avgprice}</td>
                            <td>$ {stock.lastsale}</td>
                            <td className={((stock.lastsale-stock.avgprice)/stock.lastsale)===0?"fgo":(((stock.lastsale-stock.avgprice)/stock.lastsale)>0?"green":"red")}>
                                {(Math.round(((stock.lastsale-stock.avgprice)/stock.lastsale)* 100) / 100).toFixed(2)}%
                            </td>
                            <td className={((stock.avgprice*stock.quantity)/props.total)===0?"fgo":(((stock.avgprice*stock.quantity)/props.total)>0?"green":"red")}>
                            {(Math.round((((stock.avgprice*stock.quantity)/props.total)/stock.lastsale)* 100) / 100).toFixed(2)}%
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
        <h1>Historical Performance</h1>
        <div>
            <img className='portfolio-img3' src={require('../Historical.png')} alt='portfolio-breakdown'></img>
        </div>
    </div>
    );
}

export default UserPortfolio;