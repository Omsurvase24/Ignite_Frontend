import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/pages/About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <Helmet>
        <title>Mpulse Ignite 2023 | About</title>
      </Helmet>

      {/* <img src="/ignite-logo.png" alt="ignite-logo" /> */}

      <h1>About Us</h1>

      <div className={styles.row}>
        <img src="/about/bg-mcoe.jpg" alt="college-image" />
        <div data-aos="fade-left">
          <h4>About IT department</h4>
          <p>
            The Information Technology department of P.E.S's Modern College of
            Engineering, Pune started in 2006 with an intake capacity of 60
            students. This later increased to 120 from the year 2011-2012. The
            Department has made rapid strides as department of excellence for
            providing modern technical education intensive and meaningful
            teaching methods as well as regular inputs from practicing
            corporate. To built-up individual initiative, creativity, talent,
            leadership and the capability to adopt new Technology the
            Department encourage the student and staff member to participate
            and organized the on regular basis seminar, work-shop and many
            other short-term courses. Our endeavor is to inculcate a desire for
            continuous improvement, a sense of healthy competition and
            sensitivity towards ethical and moral values. The IT department is
            dedicated to uphold the following objectives: To develop conceptual
            and analytical skills in all functional areas of Information
            Technology, provide platform of high academic excellence to all
            students, encourage understanding of the strategic perceptions of
            the fast changing global scenario, develop the ability to
            understand and apply a multi-dimensional approach to achieve the
            overall mission of the organization and impart ethical and moral
            values for social well-being.
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <div data-aos="fade-right">
          <h4>ABOUT MPULSE IGNITE</h4>
          <p>
            Ignite is a Tech Fest held by IT Department of Modern college.
            Every year we organize events like Mock Placements, Clash of
            coders, Weber, and likewise with the only aim to enhance and
            nurture the technical skills which will provide them the platform
            to empowering students to develop and achieve their personal and
            career potentials. The initiation of Ignite signified the beginning
            of formation of new ideas Ignite recieves 300+ participants every
            year with students participating from most of the colleges in pune.
            thus we make sure that every student gets an opportunity to
            showcase their talent and technical skills. Every year M-Pulse
            Ignite is sponsored by top companies and institutions the new
            edition of Ignite, the Ignite 2k19 will provide many new
            opportunities and ignite the young minds to innovate we invite you
            to join us and share the experience!
          </p>
        </div>
        <img src="/ignite-logo.png" alt="ignite-logo" data-aos="fade-left" />
      </div>
    </div>
  );
};

export default About;
