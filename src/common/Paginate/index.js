import React from "react";

const Paginate = ({
  onClick,
  pageCount,
  currentPage,
  previousBtn,
  nextBtn,
  setCurrentPage,
  classNamePaginationBtnArea,
}) => {
  console.log({ currentPage });
  return (
    <div className='d-flex'>
      <div
        className='previous'
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        {previousBtn}
      </div>

      <div className={classNamePaginationBtnArea}>
        {Array(pageCount)
          .fill(" ")
          ?.map((item, index) => {
            return (
              <span
                key={index}
                onClick={onClick}
                className={
                  index + 1 === Number(currentPage)
                    ? " selectedBtn "
                    : "normalBtn"
                }
              >
                {index + 1}
              </span>
            );
          })}
      </div>

      <div
        className='next'
        onClick={() => {
          if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        {nextBtn}
      </div>
    </div>
  );
};

export default Paginate;
