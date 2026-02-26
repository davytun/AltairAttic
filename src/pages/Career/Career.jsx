import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./Career.css";

const Section = ({ title, subtitle, image, altText }) => (
  <div className="section">
    <img src={image} alt={altText} className="section-image" />
    <div className="section-text">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  </div>
);

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="e.g. Software Engineer"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button>Search</button>
  </div>
);

const JobCard = ({ title, image, altText }) => (
  <div className="job-card">
    <img src={image} alt={altText} className="job-card-image" />
    <p>{title}</p>
  </div>
);

const sections = [
  {
    title: "Grow With Us",
    subtitle:
      "We create champions, celebrate achievements, and nurture potentials.",
    image: "Hero.jpg", // replace with the actual path
    altText: "Grow With Us",
  },
  {
    title: "Fluid and Collaborative Culture",
    subtitle:
      "We embrace relentless improvement and champion disruptive innovation.",
    image: "S1.jpg", // replace with the actual path
    altText: "Fluid and Collaborative Culture",
  },
];

const jobs = [
  {
    title: "Backend Developer",
    image: "backdev.jpeg",
    altText: "Backend Developer",
  },
  {
    title: "Frontend Developer",
    image: "frontdev.jpeg",
    altText: "Frontend Developer",
  },
  {
    title: "Full Stack Developer (On-site)",
    image: "fullstack.jpeg",
    altText: "Full Stack Developer",
  },
];

const Career = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm]);

  return (
    <div className="career">
      <Helmet>
        <title>Careers - Altair Attic Limited</title>
        <meta
          name="description"
          content="Explore career opportunities at Altair Attic Limited and join our team of innovative professionals."
        />
        <meta
          name="keywords"
          content="Careers at Altair Attic Limited, job opportunities, tech jobs"
        />
        <meta property="og:title" content="Careers - Altair Attic Limited" />
        <meta
          property="og:description"
          content="Explore career opportunities at Altair Attic Limited and join our team of innovative professionals."
        />
        <meta property="og:url" content="https://www.altairattic.com/careers" />
        <meta
          property="og:image"
          content="https://www.altairattic.com/images/careers.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers - Altair Attic Limited" />
        <meta
          name="twitter:description"
          content="Explore career opportunities at Altair Attic Limited and join our team of innovative professionals."
        />
        <meta
          name="twitter:image"
          content="https://www.altairattic.com/images/careers.jpg"
        />
      </Helmet>
      <div className="career-content">
        <div className="sections">
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              subtitle={section.subtitle}
              image={section.image}
              altText={section.altText}
            />
          ))}
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="job-list">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              image={job.image}
              altText={job.altText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
