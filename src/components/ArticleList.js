import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import image from './image/image4.png';
import './pagination.css'

const ArticleList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;                                         // total item per page
  const selectCategory = useSelector((state) => state.news)        // get data 

  //Page next and previous
  const indexOfLastArticle = (currentPage + 1) * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = selectCategory.slice(indexOfFirstArticle, indexOfLastArticle);

  // Calculate total pages
  const totalPages = Math.ceil(selectCategory.length / itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-center mb-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex list-none'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex">
              <img
                className="w-full h-48 object-cover"
                src={article.urlToImage || image}
                alt={article.author}
              />
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold mb-2">Author: {article.author}</h1>
              <h2 className="text-lg font-medium mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
      {currentArticles.length === 0 && (
        <div className="text-center text-gray-700 mt-4">No matched data</div>
      )}
    </div>
  );
};

export default ArticleList;
