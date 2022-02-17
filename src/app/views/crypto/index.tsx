import React, {useEffect} from 'react';
import Banner from '../crypto/home/components/banner/Banner';
import Blitz from '../crypto/home/components/blitz/Blitz';
import CryPtoPeaceMove from './home/components/crypto-peace-move/CryPtoPeaceMove';
import Invex from '../crypto/home/components/invex/Invex';
import WhyUs  from "./home/components/why-us/WhyUs";
import BlockChain from "./home/components/blockchain/BlockChain";
import LiveSupport from "./home/components/live-support/LiveSupport";
import Pkg from "./home/components/pkg/Pkg";
import Team from "./home/components/team/Team";
import Faqs from "./home/components/faqs/FAQS";
import Contact from "./home/components/contact/Contact";
import PeaceCoinAnniversary from './home/components/Anniversary/Anniversary';
import "./index.scss";

function Index(props:any) {

    return (
        <div id="crypto">
            <Banner />
            <PeaceCoinAnniversary />
            <Blitz />
            <CryPtoPeaceMove />
            <Invex />
            <WhyUs />
            <BlockChain />
            <LiveSupport />
            <Pkg />
            <Team/>
            <Faqs/>
            <Contact/>
        </div>
    );
}

export default Index;