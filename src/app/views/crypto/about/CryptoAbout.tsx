import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function CryptoAbout(props:any) {
    const history = useHistory();
    let rName;
    let host = 'armenlll.peacecoin.com';
    let username = host.split('.');

    useEffect(()=>{
        try{
            rName = sessionStorage.getItem('rName');
        }
        catch(error){
            console.log('error getting session');
        }
        if(username[0] === rName){
            
        }else{
            history.push('/crypto/home');
        }
    },[]);


    return (
        <section id="about" className="about"  style={{marginTop:"100px"}}>
            <div className="container">
                <div className="section-title" data-aos="zoom-out">
                    <h1>About Us</h1>
                </div>
                <div className="row content mt-4 align-items-center" data-aos="fade-up">
                    <div className="col-lg-6 pt-4 pt-lg-0">
                        <img src="https://media.peacecoin.io/cryptocurrency.jpg" alt="..." className="img-fluid"></img>
                    </div>
                    <div className="col-lg-6">
                        <p className="text-justify">
                            PeaceCoin is a cryptocurrency that aims to bring the world to one economy and currency,
                            where nobody will have ultimate authority. Backed by Blockchain Technology, PeaceCoin
                            ensures
                            complete transparency for all. A secure and self-governed Network of peace lovers.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default CryptoAbout;