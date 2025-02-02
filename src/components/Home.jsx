import React from 'react';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <h1 className="display-4 fw-bolder mb-4 text-center text-white">{t('Welcom to  Build-Lab')}</h1>
                            <p className="lead text-center fs-4 mb-5 text-white">{t('BuildLab is a mobile DevOps platform that streamlines app development for teams. It supports iOS and Android and automates build processes for popular programming languages. BuildLab also provides tools for code signing, app distribution, crash reporting, and analytics to help teams monitor app performance and make data-driven decisions. With an easy-to-use interface and flexible architecture, BuildLab is suitable for teams of all sizes, delivering high-quality mobile experiences quickly and efficiently.')} </p>
                            <div className="buttons d-flex justify-content-center">
                                <NavLink to="/contact" className="btn btn-light me-4 rounded-pill px-4 py-2">{t('Contact Us')}</NavLink>
                                <NavLink to="/service" className="btn btn-outline-light rounded-pill px-4 py-2">{t('Our Services')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About/>
            <Services/>
            <Contact/>

        </div>
    );
}

export default Home;
