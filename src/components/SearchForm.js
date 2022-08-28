import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function SearchForm({ searchCountries, loadingStatus, setToFirstPage }) {
  const searchValue = useRef("");
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selects, setSelects] = useState("All");

  const searchCountry = () => {
    setToFirstPage(1);
    setSearch(searchValue.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (selects !== "All") {
      const newCountries = countries.filter(
        (country) => country.region === selects
      );
      searchCountries(newCountries);
    } else {
      searchCountries(countries);
    }
    loadingStatus(loading);
  }, [countries, selects, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getCountries();
      searchCountries(countries);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const getCountries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://restcountries.com/v2/${
          search === "" ? "all" : `name/${search}`
        }`
      );
      console.log(res.data);
      setCountries(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a country..."
        ref={searchValue}
        onChange={searchCountry}
      />
      <select
        aria-label="Filter by Region"
        onChange={(e) => setSelects(e.target.value)}
        value={selects}
      >
        <option disabled value="">
          Filter by Region
        </option>
        <option>All</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </form>
  );
}

export default SearchForm;
