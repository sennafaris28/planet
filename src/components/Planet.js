import React from "react";

import styles from "../css/Planet.module.css";

export default function Planet(props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h1 className={styles.cardTitle}>{props.name}</h1>
        <p>Diameter: {props.diameter} km</p>
        <p>
          Rotation Period: {props.rotation} Orbital Period: {props.orbital}
        </p>
        <p>Gravity Level: {props.gravity}</p>
        <h3>Total Population: {props.population}</h3>
        <h4>Climate: {props.climate}</h4>
      </div>
    </div>
  );
}
