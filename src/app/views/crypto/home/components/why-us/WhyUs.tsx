import React,{useState,useEffect} from 'react';
import './WhyUs.scss'
import WhyUSData from './WhyUsData'
function WhyUs(props:any) {
    const[switcher , SwitchVideo] = useState('video_1');
    const getData = (event:any)=>{
        SwitchVideo(event.target.value)
    }
    useEffect(()=>{
        
       
    });
    return (
        <section id="peacevideos">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center">
                        <div className="peace-text-cover mt-2">
                            <h1 className="primary-text section-title">WHY US?</h1>
                            <p>Peacecoin aims to unite the masses and their intentions. It is here to bring all
                                economies and
                                ethnicities together. Peacecoin is a selfless project executed to help others. Being a
                                complete paradigm
                                shift in the cryptocurrency world, Peacecoin will bind people as one.</p>
                        </div>
                        <div className="peace-text-cover mt-5">
                            <h1 className="primary-text section-title">HOW IT WORKS</h1>
                            <p className="mb-3">Cryptocurrency runs on a peer-to-peer network where the system itself
                                approves the
                                transactions, instead
                                of having a central authority like banks to do so. All transactions are stored on a
                                public ledger. Nobody
                                can tamper with the ledger’s data as its data integrity is maintained by cryptographic
                                techniques.</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form action="#" method="post" id="hockey">
                            <h1 className="primary-text section-title text-center mb-3">We are Peacecoin</h1>
                            <div className="dropdown-form">
                                <select id='country' name="hockeyList" onChange={getData} value={switcher}>
                                    <option disabled  style={{color:'#333',fontSize:"12px"}}> Select Language</option>
                                    <option value="video_1">English</option>
                                    <option value="video_2">French</option>
                                    <option value="video_3">German</option>
                                    <option value="video_4">Italian</option>
                                    <option value="video_5">Japanese</option>
                                    <option value="video_6">Spanish</option>
                                    <option value="video_7">Chinese</option>
                                    <option value="video_8">Hebrew</option>
                                    <option value="video_9">Arabic</option>
                                    <option value="video_10">Urdu</option>
                                    <option value="video_11">Portuguese</option>
                                    <option value="video_12">Hindi</option>
                                    <option value="video_13">Punjabi</option>
                                    <option value="video_14">Indonesian</option>
                                    <option value="video_15">Russian</option>
                                </select>
                            </div>
                            <div className="dropdown-options mt-3">
                               {
                                   
                            WhyUSData.map( (data) =>
                                switcher === data.id ?
                                <div className="show-hide" id={data.id} key={data.id}>
                                    <video   
                                    loop
                                    playsInline 
                                  
                                    preload="none" 
                                    className="player"
                                            poster={data.poster}
                                            style={{width:"100%",height:'auto',borderRight:"4px solid gray",borderBottom:'4px solid gray',position:'relative'}}
                                            controls
                                            muted
                                            autoPlay
                                            
                                           >
                                        <source src={data.video_src} type="video/mp4"></source>
                                    </video>
                                </div>
                                :''
                            )
                               }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyUs;