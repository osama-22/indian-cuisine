import { Button, makeStyles, mergeClasses } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
  },
  prevBtn: {
    marginRight: "8px"
  },
  nextBtn: {
    marginLeft: "8px"
  },
  button: {
    marginRight: '4px',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    border: '1px solid #0078d4', 
    backgroundColor: 'white',    
    color: 'black',              
  },
  activeButton: {
    backgroundColor: '#0078d4',   
    color: 'white',              
  },
  disabledButton: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const styles = useStyles();  
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={styles.paginationContainer}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={mergeClasses(styles.prevBtn, currentPage === 1 ? styles.disabledButton : '')}
      >
        Previous
      </Button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className={mergeClasses(styles.button, currentPage === pageNumber ? styles.activeButton : '')}
        >
          {pageNumber}
        </button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={mergeClasses(styles.nextBtn, currentPage === totalPages ? styles.disabledButton : '')}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
