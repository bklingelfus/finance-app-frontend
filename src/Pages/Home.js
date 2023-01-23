import { useState, useEffect } from 'react'
import axios from 'axios';

const Home =(props)=> {
    // Variables

    // States

    // On Load

    // Page Functions

    // Connection Functions 

    // HTML Functions

    // Render
    return (
    <section id='home'>
        <div className='home-1'>
            <div>
                <h1 onClick={()=>{props.setPage(6)}}>Invest in yourself</h1>
            </div>
        </div>
        <div className='home-2'>
            <div>
                <h2>Orci varius natoque</h2>
                <p>Maecenas nulla orci, facilisis at odio nec, pretium tincidunt eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut id orci pretium, maximus felis ullamcorper, posuere lectus. Donec condimentum vehicula luctus. Proin eu lorem nec.</p>
            </div>
            <div>
                <h2>Lorem ipsum.</h2>
                <p>PMorbi congue velit finibus, placerat metus non, euismod neque. Pellentesque sit amet egestas ante. In commodo ante nec enim sodales placerat. Cras placerat justo dui, vitae aliquam justo tristique porttitor. Duis sit amet malesuada purus. Nunc sit amet malesuada lacus. Cras pellentesque sit amet lorem quis elementum. Maecenas a leo vel tortor malesuada tristique. Quisque imperdiet suscipit dui vel rutrum. Etiam nec viverra dolor, vel tempus dui. Proin rutrum tincidunt.</p>
            </div>
            <div>
                <h2>Integer sit amet</h2>
                <p>Duis vitae orci enim. Pellentesque sit amet odio lacinia, sodales nisi quis, rutrum nisl. Sed gravida orci at leo cursus pharetra. Nulla accumsan nisi feugiat accumsan tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec viverra justo ex, nec congue leo dictum sed. Morbi bibendum volutpat ornare. Aliquam molestie in.</p>
            </div>
        </div>
        <div className='home-3'>
            <h1 onClick={()=>{props.setPage(2)}}>Grow Your Future</h1>
        </div>        
        <div className='home-4'>
            <h1>
                Products & Services
            </h1>
            <div className='home-container'>
                <div>
                    <div>
                        <img className='home-img1' src='https://weinvest.com.br/wp-content/uploads/2020/11/original-bb83d7eb6cfc60a5ef76d71a4ebf1c94-scaled.jpeg' alt='img1'></img> 
                        <p>Fusce fermentum at urna at tempor. Nullam quis aliquet nulla, vitae suscipit felis. In cursus arcu nisi, a.</p>
                    </div>
                    <div>
                        <p>Fusce fermentum at urna at tempor. Nullam quis aliquet nulla, vitae suscipit felis. In cursus arcu nisi, a.</p>
                        <img className='home-img1' src='https://www.nerdwallet.com/assets/blog/wp-content/uploads/2019/04/inv_investment-app-2400x1440.jpg' alt='img1'></img> 
                    </div>
                </div>
                <div>
                    <div>
                        <p>Fusce fermentum at urna at tempor. Nullam quis aliquet nulla, vitae suscipit felis. In cursus arcu nisi, a.</p>
                        <img className='home-img1' src='https://www.greece-is.com/wp-content/uploads/2017/07/shutterstock_152641631_Sailing.jpg' alt='img1'></img> 
                    </div>
                    <div>
                        <img className='home-img1' src='https://techcrunch.com/wp-content/uploads/2017/10/zero.png?w=430&h=230&crop=1' alt='img1'></img> 
                        <p>Fusce fermentum at urna at tempor. Nullam quis aliquet nulla, vitae suscipit felis. In cursus arcu nisi, a.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='home-5'>
            <h2>Phasellus fringilla, odio.</h2>
            <p>Pellentesque dignissim fermentum eros consectetur pretium. Nunc congue magna ut dui aliquam faucibus. Praesent tempor eget elit id scelerisque. Pellentesque vitae consequat dui. Duis maximus pulvinar mollis. Vivamus non lorem sapien. Etiam tristique enim vel enim euismod, ac ornare tellus dignissim. Pellentesque lacinia porta pretium. Quisque sit amet libero tellus. In orci massa, varius nec ipsum ac, posuere convallis risus. Sed sem mi, dapibus vel porta at, fringilla in diam. Nullam maximus, libero in commodo vulputate, libero risus efficitur urna, id hendrerit turpis justo ut elit. Cras ullamcorper suscipit mattis. Suspendisse porta id neque at scelerisque. Maecenas eu eros quis lacus rutrum mattis.</p>
            <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum turpis odio, fermentum in faucibus non, sodales pretium urna. Pellentesque vel efficitur odio. Mauris sagittis iaculis sem, vitae suscipit purus suscipit sagittis. Phasellus vel orci urna. Aenean maximus orci eget dui euismod fermentum. Morbi malesuada est odio, non tincidunt nisl suscipit sit amet. Fusce a ex eget lectus gravida tristique. Proin et laoreet lectus. Vestibulum suscipit porta nisl, quis bibendum risus imperdiet molestie. Sed semper porttitor ipsum ut lacinia. Sed ac tellus maximus, vestibulum enim at, varius tortor. Nulla et mauris ornare, fringilla tortor a, luctus velit.</p>
        </div>
    </section>
    );
}

export default Home;