import React from 'react';
import './FAQS.scss'
function Faqs(props:any) {
    return (
        <section id="faqscrypto" className="">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 text-center">
                        <h1 className="heading">FAQS</h1>
                        <h3 className="section-title my-5">Frequently Asked Questions</h3>
                    </div>
                    <div className="col-lg-5">
                        <div id="main">
                            <div className="container">

                                <div className="accordion" id="faq">
                                    <div className="card">
                                        <div className="card-header" id="faqhead1">
                                            <a href="#" className="btn btn-header-link" data-toggle="collapse"
                                               data-target="#faq1"
                                               aria-expanded="true" aria-controls="faq1">Can I change position after it
                                                has been assigned?</a>
                                        </div>

                                        <div id="faq1" className="collapse show" aria-labelledby="faqhead1"
                                             data-parent="#faq">
                                            <div className="card-body">
                                                No, you cannot change your position after you have registered into the
                                                system. Changing positions
                                                compromises the integrity of the sponsorship.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="faqhead2">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse"
                                               data-target="#faq2"
                                               aria-expanded="true" aria-controls="faq2">How can I purchase more crypto
                                                and silver
                                                Peacecoins?</a>
                                        </div>

                                        <div id="faq2" className="collapse" aria-labelledby="faqhead2"
                                             data-parent="#faq">
                                            <div className="card-body">
                                                Our Peacecoin packages are coming soon. You will soon be able to
                                                purchase them to get higher level
                                                silver Peacecoin and crypto Peacecoin from the back-office.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="faqhead3">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse"
                                               data-target="#faq3"
                                               aria-expanded="true" aria-controls="faq3"> Why can I not see Peacecoin in
                                                MetaMask wallet?</a>
                                        </div>
                                        <div id="faq3" className="collapse" aria-labelledby="faqhead3"
                                             data-parent="#faq">
                                            <div className="card-body">
                                                Make sure you have added the token ‘Peacecoin’ in your wallet and
                                                provided the correct wallet
                                                address. Please update/edit your wallet address in the back-office if it
                                                was provided incorrect
                                                upon registration.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="faqhead4">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse"
                                               data-target="#faq4"
                                               aria-expanded="true" aria-controls="faq3">I am having an issue that is
                                                not written about, what
                                                should I do?</a>
                                        </div>
                                        <div id="faq4" className="collapse" aria-labelledby="faqhead4"
                                             data-parent="#faq">
                                            <div className="card-body">
                                                Please open a ticket from your back-office and our support team will get
                                                in touch with you
                                                shortly. If you do not have access to the back-office, send an email to
                                                support@peacecoin.com.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-header" id="faqhead5">
                                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse"
                                               data-target="#faq5"
                                               aria-expanded="true" aria-controls="faq5">What is IBO?</a>
                                        </div>
                                        <div id="faq5" className="collapse" aria-labelledby="faqhead5"
                                             data-parent="#faq">
                                            <div className="card-body">
                                                IBO, Independent Business Ownership allows you to share the company
                                                products and services with
                                                other members. Meanwhile, making you eligible for referral commission.
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <a href="{{url('/faqs')}}" className="text-center mb-4">More Questions?</a>
                    </div>

                    <div className="col-lg-7">
                        <img src="https://media.peacecoin.io/phone.png" className="img-fluid float-right faq_mobile"></img>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Faqs;