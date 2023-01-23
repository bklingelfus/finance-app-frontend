import { useState, useEffect } from 'react'
import axios from 'axios';
// axios.defaults.proxy.host = 
// axios.defaults.proxy.port

const StockInfo =(props)=> {
    // Variables

    // States
    const [searchResult, setSearchResult] = useState({id:0})
    const [profile, setProfile] = useState({address1:'-1'})
    const [assetFinance, setAssetFinance] = useState({
        currentPrice:{raw:0},
        recommendationKey:'',
        numberOfAnalystOpinions:{raw:0}
    })
    const [assetData, setAssetData] = useState({
        enterpriseToRevenue:{raw:0, fmt:''}
    })
    const [display, setDisplay] = useState(0)

    // On Load
    useEffect(()=>{
        let text = {text: props.currentAsset}
        getBasic(text)
        getProfile()
        getData()
        getFinance()
    },[props.currentAsset])

    // Page Functions
    const goToBuyStock =()=> {
        props.setPage(1);
        props.setUserDisplay(1);
    }
    const changeDisplay =(num)=> {
        setDisplay(num)
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
    const HtmlProfile =()=> {
        return (
            <>
                <p><span>Website: </span><a href={profile.website}>{profile.website}</a></p>
                <p><span>Industry: </span>{(profile.industry).replace('—',' & ')}</p>
                <p><span>Sector: </span>{profile.sector}</p>
                <p><span>Headquarters: </span>{profile.city} - {profile.state}, {profile.country}</p>
                <p><span>Nº of Employees </span>{profile.fullTimeEmployees}</p>
                <p><span>Business Summary: </span>{profile.longBusinessSummary}</p>
                <p><span>Audit Risk: </span>{profile.auditRisk}</p>
                <p><span>Board Risk: </span>{profile.boardRisk}</p>
                <p><span>Compensation Risk: </span>{profile.compensationRisk}</p>
                <p><span>Share Holder Rights Risk: </span>{profile.shareHolderRightsRisk}</p>
                <p><span>Overall Risk: </span>{profile.overallRisk}</p>
            </>
        )
    }
    const HtmlCompany =()=> {
        return (
            <>
                <p><span>Enterprise Value: </span>{assetData.enterpriseValue.fmt}</p>
                <p><span>Profit Margins: </span>{assetData.profitMargins.fmt}</p>
                <p><span>Earnings Quarterly Growth: </span>{assetData.earningsQuarterlyGrowth.fmt}</p>
                <p><span>Last Dividend Value: </span>$ {assetData.lastDividendValue.fmt} / share</p>
                <p><span>Last Dividend Date: </span>{assetData.lastDividendDate.fmt}</p>
                <p><span>PEG Ratio: </span>{assetData.pegRatio.fmt}</p>
                <p><span>Enterprise to Revenue: </span>{assetData.enterpriseToRevenue.fmt}</p>
                <p><span>Enterprise to Ebitda: </span>{assetData.enterpriseToEbitda.fmt}</p>
                <p><span>Price to Book: </span>{assetData.priceToBook.fmt}</p>
                <p><span>Beta: </span>{assetData.beta.fmt}</p>
                <p><span>Held % by Institutions: </span>{assetData.heldPercentInstitutions.fmt}</p>
                <p><span>Next fiscal year end: </span>{assetData.nextFiscalYearEnd.fmt}</p>
                <p><span>Most recent quarter: </span>{assetData.mostRecentQuarter.fmt}</p>
            </>
        )
    }
    const HtmlStock =()=> {
        return (
            <>
                <p><span>Current Price: </span>{assetFinance.currentPrice.fmt}</p>
                <p><span>High Price: </span>{assetFinance.targetHighPrice.fmt}</p>
                <p><span>Low Price: </span>{assetFinance.targetLowPrice.fmt}</p>
                <p><span>Recommendation by Analysts: </span>{(assetFinance.recommendationKey).replace('_'," ")}</p>
                <p><span>Nº of Analysts: </span>{assetFinance.numberOfAnalystOpinions.fmt}</p>
                <p><span>Current Ratio: </span>{assetFinance.currentRatio.fmt}</p>
                <p><span>Ebitda: </span>{assetFinance.ebitda.fmt}</p>
                <p><span>Total Debt: </span>{assetFinance.totalDebt.fmt}</p>
                <p><span>Total Revenue: </span>{assetFinance.totalRevenue.fmt}</p>
                <p><span>Debt to Equity: </span>{assetFinance.debtToEquity.fmt}</p>
                <p><span>Revenue per Share: </span>{assetFinance.revenuePerShare.fmt}</p>
                <p><span>Return on Assets: </span>{assetFinance.returnOnAssets.fmt}</p>
                <p><span>Return on Equity: </span>{assetFinance.returnOnEquity.fmt}</p>
                <p><span>Gross Profits: </span>{assetFinance.grossProfits.fmt}</p>
                <p><span>Free Cashflow: </span>{assetFinance.freeCashflow.fmt}</p>
                <p><span>Earnings Growth: </span>{assetFinance.earningsGrowth.fmt}</p>
                <p><span>Revenue Growth: </span>{assetFinance.revenueGrowth.fmt}</p>
                <p><span>Gross Margins: </span>{assetFinance.grossMargins.fmt}</p>
                <p><span>Ebitda Margins: </span>{assetFinance.ebitdaMargins.fmt}</p>
                <p><span>Operating Margins: </span>{assetFinance.operatingMargins.fmt}</p>
                <p><span>Profit Margins: </span>{assetFinance.profitMargins.fmt}</p>
            </>
        )
    }

    // Render
    return (
    <div className='stock-info'>
        {(searchResult.id===0)?null
        :<>
        <div className='stock-main'>
            <div className='stock-intro'>
                <img src={"https://s3.polygon.io/logos/"+((searchResult.symbol).toLowerCase())+"/logo.png"} alt='logo'></img>
                
                <h3>{searchResult.symbol} - {searchResult.name}</h3>
                <button className='buy-stock-mobile' onClick={goToBuyStock}>Buy Stock</button>
            </div>
            <img src={require('../Chart'+(Math.ceil(Math.random()*3))+'.png')} alt='Stock Chart' className='stock-chart'></img>
            <div className='stock-options'>
                <button onClick={()=>{changeDisplay(0)}} className={(display===0)?'on':''}>Profile</button>
                <button onClick={()=>{changeDisplay(1)}} className={(display===1)?'on':''}>Company</button>
                <button onClick={()=>{changeDisplay(2)}} className={(display===2)?'on':''}>Stock</button>
            </div>
            <div className='stock-display'>
            {(profile.address1==='-1')?
            <p>Extra Info not supported, checkout 
                <a href='https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino'>CORS Unblock</a>
            extension for better results</p>
            :<>
                <h3>{searchResult.symbol} - {(display===0)?"Profile":(display===1?"Company Data":"Stock Data")}</h3>
                {(display===0)?HtmlProfile():null}
                {(display===1)?HtmlCompany():null}
                {(display===2)?HtmlStock():null}
            </>}                
            </div>
        </div>
        <div className='stock-side'>
            <div>
                <button className='buy-stock' onClick={goToBuyStock}>Buy Stock</button>
            </div>
            <div className='news'>
                <img src='https://daytradereview.com/wp-content/uploads/2020/03/Best-Stock-Market-News-Platform.jpg' alt='article'></img>
                <p>Some News Headline</p>
            </div>
            <div className='news'>
                <img src='https://daytradereview.com/wp-content/uploads/2020/03/Best-Stock-Market-News-Platform.jpg' alt='article'></img>
                <p>Some News Headline</p>
            </div>
            <div className='news'>
                <img src='https://daytradereview.com/wp-content/uploads/2020/03/Best-Stock-Market-News-Platform.jpg' alt='article'></img>
                <p>Some News Headline</p>
            </div>
            <div className='news'>
                <img src='https://daytradereview.com/wp-content/uploads/2020/03/Best-Stock-Market-News-Platform.jpg' alt='article'></img>
                <p>Some News Headline</p>
            </div>
            <div className='news'>
                <img src='https://daytradereview.com/wp-content/uploads/2020/03/Best-Stock-Market-News-Platform.jpg' alt='article'></img>
                <p>Some News Headline</p>
            </div>
        </div> 
        </> 
        }      
    </div>
    );
}

export default StockInfo;