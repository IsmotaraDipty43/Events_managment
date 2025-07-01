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
                <OurMission></OurMission>
       
       
            <div className='mt-20 mb-10'>
             <ReviewMarquee></ReviewMarquee>
         
        </div>
  <div className='mb-20 mt-20'>
        <EventHighlights></EventHighlights>
  </div>
    
        </div>
         </>
    );
};

export default Home;
