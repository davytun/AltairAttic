import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import wordSlid from "../../utils/wordSlid";
import "./SerW.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useParams } from "react-router-dom";

const SerW = () => {
  const { url } = useParams();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const service = wordSlid.find((service) => service.url === `/${url}`) || {
    image: "",
    name: "Service Not Found",
    detail: "The requested service could not be found.",
    define: "",
    additionalInfo: [],
  };

  const {
    image,
    name,
    detail,
    define,
    additionalInfo,
    choose,
    explain,
    success,
    Q1,
    Q2,
    Q3,
  } = service;

  const faqs = [Q1, Q2, Q3];

  const filteredServices = wordSlid.filter(
    (serviceItem) => serviceItem.url !== `/${url}`
  );

  // Dynamically set the hero image based on the current service
  const heroImage = service.image || "/home-auto2.png"; // Fallback to a default image if none is found

  return (
    <div className="service-container">
      <div
        className="breadcumb-area"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="header">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h4>{name}</h4>
                <ul className="breadcumb-list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-arrow">&lt;</li>
                  <li>{name}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="serPage">
        <div className="s-right">
          {/* <div className="s-image">
            <img src={image} alt={name} style={{ borderRadius: "30px" }} />
          </div> */}
          <div className="s-dat">
            <div className="s-name s-primaryText">
              Best Solutions for {name}
            </div>
            <div className="explain">
              <p className="explain-p">{explain?.[0]?.e_p1}</p>
              <p className="explain-p">{explain?.[0]?.e_p2}</p>
            </div>
            <div className="chs">
              <div className="choose">
                <h2 className="s-primaryChoose">Why Choose Us</h2>
                <p className="explain-p">{choose}</p>
                <div className="Success">
                  <ul>
                    <li>
                      <i className="bi bi-arrow-right custom-arrow"></i>Success
                      Stories
                    </li>
                    <li>
                      <i className="bi bi-arrow-right custom-arrow"></i>Success
                      Service
                    </li>
                    <li>
                      <i className="bi bi-arrow-right custom-arrow"></i>Success
                      Store
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="our-success choose">
                <div className="service-det-icon">
                  <img
                    src="https://solutek-html.netlify.app/assets/images/inner/det-icon.png"
                    alt="icon"
                  />
                </div>
                <h3 className="e-primaryChoose s-primaryChoose">
                  Empowering Your Success
                </h3>
                <p className="explain-p">{success}</p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="s-left">
          <div className="choose">
            <div className="main">
              <h3 className="s-primaryText">Main Services</h3>
              <div className="c-main">
                {filteredServices.map((service, index) => (
                  <Link key={index} to={service.url} className="m-choose">
                    <p className="h-choose">{service.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="s-contain choose">
            <div className="s-con">
              <div className="contact-item">
                <PhoneIcon className="contact-icon" />
                <div>
                  <p>Call Us Anytime</p>
                  <h3>+2347077195098</h3>
                </div>
              </div>
              <div className="contact-item">
                <EmailIcon className="contact-icon" />
                <h3>hello@altair-attic.com</h3>
              </div>
            </div>
          </div>

          <div className="FAQ">
            <div className="s-primaryText">
              <h5>Frequently Asked Questions</h5>
            </div>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                className={`accordion ${expanded === index ? "expanded" : ""}`}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  }
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography className="accordion-heading">
                    <span className="accordion-number">{`0${index + 1}`}</span>
                    {faq.Question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.Answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerW;
