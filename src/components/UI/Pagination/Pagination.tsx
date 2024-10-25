import Icon from "@/components/Icon/Icon";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
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
        type="number"
        className='pagination__input'
        value={currentPage}
        onChange={(e) => handlePageChange(Number(e.target.value))}
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