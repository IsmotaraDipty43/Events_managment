import React from 'react';
import Navber from './component/Navber';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';

const Mainlayout = () => {
    return (
        <div className=''>
         <Navber></Navber>
         <div>
         <Outlet></Outlet>
         </div>
             <Footer></Footer>
    </div>
    );
};

export default Mainlayout;