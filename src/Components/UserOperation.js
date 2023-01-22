import { useState, useEffect } from 'react'
import axios from 'axios';

const UserOperation =(props)=> {
    // Variables

    // States
    const [display, setDisplay] = useState(0);
    const [search, setSearch] = useState({text:props.currentAsset})
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [owned, setOwned] = useState({id:0, total:0,avgprice:0})
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState(0)
    const [assetInfo, setAssetInfo] = useState({})
    const [assetFinance, setAssetFinance] = useState({currentPrice:{raw:0}})
    const [assetData, setAssetData] = useState({})
    const [error, setError] = useState('')

    // On Load
    useEffect(() => {
        const timer = setTimeout(() => {
            getSearch(search)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [search])
    useEffect(() => {
        getSearch(search)
    }, [search])
    useEffect(() => {
        if(searchResult.length===1){
            props.setCurrentAsset(searchResult[0].symbol)
            setDisplay(1)
        } else {
            setDisplay(0)
        }
    }, [searchResult])
    useEffect(() => {
        getSearch({text:props.currentAsset})
    }, [])
    useEffect(() => {
        getInfo()
        getData()
        getFinance()
        updateOwned(props.currentAsset)
    }, [props.currentAsset])

    // Page Functions
    const handleSearch =(event)=> {
        setLoading(true)
        let newSearch = {text: event.target.value}
        setSearch(newSearch)
    }
    const runSearch =(event)=> {
        event.preventDefault();
        setLoading(true)
        let newSearch = {text: event.target.value}
        setSearch(newSearch)
    }
    const goToAssetInfo =()=> {
        props.setStockDisplay(1);
        props.setPage(2)
    }    
    const goToAsset =(symbol)=> {
        props.setCurrentAsset(symbol)
        setSearch({text:symbol})
    }
    const updateOwned =(stock)=> {
        let id = 0;
        let total = 0;
        let avgprice = 0;
        let asset = (props.orders.filter(function(e){
            return e.symbol === stock
        })).sort( (a,b) => a.id - b.id );
        console.log(asset)
        for (let i=0;i<asset.length;i++){
            id=asset[i].id
            // Assign new quantity and price based on type of operation
            if (asset[i].type === "Buy") {
                avgprice = (total*avgprice + asset[i].quantity*asset[i].price)/(total+asset[i].quantity)
            } else {
                avgprice = avgprice
            }  
            total += asset[i].quantity
        }
        let newOwned = {id:id,total:total,avgprice:avgprice}
        setOwned(newOwned)
    }
    const submitOrder =()=>{
        let newOrder ={
            type: type,
            quantity: quantity,
            price: assetFinance.currentPrice.raw,
            asset: searchResult[0].id,
            user: props.user.id,
        }
        
        if(quantity===0){
            setError('You cannot perform an operation with 0 quantity!')
        } else if (quantity>owned.total && newOrder.type==='Sell'){
            setError('You cannot sell more than what you own!')
        } else if (props.user.balance<(quantity*assetFinance.currentPrice.raw) && newOrder.type==='Buy'){
            setError('Insufficient funds for operation!')
        } else {
            createOrder(newOrder)
            let updatedUser = {
                id: props.user.id,
                name: props.user.name,
                email: props.user.email,
                password: props.user.password,
                profileImage:props.user.profileImage,
                notifications: props.user.notifications,
                darkMode: props.user.darkMode,
                balance: props.user.balance - newOrder.quantity*newOrder.price,
            }
            props.setUser(updatedUser)
            props.setUserDisplay(0)
        }
    }
    const changeOrder =(event)=>{
        if(event.target.name==='quantity'){
            
            setQuantity((event.target.value)*((type==='Buy')?1:-1))
        } else {
            setType(event.target.value)
        }
    }

    // Connection Functions 
    const getSearch = (text) => {
        axios.post(props.baseURL + 'search/stocks', text, { withCredentials: true })
        .then((res) => {
            let result = []
            for (let i=0;i<res.data.message.length;i++){
                if (result.length===20){break}
                result.push(res.data.message[i])
            }
            setSearchResult(result)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }
    const createOrder = (newOrder) => {
        axios.post(props.baseURL + 'order/insert', newOrder, { withCredentials: true })
        .then((res) => {
            console.log(res)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }
    const getInfo = () => {
        axios.get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/"+ ((props.currentAsset).toLowerCase()) +"?modules=assetProfile")
        .then((res) => {
            setAssetInfo(res.data.quoteSummary.result[0].assetProfile)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }
    const getData = () => {
        axios.get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/"+ ((props.currentAsset).toLowerCase()) +"?modules=defaultKeyStatistics")
        .then((res) => {
            setAssetData(res.data.quoteSummary.result[0].defaultKeyStatistics)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }
    const getFinance = () => {
        axios.get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/"+ ((props.currentAsset).toLowerCase()) +"?modules=financialData")
        .then((res) => {
            setAssetFinance(res.data.quoteSummary.result[0].financialData)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }

    // HTML Functions
    const HtmlSearch =()=> {
        return (
            <div id='search'>
                {(loading)?
                <>
                    <div className="loader"></div>
                </>
                :<>
                    {searchResult.map((result,index)=>{
                        return(
                            <>
                            {(result.symbol==="USD")?
                            null
                            :<div onClick={()=>{goToAsset(result.symbol)}} id={result.index}>
                                <img alt='Stock Logo'></img>                               
                                <p>{result.symbol}</p>   
                                <p>{result.name}</p>
                            </div>}
                            </>
                        )
                    })}
                </>}
            </div>
        )
    }
    const HtmlOperation =()=> {
        return (
            <div>
                <h1>Asset Operation</h1>
                <div>
                    <div>
                        <label htmlFor='name'>Buy</label>
                        <input onChange={changeOrder} type='radio' name='type' value='Buy'></input>
                        <label htmlFor='name'>Sell</label>
                        <input onChange={changeOrder} type='radio' name='type' value='Sell'></input>
                    </div> 
                    <div>     
                        <label htmlFor='name'>Quantity</label>
                        <input onChange={changeOrder} type='number' name='quantity'></input>
                        <p>You own: {owned.total}</p>
                    </div>  
                    <div>     
                        <p>Current Price: $ {(Math.round(assetFinance.currentPrice.raw* 100) / 100).toFixed(2)}</p>
                        <p>Your Avg. Price: $ {owned.avgprice}</p>
                    </div>     
                    <button onClick={submitOrder}>Submit Order</button>
                    {(error.length>0)?
                    <p>{error}</p>
                    :null
                    }  
                </div>
                <div>
                    <button onClick={goToAssetInfo}>More Info</button>
                    <h1>{searchResult[0].symbol}</h1>                    
                </div>
            </div>
        )
    }

    // Render
    return (
    <div>
        <h1>UserOperation</h1>
        <form id='search-form' onSubmit={runSearch}>
            <input className='search-bar' type='text' placeholder='search for an asset' onChange={handleSearch}></input>
            <button className='search-submit' type='submit'>
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        {(display===0)?HtmlSearch():null}
        {(display===1)?HtmlOperation():null}
    </div>
    );
}

export default UserOperation;