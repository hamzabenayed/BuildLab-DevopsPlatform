import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'CI/CD for Mobile Apps',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Our documentation provides guidance on how to set up a CI/CD pipeline for your mobile apps with ease. With Build Lab, you can deploy your apps faster and with greater confidence.
      </>
    ),
  },
  {
    title: 'Streamlined Development',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        DevOps is all about streamlining development and reducing time-to-market. Our documentation provides tips and tricks to help you achieve just that. With DevOps Mobile Platform, you can focus on what really matters: building great apps.
      </>
    ),
  },
  {
    title: 'Powered by Build Lab',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        DevOps Mobile Platform is built on top of React, one of the most popular JavaScript frameworks. This makes it easy to customize and extend your mobile apps with ease. Our documentation provides tips and tricks to help you get the most out of React for your mobile apps.
      </>
    ),
  },
];


function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
