import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Countries(props) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(props.countList);
  }, [props.countList]);

  if (countries) {
    return (
      <div className="grid">
        {countries.map((country) => {
          const { name, flag, capital, population, region, alpha3Code } =
            country;
          return (
            <Link to={`/country/${alpha3Code}`} key={alpha3Code}>
              <div className="card">
                <img src={flag} alt="flag" className="card__image" />
                <div className="card__text">
                  <h2>{name}</h2>
                  <p>
                    <span>Population: </span>
                    {population}
                  </p>
                  <p>
                    <span>Region: </span>
                    {region}
                  </p>
                  <p>
                    <span>Capital: </span>
                    {capital}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Countries;
