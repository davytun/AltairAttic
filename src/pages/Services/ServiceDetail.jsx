import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import data from "../../utils/slider.json";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = data[id];

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div>
      <SEO
        title={`Service Detail - ${service.name} - Altair Attic Limited`}
        description={`Details about service ${service.name} offered by Altair Attic Limited.`}
        keywords={`Service ${service.name}, Altair Attic Limited, tech solutions`}
        url={`https://www.altairattic.com/service/$}`}
        image={service.image}
      />
      <img src={service.image} alt={service.name} className="service-image" />
      <div className="service-header">
        <h1 className="service-title">{service.name}</h1>
        {service.price && <p className="service-price">₦{service.price}</p>}
      </div>
      <p className="service-description">{service.detail}</p>
      {service.additionalInfo && (
        <div className="additional-info">
          <h2>Key Features:</h2>
          <ul className="additional-info-list">
            {service.additionalInfo.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="book-visit-button button" onClick={handleContactClick}>
        Contact Us
      </button>
    </div>
  );
};

export default ServiceDetail;
