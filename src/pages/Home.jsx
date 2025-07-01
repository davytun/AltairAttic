import React from "react";
import SEO from "../components/SEO";
// import Companies from "../components/Companies/Companies";
import Details from "../components/Details/Details";
import Footer from "../components/Footer/Footer";
import GetStarted from "../components/GetStarted/GetStarted";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
// import Services from "../components/Services/Services";
import Value from "../components/Value/Value";
import MissionVision from "../components/MissionVision";
import AboutUs from "../components/About/About";
// import "../App.css";
import Subsidiary from "../components/subsidiary/subsidiary";
import ExSer from "../components/Work/Work";

function Home() {
  return (
    <div className="App">
      <SEO
        title="Home - Altair Attic Limited"
        description="Welcome to Altair Attic Limited, a leading provider of innovative tech solutions that simplify lives and enhance business operations."
        keywords="Altair Attic Limited, smart home automation, software development, IoT, IT skills"
        url="https://www.altairattic.com/"
        image="https://www.altairattic.com/home.jpg"
      />
      <Header />
      <Hero />
      <ExSer />
      <AboutUs />
      <MissionVision />
      {/* <Services /> */}
      {/* <Subsidiary/> */}
      <Value />
      <Details />
      <GetStarted />
      <Footer />
    </div>
  );
}

export default Home;
