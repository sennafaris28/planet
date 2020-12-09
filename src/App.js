import Planets from "./components/Planets";
import Planet from "./components/Planet";
import { useState, useRef, useCallback } from "react";

import styles from "./css/App.module.css";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { planets, hasMore, loading, error } = Planets(query, pageNumber);

  const observer = useRef();
  const lastPlanetElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log('visible')
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  // Planets(pageNumber)

  const planetElementRef = useRef();

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setPageNumber(1);
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>Star Wars Planet Viewer</div>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          onChange={handleSearch}
          required
        ></input>
        <label className={styles.searchLabel}>
          <span className={styles.searchLabelContent}>
            Search for planet ...
          </span>
        </label>
      </div>

      <div ref={planetElementRef}>
        {planets.map((planet, index) => {
          if (planets.length === index + 1) {
            return (
              <div className="planet" ref={lastPlanetElementRef} key={index}>
                <Planet
                  name={planet.name}
                  rotation={planet.rotation_period}
                  orbital={planet.orbital_period}
                  diameter={planet.diameter}
                  climate={planet.climate}
                  gravity={planet.gravity}
                  population={planet.population}
                />
              </div>
            );
          } else {
            return (
              <div className="planet" key={index}>
                <Planet
                  name={planet.name}
                  rotation={planet.rotation_period}
                  orbital={planet.orbital_period}
                  diameter={planet.diameter}
                  climate={planet.climate}
                  gravity={planet.gravity}
                  population={planet.population}
                />
              </div>
            );
          }
        })}
      </div>
      <div>
        {loading && (
          <div className={styles.loading}>
            <img src="https://res.cloudinary.com/pizdectv/image/upload/v1607541872/Rolling-1s-200px_oqllgx.svg"></img>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div className={styles.error}>
            <img src="https://res.cloudinary.com/pizdectv/image/upload/v1607542095/red-x_sl6rmj.svg"></img>
            <h1>Sorry ! An error has occured.</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
