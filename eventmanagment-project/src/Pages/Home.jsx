import React from 'react';
import Banner from '../component/Banner';
import LatestEvents from '../component/LatestEvents';

import HomeFocusSection from '../component/HomeFocusSection';
import EventHighlights from '../component/EventHighlights';
import ReviewMarquee from '../component/ReviewMarquee';
import { Helmet } from 'react-helmet';
import OurMission from '../component/OurMission';


const Home = () => {
    return (
    
        <> 
          <Helmet><title>Organizo||Home</title> </Helmet>
        <div className='container mx-auto'>
        <Banner></Banner>
        <div className='mt-20 mb-10'>
         <HomeFocusSection></HomeFocusSection>
        </div>
      
        <LatestEvents></LatestEvents>
        <EventHighlights></EventHighlights>
       
            <div className='mt-20 mb-10'>
             <ReviewMarquee></ReviewMarquee>
        </div>
        <OurMission></OurMission>
    
        </div>
         </>
    );
};

export default Home;
