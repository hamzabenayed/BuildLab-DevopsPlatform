import React from "react";
import { FaCodeBranch, FaCloud, FaDocker, FaServer, FaTasks } from "react-icons/fa";
import { FaChartLine } from 'react-icons/fa';


const Services = () => {
  const services = [
    {
      icon: <FaCodeBranch className="mb-4 text-primary" size={64} />,
      title: "Continuous Integration",
      description:
        "We help you implement a continuous integration process that automatically builds, tests, and deploys your code changes.",
      link: "http://http://localhost:3001/",
    },
    {
      icon: <FaTasks className="mb-4 text-primary" size={64} />,
      title: "Continuous Delivery",
      description:
        "We help you automate your software delivery process so you can release new features to your users quickly and reliably.",
        link: "http://localhost:3001/",
    },
    {
      icon: <i className="fa fa-rocket fa-4x mb-4 text-primary"></i>,
      title: "Continuous Deployment",
      description:
        "With Continuous Deployment, changes are automatically deployed to production after passing testing",
        link: "http://localhost:3001/",
    },
    {
      icon: <FaServer className="mb-4 text-primary" size={64} />,
      title: "Server Configuration",
      description:
        "We help you configure and manage your servers using infrastructure-as-code and automation tools.",
        link: "http://localhost:3001/",
    },
    {
      icon: <FaChartLine className="mb-4 text-primary" size={64} />,
      description:
        "Monitor application performance and user behavior to identify areas for improvement and optimize resource usage.",
        link: "http://localhost:3001/",
    },
    {
      icon: <i className="fa fa-check fa-4x mb-4 text-primary"></i>,
      title: "Automated Testing",
      description:
        "Our pipeline also includes Automated Testing, ensuring that code is thoroughly tested before deployment.",
        link: "http://localhost:3001/",
    },
  ];


  return (
    <div>
      <section id="service">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Our Services</h3>
              <h1 className="display-6 text-center mb-4">
                Our <b>Awesome</b> Services
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row mt-5">
            {services.map((service, index) => (
              <div className="col-md-4" key={index}>
                <div className="card p-3 ">
                  <div className="card-body text-center">
                    {service.icon}
                    <h5 className="card-title mb-3 fs-4 fw-bold">
                      {service.title}
                    </h5>
                    <p className="card-text lead">{service.description}</p>
                    <a href={service.link} className="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
