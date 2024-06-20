import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import ArticleList from './ArticleList';
import setValue from "../action/index";
import Loading from './Loading';

const Home = () => {
  const [category, setCategory] = useState('Business'); // fro category selection
  const [loading, setLoading] = useState(true); // loader show 
  const dispatch = useDispatch(); // for dispatching data to get
  const [error, setError] = useState(null); // error handling
  const [query, setQuery] = useState(""); // search query

  const categories = ['Business', 'Technology', 'Entertainment'];


  const API_KEY = "6024ebf658bb44c0b1df11e5343ed075";
  const getNewsData = async () => {
    setLoading(true);
    let API = `https://newsapi.org/v2/top-headlines?country=us&category=${category.toLowerCase()}&apiKey=${API_KEY}`;
    if (query) {
      API = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
    }
    try {                                      // error handling
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setValue(data.articles));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);                      // error handling
    }
  };

  useEffect(() => {
    getNewsData();
  }, [category]); // Re-fetch news when the category changes

  const handleSearchClick = () => {   // search related data 
    getNewsData();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center p-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-[160px] border rounded-md px-2 py-1 border-black pl-2 text-base font-semibold outline-0"
          placeholder="Search"
          id=""
        />
        <button
          onClick={handleSearchClick}
          className='bg-blue-600 border border-blue-700 ml-2 px-3 py-1 rounded-md text-white'
        >
          Search
        </button>
      </div>
      <div className='my-6'>
        <div className='flex my-4'>
          <h4 style={{ fontFamily: "sans-serif", fontWeight: "400" }}>Sort By:</h4>
          <select
            className='border border-black rounded-md'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((selectItem) => (
              <option key={selectItem} value={selectItem}>
                {selectItem}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className='flex justify-center mt-44'><Loading /></div>
        ) : error ? (
          <div className='text-red-500 text-center mt-44'>{error}</div>
        ) : (
          <ArticleList />
        )}
      </div>
    </div>
  );
};

export default Home;
