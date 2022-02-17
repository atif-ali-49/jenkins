import React from 'react'
import { Carousel,Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../Banner/Banner.scss'


function Banner() {
    return (
        <>
            <Carousel fade className="noncrypto-banner">
  <Carousel.Item >
    <Image
      className="d-block w-100"
      src={'img/banner-1.jpg'}
      alt="First slide"
    />
    <Carousel.Caption>
    <h1>Peace Movement</h1>
      <p className="paragraph mt-20">Peacecoin aims to unite the masses and their intentions. It is here to bring all economies and ethnicities together. Peacecoin is a selfless project executed to help others. Being a complete paradigm shift in a peace movement world, Peacecoin will bind people as one.</p>
   <NavLink exact to="/register"> <button className="btn primaryButton mt-10">Get Started</button></NavLink>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <Image
      className="d-block w-100"
      src={'img/banner4.png'}
      alt="Fourth slide"
    />
    <Carousel.Caption>
    <h1>REAL SOLID SILVER GOLD & PLATINUM CUSTOM JEWELRY</h1>
    <h3>Jewelry & Technology Together</h3>
      <p className="paragraph mt-20">Peacecoin publishes and produces the limited edition 925 solid sterling PEACE silver coins, 18 carat solid gold and solid platinum coins all ranging from 1.13 oz. or 31.1 grams of solid and pressed precious metals. This custom made jewelry is designed exclusively for Peacecoin.com from the famous Jewelry District - LOS ANGELES.
</p>
    <NavLink exact to="/register"> <button className="btn primaryButton mt-10">Get Started</button></NavLink>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <Image
      className="d-block w-100"
      src={'img/banner-2.jpg'}
      alt="Second slide"
    />
    <Carousel.Caption>
    <h1>Peacecoin Academy</h1>
      <p className="paragraph mt-20">Peacecoin launches online curriculum for all of its global movement members. At Peacecoin we believe in empowering through education and incentivized skill-set building curriculums. One of the only things that can’t ever be taken away from any individual is knowledge.</p>
      <NavLink exact to="/register"> <button className="btn primaryButton mt-10">Get Started</button></NavLink>
    </Carousel.Caption>
  </Carousel.Item>


  <Carousel.Item>
    <Image
      className="d-block w-100"
      src={'img/bannernew-3.jpg'}
      alt="third slide"
    />
    <Carousel.Caption>
    <h1>SECURE RELIABLE &amp; COMMUNITY</h1>
      <p className="paragraph mt-20">At Peacecoin, financial comfort, privacy and reliability for our members is our utmost priority. As a decentralized system, powered by real love and peace; reliability and transparency; clarity and responsibility; our movement and Reach is LIMITLESS! There is enough PEACECOINS for everyone!</p>
    <NavLink exact to="/register"> <button className="btn primaryButton mt-10">Get Started</button></NavLink>
    </Carousel.Caption>
  </Carousel.Item>





</Carousel>
        </>
    )
}

export default Banner
