import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Loading from "../components/Loading";

function SingleCountry() {
  const { alpha3Code } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [neigbours, setNeigbours] = useState([]);
  const navigate = useNavigate();

  const getCountryDetails = async (code) => {
    try {
      const res = await axios.get(`https://restcountries.com/v2/alpha/${code}`);
      setData(res.data);
      if (res.data.borders) {
        const borders = await axios.all(
          await res.data.borders.map((border) =>
            axios.get(`https://restcountries.com/v2/alpha/${border}`)
          )
        );
        const borderNames = borders.map((border) => border.data);
        if (borders) {
          setNeigbours([...borderNames]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getBorders = async (alpha3Code) => {
    getCountryDetails(alpha3Code);
    navigate(`/country/${alpha3Code}`);
  };

  useEffect(() => {
    setIsLoading(true);
    getCountryDetails(alpha3Code);
  }, [alpha3Code]);

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    return (
      <div className="container">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <div className="btn back-btn--size">
            <span>&#x2190; Back </span>
          </div>
        </div>
        <div className="wrapper-details">
          <div className="country">
            <div className="country__image">
              <img src={data.flag} alt="flag" />
            </div>
            <div className="country__text">
              <h2>{data.name}</h2>
              <div className="country__text__details">
                <div>
                  <p>
                    <span className="font-weight-bold">Native Name: </span>
                    {data.nativeName}
                  </p>
                  <p>
                    <span className="font-weight-bold">Population: </span>
                    {data.population.toLocaleString("en-US")}
                  </p>
                  <p>
                    <span className="font-weight-bold">Region: </span>
                    {data.region}
                  </p>
                  <p>
                    <span className="font-weight-bold">Capital: </span>
                    {data.capital}
                  </p>
                </div>
                <div>
                  <p>
                    {data.currencies && (
                      <>
                        <span className="font-weight-bold">Currency: </span>
                        {data.currencies.map((currency, index) => {
                          return (
                            <span key={currency.name}>
                              {index === 0 &&
                              (data.currencies.length > 0 ||
                                index + 1 < data.currencies.length)
                                ? ""
                                : ", "}
                              {currency.name}
                            </span>
                          );
                        })}
                      </>
                    )}
                  </p>
                  <p>
                    <span className="font-weight-bold">Languages: </span>
                    {data.languages.map((language, index) => {
                      return (
                        <span key={language.name}>
                          {index === 0 &&
                          (data.languages.length > 0 ||
                            index + 1 < data.languages.length)
                            ? ""
                            : ", "}
                          {language.name}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
              <div className="borders" v-if="borderCountry">
                <span className="borders__title">Border Countries: </span>

                {neigbours.map((border) => {
                  return (
                    <span
                      onClick={() => getBorders(border.alpha3Code)}
                      className="btn border-btn light"
                      key={border.alpha3Code}
                    >
                      {border.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleCountry;
