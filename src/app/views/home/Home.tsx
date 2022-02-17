import React from 'react';
import './HomeStyles.scss';
import Banner from '../home/Components/Banner/Banner';
import PeaceMovement from '../home/Components/PeaceMovement/PeaceMovement';
import PeaceVision from '../home/Components/PeaceVision/PeaceVision';
import Feature from '../home/Components/Features/Feature';
import UnitedPeace from '../home/Components/UnitedPeace/UnitedPeace';
import CustomerSupport from '../home/Components/CustomerSupport/CustomerSupport';
import GetInTouch from '../home/Components/GetInTouch/GetInTouch';
import Jobs from '../home/Components/Jobs/Jobs';
import Roadmap from '../home/Components/Roadmap/Roadmap';
import SummitVideo from '../home/Components/summitVideo/SummitVideo';
import PeaceCoinAnniversary from '../home/Components/Anniversary/Anniversary'
export default function Home(props:any) {

    return (
        <>         <div id="home">
                    <Banner/>
                    <PeaceCoinAnniversary />
                    <SummitVideo/>
                    <PeaceMovement/>
                    <PeaceVision/>
                    <Feature/>
                    <Roadmap/>
                    <UnitedPeace/>
                    <Jobs/>
                   
                    <CustomerSupport/>
                    <GetInTouch/>
                    </div>
                   
        </>
    )
}
