import React,{useState} from 'react';
import OrderSummary from './OrderSummary';
import ExpOrderCard from './ExpOrderCard';
import {useHistory} from 'react-router-dom';
import './OrderSummary.scss';
function Index(props) {
    const[expressCard,setExpressCard] = useState<any | null>(1);
    const history = useHistory();
    const selectPayment = (type:number)=>{
        setExpressCard(type);
    }


    // @ts-ignore
    return (
        <div className={'p-5 '}>


            <div className='cointainer'>
                <div className="row text-center justify-content-center">
                    <div className="col-sm-8">
                        <h3 >Please Select Payment Type</h3>
                    </div>
                </div>
                <div className="row justify-content-center ml-5">


                        <div className='col-sm-3 mt-5 ml-3'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1"  onChange={()=>selectPayment(1)} checked={expressCard == 1}/>
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    Others
                                </label>
                            </div>
                        </div>
                        <div className='col-sm-3 mt-5 ml-3'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="2"   onChange={()=>selectPayment(2)}/>
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    American Express Card
                                </label>
                            </div>

                        </div>
                </div>
                <div className='row justify-content-center'>
                    {
                        expressCard == 1 ?
                            <OrderSummary />:
                            <ExpOrderCard />
                    }
                </div>
            </div>
        </div>
    );
}

export default Index;