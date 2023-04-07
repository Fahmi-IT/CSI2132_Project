import React from "react";
import "./about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faGlobe,
  faRocket,
  faScroll,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <>
      <h3 className="infoTitle">A little about us</h3>
      <div className="about-us">
        <div className="row">
          <Team />
          <Mission />
          <Partners />
        </div>
        <div className="row">
          <History />
        </div>
        <div className="row">
          <Group1 />
        </div>
      </div>
    </>
  );
}

function Team() {
  return (
    <div className="column">
      <div className="card">
        <div className="icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h3>Our Hotel Team</h3>
        <p>
          Our team consists of experienced professionals who are passionate
          about the travel industry. We have a deep understanding of the needs
          and expectations of our customers, and we work tirelessly to ensure
          that our platform meets and exceeds those needs.
        </p>
      </div>
    </div>
  );
}

function Mission() {
  return (
    <div className="column">
      <div className="card">
        <div className="icon">
          <FontAwesomeIcon icon={faRocket} />
        </div>
        <h3>Our Mission</h3>
        <p>
          Our mission is to make hotel booking easy, accessible and affordable
          for everyone. We strive to offer a user-friendly platform that allows
          our customers to quickly and easily find the best hotels at the best
          prices, while upholding the highest standards of integrity in
          everything we do.
        </p>
      </div>
    </div>
  );
}

function Partners() {
  return (
    <div className="column">
      <div className="card">
        <div className="icon">
          <FontAwesomeIcon icon={faGlobe} />
        </div>
        <h3>Our Partners</h3>
        <p>
          We have partnered with some of the world's leading hotel chains to
          offer you a variety of accommodations. We also work with local hotels
          to provide you with a more authentic travel experience. Whether you're
          looking for a luxurious or simple and cozy stay, our partners got you
          covered.
        </p>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="card card3">
      <div className="icon">
        <FontAwesomeIcon icon={faScroll} />
      </div>
      <h3>Aruma's History</h3>
      <p>
        Aruma is a hotel booking system that was founded in 2005 with the aim of
        simplifying the process of making hotel reservations for customers. The
        company's founders recognized the need for a more streamlined process
        for booking hotel reservations, and they set out to create a platform
        that would meet this demand. It was launched at a time when the internet
        was becoming increasingly popular and more people were looking to book
        their travel arrangements online. Aruma quickly gained popularity among
        travelers as it offered a user-friendly interface, an extensive database
        of hotels, and competitive prices.
      </p>
      <br></br>
      {/* <p>
        One of the key factors in Aruma's success has been its commitment to
        using the latest technology. From the beginning, the company has
        invested in state-of-the-art systems and software to ensure that its
        platform is always up-to-date and easy to use. This has allowed Aruma to
        stay ahead of the curve in a fast-paced industry, and to offer customers
        a booking experience that is both efficient and user-friendly.
      </p>
      <br></br> */}
      {/* <p>
        Another important factor in Aruma's success has been its focus on
        customer service. The company has always placed a high priority on
        ensuring that its customers have access to the support and assistance
        they need, whether they are booking a hotel room or dealing with any
        issues that arise during their stay. This dedication to customer
        satisfaction has helped to build a loyal following for Aruma, and has
        contributed to the company's long-term success.
      </p>
      <br></br> */}
      <p>
        Today, Aruma continues to be a leader in the hotel booking industry,
        with a wide range of hotels and accommodation options available to
        customers around the world. The company's commitment to innovation,
        technology, and customer service ensures that it will remain a trusted
        and reliable partner for travelers for many years to come.
      </p>
    </div>
  );
}

function Group1() {
  return (
    <div className="card card3 extra">
      <div className="icon">
        <FontAwesomeIcon icon={faComputer} />
      </div>
      <h3>Aruma's Developpers: Group #1 of CSI 2132</h3>
      <p>
        We are a group of enthusiastic developers-students who are passionate
        about building innovative solutions that simplify and enhance people's
        lives. Our team consists of individuals with diverse backgrounds, skill
        sets, and experiences, united by our common goal of creating a
        world-class hotel management database site for our course in databases,
        CSI 2132.
      </p>
      <br></br>
      <p>
        We believe in the power of collaboration and teamwork, and we bring our
        best ideas, expertise, and creativity to the table to develop software
        that exceeds our customers' expectations. We are constantly learning,
        growing, and adapting to new technologies and trends, and we take pride
        in delivering solutions that are efficient, user-friendly, and reliable.
        Above all, we are committed to providing exceptional customer service
        and support, and we look forward to helping our partners achieve their
        hotel business objectives and helping our cusomters enjoy their holiday
        travels.
      </p>
      <br></br>
    </div>
  );
}

export default About;
