import React from "react";

import UserCard from "./UserCard";

import styles from "./About.module.css";

const About = () => {
  // Here we create all developers
  const jonathan = {
    alt: "jonathan",
    width: "10%",
    username: "Jonathan Arias Busto",
    userTitle: "React developer",
    description: "Student and frontend developer",
    mail: "uo283586",
    githubLink: "https://github.com/JonathanAriass",
    twitterLink: "https://twitter.com/_jonyy_",
    linkedinLink: "https://www.linkedin.com/in/jonathan-arias-busto-874a5b241/",
  };

  const edu = {
    alt: "edu",
    width: "10%",
    username: "Eduardo Blanco Bielsa",
    userTitle: "Linux administrator",
    description: "Student and cibersecurity lover",
    mail: "uo285176",
    githubLink: "https://github.com/gitblanc",
    twitterLink: "https://twitter.com/gitblanc",
    linkedinLink:
      "https://www.linkedin.com/in/eduardo-blanco-bielsa-408908233/",
  };

  const laura = {
    alt: "laura",
    width: "10%",
    username: "Laura Cordero Castrillo",
    userTitle: "Java developer",
    description: "Student and Java developer",
    mail: "uo275955",
    githubLink: "https://github.com/lauracc97",
    twitterLink: "https://offline-dino-game.firebaseapp.com/",
    linkedinLink: "https://offline-dino-game.firebaseapp.com/",
  };

  const fer = {
    alt: "fer",
    width: "10%",
    username: "Fernando José González Sierra",
    userTitle: "Backend developer",
    description: "Student and backend enthusiast",
    mail: "uo277938",
    githubLink: "https://github.com/UO277938",
    twitterLink: "https://twitter.com/FerJ0ta",
    linkedinLink: "https://www.linkedin.com/in/fer-glez-869844236/",
  };

  return (
    <div className={styles.info_container}>
      <h1 className={styles.h1}>LoMap team ⭐️</h1>

      <div className="row">
        <UserCard user={jonathan}></UserCard>
        <UserCard user={edu}></UserCard>
        <UserCard user={fer}></UserCard>
        <UserCard user={laura}></UserCard>
      </div>
    </div>
  );
};

export default About;