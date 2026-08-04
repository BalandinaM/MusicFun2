import { ArrowIcon } from '@/common/components/Icons'
import { getPaginationPages } from '@/common/utils'
import s from './PaginationControls.module.css'

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesCount: number
}

export const PaginationControls = ({
  currentPage,
  setCurrentPage,
  pagesCount,
}: Props) => {
  const pages = getPaginationPages(currentPage, pagesCount)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < pagesCount) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className={s.pagination}>
      <button
        className={s.navButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        type="button"
        aria-label="Previous page"
      >
        <ArrowIcon direction="right" className={s.navArrow} />
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={
              page === currentPage
                ? `${s.pageButton} ${s.pageButtonActive}`
                : s.pageButton
            }
            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
            disabled={page === currentPage}
            type="button"
          >
            {page}
          </button>
        )
      )}

      <button
        className={s.navButton}
        onClick={handleNextPage}
        disabled={currentPage === pagesCount}
        type="button"
        aria-label="Next page"
      >
        <ArrowIcon direction="left" className={s.navArrow} />
      </button>
    </div>
  )
}
