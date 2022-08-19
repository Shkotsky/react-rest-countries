import React, { useState } from "react";

import Countries from "../components/Countries";
import Loading from "../components/Loading";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";

function Home() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(8);

  const indexOfLastCountries = currentPage * countriesPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setToFirstPage = (page) => setCurrentPage(page);

  const getCountries = (countries) => {
    setCountries(countries);
  };

  const getLoadingStatus = (loading) => {
    setIsLoading(loading);
  };

  return (
    <main className="container">
      <div v-if="data" className="wrapper-home">
        <SearchForm
          searchCountries={getCountries}
          loadingStatus={getLoadingStatus}
          setToFirstPage={setToFirstPage}
        />
        {isLoading ? <Loading /> : <Countries countList={currentCountries} />}
      </div>
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={countries.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </main>
  );
}

export default Home;
