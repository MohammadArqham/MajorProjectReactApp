import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>
        <div className={styles.header}>
          {" "}
          <h2>Login as</h2>{" "}
          
        </div>
        <div className={styles.container}>
          <Link to="/manufacturer">
            <div className={styles.card}>
              <img
                className={styles.img}
                src="https://i.pinimg.com/originals/ed/22/36/ed2236a5684ac74f5e29481773138ae0.png"
              />
              <p>Manufacturer</p>
            </div>
          </Link>
          <Link to="/distributer">
            <div className={styles.card}>
              <img
                className={styles.img}
                src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-distribution-line-icon-vector-png-image_6692893.png"
              />
              <p>Distributer</p>
            </div>
          </Link>
          <Link to="/wholesaler">
            <div className={styles.card}>
              <img
                className={styles.img}
                src="https://cdn-icons-png.flaticon.com/512/1434/1434728.png"
              />
              <p>Wholesaler</p>
            </div>
          </Link>
          <Link to="/pharmacy">
            <div className={styles.card}>
              <img
                className={styles.img}
                src="https://cdn-icons-png.flaticon.com/512/3063/3063143.png"
              />
              <p>Pharmacy</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
