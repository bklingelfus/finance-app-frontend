import { useState, useEffect } from 'react'
import axios from 'axios';
// axios.defaults.proxy.host = 
// axios.defaults.proxy.port

const StockInfo =(props)=> {
    // Variables

    // States
    const [searchResult, setSearchResult] = useState({id:0})
    const [profile, setProfile] = useState({address1:'-1'})

    // On Load
    useEffect(()=>{
        let text = {text: props.currentAsset}
        getBasic(text)
        getProfile()
    },[props.currentAsset])

    // Page Functions
    const goToBuyStock =()=> {
        props.setPage(1);
        props.setUserDisplay(1);
    }

    // Connection Functions 
    // - - - basic info
    const getBasic = (text) => {
        axios.post(props.baseURL + 'search/stocks', text, { withCredentials: true })
        .then((res) => {
            let result = []
            for (let i=0;i<res.data.message.length;i++){
                if (result.length===20){break}
                result.push(res.data.message[i])
            }
            if (result.length>0) {
                setSearchResult(result[0])
            }

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }
    const getProfile = () => {
        axios.get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/"+ ((props.currentAsset).toLowerCase()) +"?modules=assetProfile")
        .then((res) => {
            setProfile(res.data.quoteSummary.result[0].assetProfile)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }

    // HTML Functions

    // Render
    return (
    <div>
        <h1>{searchResult.symbol} - {searchResult.name}</h1>
        <button onClick={goToBuyStock}>Buy Stock</button>
        {(profile.address1==='-1')?
        <p>Extra Info not supported, checkout 
            <a href='https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino'>CORS Unblock</a>
        extension for better results</p>
        :<>
            <h1>{profile.sector}</h1>
        </>}
    </div>
    );
}

export default StockInfo;