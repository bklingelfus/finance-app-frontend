import { useState, useEffect } from 'react'
import axios from 'axios';

const Navbar =(props)=> {
    // Variables

    // States
    const [hamburguer, setHamburguer] = useState(false)
    const [dropdown, setDropdown] = useState(0)

    // On Load
    useEffect(()=>{
    });

    // Page Functions
    const hamburguerClick=()=>{
        if (hamburguer===false) {
            setHamburguer(true)
        } else {
            setHamburguer(false)
        }
    }

    const dropdownClick=(num)=>{
        if (dropdown===num) {
            setDropdown(0)
        } else {
            setDropdown(num)
        }
    }
    const changePage=(num)=>{
        props.setPage(num)
        setHamburguer(false)
    }
    const userRoute =(num)=> {
        props.setPage(1)
        props.setUserDisplay(num)
        setDropdown(0)
        setHamburguer(false)
    }
    // Connection Functions

    // HTML Functions

    // Render
    return(
        <header>
            <nav className={'navbar'}>
                <div onClick={hamburguerClick} className={'hamburguer '+ ((hamburguer===true)?'active':'')}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <div id='logo'>
                    <img onClick={()=>{changePage(0)}} src={require('../logo.png')} alt='logo'></img>
                </div>
                <ul className={'nav-menu '+ ((hamburguer===true)?'active':'')}>
                    <li className='nav-li'>
                        <button onClick={()=>{changePage(0)}}>
                        Home
                        </button>
                    </li> 
                    <li className='nav-li'>
                        <button>
                            <p onClick={()=>{userRoute(0)}}>My Portfolio</p>
                            <i onClick={()=>{dropdownClick(1)}} className={"fa-solid fa-chevron-right "+((dropdown===1)?"down":"")}></i>
                        </button>
                        <ul className='dropdown'>
                            <li onClick={()=>{userRoute(0)}}>Overview</li>
                            <li onClick={()=>{userRoute(1)}}>Operations</li>
                            <li>In Depth Analysis <span className='coming-soon'>(coming soon)</span></li>
                            <li>Recommendations <span className='coming-soon'>(coming soon)</span></li>
                        </ul>
                    </li> 
                    {(dropdown===1)?
                    <ul className='dropdown-mobile'>
                            <li onClick={()=>{userRoute(0)}}>Overview</li>
                            <li onClick={()=>{userRoute(1)}}>Operations</li>
                            <li>In Depth Analysis <span className='coming-soon'>(coming soon)</span></li>
                            <li>Recommendations <span className='coming-soon'>(coming soon)</span></li>
                    </ul>
                    :null}
                    <li className='nav-li'>
                        <button>
                            <p onClick={()=>{changePage(2)}}>Investments</p>
                            <i onClick={()=>{dropdownClick(2)}} className={"fa-solid fa-chevron-right "+((dropdown===2)?"down":"")}></i>
                        </button>
                        <ul className='dropdown'>
                            <li onClick={()=>{changePage(2)}}>Stock Market</li>
                            <li>Real State <span className='coming-soon'>(coming soon)</span></li>
                            <li>Bonds <span className='coming-soon'>(coming soon)</span></li>
                            <li>Options Market<span className='coming-soon'>(coming soon)</span></li>
                            <li>International Markets <span className='coming-soon'>(coming soon)</span></li>
                            <li>Crypto Currency <span className='coming-soon'>(coming soon)</span></li>
                        </ul>
                    </li> 
                    {(dropdown===2)?
                    <ul className='dropdown-mobile'>
                        <li onClick={()=>{changePage(2)}}>Stock Market</li>
                        <li>Real State <span className='coming-soon'>(coming soon)</span></li>
                        <li>Bonds <span className='coming-soon'>(coming soon)</span></li>
                        <li>Options Market<span className='coming-soon'>(coming soon)</span></li>
                        <li>International Markets <span className='coming-soon'>(coming soon)</span></li>
                        <li>Crypto Currency <span className='coming-soon'>(coming soon)</span></li>
                    </ul>
                    :null}
                    <li className='nav-li'>
                        <button>
                            <p onClick={()=>{changePage(3)}}>News</p>
                            <i onClick={()=>{dropdownClick(3)}} className={"fa-solid fa-chevron-right "+((dropdown===3)?"down":"")}></i>
                        </button>
                        <ul className='dropdown'>
                            <li onClick={()=>{changePage(3)}}>News</li>
                            <li>Education <span className='coming-soon'>(coming soon)</span></li>
                        </ul>
                    </li> 
                    {(dropdown===3)?
                    <ul className='dropdown-mobile'>
                        <li onClick={()=>{changePage(3)}}>News</li>
                        <li>Education <span className='coming-soon'>(coming soon)</span></li>
                    </ul>
                    :null}
                    </ul>
                <div id='profile'>
                    {(props.user.id===0)?
                    <>
                    <h5 onClick={()=>{changePage(5)}}>
                    login
                    </h5>
                    <button onClick={()=>{changePage(6)}}>
                    register
                    </button>
                    </>
                    :
                    <>
                    <button onClick={()=>{changePage(4)}}>
                        <i className="fa-solid fa-user"></i>
                    </button>
                    </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;