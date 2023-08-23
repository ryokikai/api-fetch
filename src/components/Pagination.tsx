interface PaginationProps {
  currPage: number;
  minPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleClickPage: (page: number) => void;
  maybeLastPage: null | number;
}

export const Pagination = ({
  currPage,
  minPage,
  handlePrevPage,
  handleNextPage,
  handleClickPage,
  maybeLastPage,
}: PaginationProps) => {
  return (
    <div className="pagination-container">
      <button disabled={minPage === 1} onClick={handlePrevPage}>
        <img src="./arrow.svg" className="arrow" alt="prev" />
      </button>
      <div className="pages-container">
        {Array.from(new Array(5)).map((_, i) => {
          const page = minPage + i;
          return (
            <button
              className={`${page === currPage ? "curr-page" : ""}`}
              key={`pagination-${i}`}
              onClick={() => handleClickPage(page)}
              disabled={
                typeof maybeLastPage === "number" && maybeLastPage <= page
              }
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNextPage}
        disabled={
          typeof maybeLastPage === "number" && minPage + 5 >= maybeLastPage
        }
      >
        <img src="./arrow.svg" className="arrow rotate-180" alt="prev" />
      </button>
    </div>
  );
};
