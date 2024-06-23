import React from 'react';

import './pagination.scss';
// import { Link } from 'react-router-dom';

interface PageInfo {
  startPage: number;
  endPage: number;
}

const maxVisiblePageLinks: number = 7;
const sidePageLinks: number = 3;
const firstPage: number = 1;

function getPagesInfo(currentPage: number, totalPages: number): PageInfo {
  const calculatedStartPage: number = Math.max(currentPage - sidePageLinks, 1);
  const endPage: number = Math.min(calculatedStartPage + maxVisiblePageLinks - 1, totalPages);
  const startPage: number = Math.max(calculatedStartPage, endPage - maxVisiblePageLinks + 1);

  return { endPage, startPage };
}

interface PaginationProps {
  totalPages: number;
  pageNum: number;
  currentPathName: string;
  withGeneratedPages?: boolean;
}

// @Todo: better enhance existing Angular pagination component to support inner items generation and convert it to a react component
export function Pagination({ pageNum, totalPages, currentPathName, withGeneratedPages }: PaginationProps): React.ReactNode | null {
  if (totalPages <= 1) {
    return null;
  }

  const isPreviousButtonDisabled: boolean = pageNum === firstPage;
  const isNextButtonDisabled: boolean = pageNum >= totalPages;
  const hasLeftSuspension: boolean = pageNum > sidePageLinks + 1;
  const hasRightSuspension: boolean = totalPages > pageNum + sidePageLinks;
  const pageInfo: PageInfo = getPagesInfo(pageNum, totalPages);

  // @Todo: replace a href with Link to
  const getArrow = (href: string, isDisabled: boolean, arrowStyleName: 'previous' | 'next'): React.ReactNode =>
    !isDisabled ? (
      // <Link to={href} className={`paginationArrow ${arrowStyleName} ${isDisabled ? 'disabled' : ''}`}>
      //   <span className={arrowStyleName}></span>
      // </Link>
      <a href={href} className={`paginationArrow ${arrowStyleName} ${isDisabled ? 'disabled' : ''}`}>
        <span className={arrowStyleName}></span>
      </a>
    ) : (
      <span className={`paginationArrow ${arrowStyleName} disabled`}></span>
    );

  return (
    <div className="pagination">
      {getArrow(`${currentPathName}/ ${String(pageNum - 1)}`, isPreviousButtonDisabled, 'previous')}

      {withGeneratedPages ? (
        <>
          {hasLeftSuspension && <span>...</span>}
          <div className="displayedPageLinks">
            {Array(pageInfo.endPage - pageInfo.startPage + 1)
              .fill(0)
              .map((_value, index): React.ReactNode => {
                const pageNumber = pageInfo.startPage + index;
                return (
                  // <Link key={pageNumber} to={`${currentPathName}/${String(pageNumber)}`} className={`pageLinkItem ${pageNumber === pageNum ? 'selected' : ''}`}>
                  //   {pageNumber}
                  // </Link>
                  <a key={pageNumber} href={`${currentPathName}/${String(pageNumber)}`} className={`pageLinkItem ${pageNumber === pageNum ? 'selected' : ''}`}>
                    {pageNumber}
                  </a>
                );
              })}
          </div>
          {hasRightSuspension && <span>...</span>}
        </>
      ) : (
        <span className="text">
          {pageNum}/{totalPages}
        </span>
      )}

      {getArrow(`${currentPathName}/${String(pageNum + 1)}`, isNextButtonDisabled, 'next')}
    </div>
  );
}
