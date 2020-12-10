import { useState, useEffect } from "react";
import Axios from "axios";

const Planets = (query, pageNumber) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPlanets([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    if (!query) {
      Axios({
        method: "GET",
        url: "https://swapi.dev/api/planets/",
        params: { page: pageNumber },
        cancelToken: new Axios.CancelToken((c) => (cancel = c)),
      })
        .then((result) => {
          setPlanets((prevPlanets) => {
            return [
              ...new Set([
                ...prevPlanets,
                ...result.data.results.map((p) => p),
              ]),
            ];
          });
          // console.log(document.querySelectorAll('.planet').length)
          setHasMore(
            document.querySelectorAll(".planet").length < result.data.count
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (Axios.isCancel(error)) return;
          setError(true);
        });
      return () => cancel();
    } else {
      Axios({
        method: "GET",
        url: "https://swapi.dev/api/planets/",
        params: { search: query, page: pageNumber },
        cancelToken: new Axios.CancelToken((c) => (cancel = c)),
      })
        .then((result) => {
          setPlanets((prevPlanets) => {
            return [
              ...new Set([
                ...prevPlanets,
                ...result.data.results.map((p) => p),
              ]),
            ];
          });
          // console.log(document.querySelectorAll('.planet').length)
          setHasMore(
            document.querySelectorAll(".planet").length < result.data.count
          );
          setLoading(false);
        })
        .catch((error) => {
          if (Axios.isCancel(error)) return;
          setError(true);
          console.log(error);
        });
      return () => cancel();
    }
  }, [query, pageNumber]);
  return { loading, error, planets, hasMore };
};

export default Planets;
