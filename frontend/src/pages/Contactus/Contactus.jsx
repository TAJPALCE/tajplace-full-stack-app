import React from 'react';
import Footer from '../../components/Footer/Footer';
import GlobalNav from '../../components/GlobalNav/GlobalNav';
import './Contactus.css';

const Contactus = () => {
    return (
        <>
            <GlobalNav />
            <div className="contain shadow">
                <div className="wrapper">
                    <div className="form">
                        <h4>GET IN TOUCH</h4>
                        <h2 className="form-headline">Send us a message</h2>
                        <form id="submit-form" action>
                            <p>
                                <input id="name" className="form-input" type="text" placeholder="Your Name*" />
                                <small className="name-error" />
                            </p>
                            <p>
                                <input id="email" className="form-input" type="email" placeholder="Your Email*" />
                                <small className="name-error" />
                            </p>
                            <p className="full-width">
                                <input id="company-name" className="form-input" type="text" placeholder="Subject*" required />
                                <small />
                            </p>
                            <p className="full-width">
                                <textarea minLength={20} id="message" cols={30} rows={7} placeholder="Your Message*" required defaultValue={""} />
                                <small />
                            </p>
                            <p className="full-width">
                                <input type="checkbox" id="checkbox" name="checkbox" defaultChecked /> Yes, I would like to receive communications by call / email about Company's services.
                            </p>
                            <p className="full-width">
                                <input type="submit" className="submit-btn btn btn-warning text-white fw-bold" defaultValue="Submit" />
                                <button className="reset-btn btn btn-danger text-white">Reset</button>
                            </p>
                        </form>
                    </div>
                    <div className="contacts contact-wrapper">
                        <ul>
                            <li className="text-muted">We've driven online revenues of over <span className="highlight-text-grey">$2
                                million</span> for our clients. Ready to know
                                how we can help you?</li>
                            <span className="hightlight-contact-info">
                                <li className="email-info"><i className="fa fa-envelope" aria-hidden="true" /> info@hotelBoking.com</li>
                                <li><i className="fa fa-phone text-warning" aria-hidden="true" /> <span className="highlight-text">+91 11 1111 2900</span></li>
                            </span>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contactus