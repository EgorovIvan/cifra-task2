import './pagination.scss';
import { usePaginationStore } from '../../../stores/paginationStore';
import { useState } from 'react';

interface PaginationProps {
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const { currentPage, itemsPerPage, setPage } = usePaginationStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [inputPage, setInputPage] = useState(currentPage);

  if (currentPage > totalPages && totalPages > 0) {
    setPage(totalPages);
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPage(page);
      setInputPage(page);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    if (inputPage > 0 && inputPage <= totalPages) {
      setPage(inputPage);
    } else {
      setInputPage(currentPage);
    }
  };

  return (
    <div className='pagination'>
      <button
        className='pagination__button__left'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      > 
        ➪
      </button>
      <input
        type="number"
        className='pagination__input'
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min={1}
        max={totalPages}
      />
      <span className='pagination__text'>из {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ➪
      </button>
    </div>
  );
};

export default Pagination;