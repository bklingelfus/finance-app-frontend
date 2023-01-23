import { useState, useEffect } from 'react'
import axios from 'axios';
import StockHome from '../Components/StockHome'
import StockInfo from '../Components/StockInfo'

const Stock =(props)=> {
    // Variables

    // States
    const [search, setSearch] = useState({text:""})
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

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
        getSearch({text:props.currentAsset})
    }, [])

    // Page Functions    
    const handleSearch =(event)=> {
        props.setSearchPage(true)
        setLoading(true)
        let newSearch = {text: event.target.value}
        setSearch(newSearch)
    }
    const runSearch =(event)=> {
        event.preventDefault();
        props.setSearchPage(true)
        setLoading(true)
        let newSearch = {text: event.target.value}
        setSearch(newSearch)
    }
    const goToAsset =(symbol)=> {
        props.setCurrentAsset(symbol)
        props.setStockDisplay(1)
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
                            :<>
                            <div className='search-options' onClick={()=>{goToAsset(result.symbol)}} id={index}>
                                <div className='stock-logo'>
                                    <img src={"https://s3.polygon.io/logos/"+(result.symbol).toLowerCase()+"/logo.png"} alt='Stock Logo'></img>  
                                </div>
                                <div className='stock-symbol'>                   
                                    <p>{result.symbol}</p>  
                                </div>
                                <div className='stock-name'>  
                                    <p>{result.name}</p>
                                </div>         
                            </div>
                            <div className='spacer'></div>
                            </>}
                            </>
                        )
                    })}
                </>}
            </div>
        )
    }

    // Render
    return (
    <section id='stocks'>
        <div className='page-nav'>
            <div>
                <p className='fgo' onClick={()=>{props.setStockDisplay(0)}}>Home</p>
            </div>
            <div>
                <p>Letter from Experts</p>
            </div>
            <div>
                <p>News</p>
            </div>
            <div>
                <p>Reports</p>
            </div>
        </div>
        <form id='search-form' onSubmit={runSearch}>
            <input className='search-bar' type='text' placeholder='search for an asset' onChange={handleSearch}></input>
            <button className='search-submit' type='submit'>
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        {(props.searchPage===true)?HtmlSearch():null}
        {(props.stockDisplay===0)?<StockHome/>:null}
        {(props.stockDisplay===1)?
        <StockInfo  
            currentAsset={props.currentAsset}
            setUserDisplay={props.setUserDisplay}
            setPage={props.setPage}
            baseURL={props.baseURL}
        />:null}
    </section>
    );
}

export default Stock;