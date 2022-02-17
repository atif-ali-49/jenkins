import './ThankYou.scss'
import { MBox, MPaper } from 'src/app/components/mui';

function ThankYou() {
	return (
		<MBox className="contentBox" component={MPaper}>
		<section id="thankyou" className="section">           
				<div className="thankyou-Container">
                   <div className="text-center">
					   <div>
						    <img src="/img/thankyou.png"  />
							{/* <FaCheckCircle className="f-50 text-success"/>	 */}
							<h1 className="text-uppercase my-30">Thank You !</h1>
							<p className="paragraph">Your order has been placed.</p>			   
					   </div>
				   </div>
				</div>
		</section>
		</MBox>
	)
}
export default ThankYou
