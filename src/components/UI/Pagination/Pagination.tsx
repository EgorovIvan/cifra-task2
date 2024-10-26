import Icon from "@/components/Icon/Icon";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems);
  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Обновляем inputPage даже если значение временно пустое
    setInputPage(value);
  };

  const handleInputBlur = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(currentPage.toString()); // Сбрасываем к текущей странице, если значение некорректное
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className='pagination'>
      <button
        className='pagination__button__left'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon src='../../../../public/img/pagination/arrow.svg' size={9} />
      </button>
      <input
        type="text"
        className='pagination__input'
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyPress={handleKeyPress}
        min={1}
        max={totalPages}
      />
      <span className='pagination__text'>из {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon src='../../../../public/img/pagination/arrow.svg' size={9} />
      </button>
    </div>
  );
};

export default Pagination;