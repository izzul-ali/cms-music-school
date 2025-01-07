import { IPagination } from "@/interfaces/global.interface"

/**
 * A utility function to generate pagination data based on the current page, limit, and total rows.
 * This function calculates the total pages, current page, previous page, and next page to simplify pagination handling in tables or lists.
 *
 * @function
 * @param {number} [page=0] - The current page number (starting from 1). Defaults to 0 if not provided.
 * @param {number} [limit=10] - The number of items displayed per page. Defaults to 10 if not explicitly passed.
 * @param {number} [totalRows=0] - The total number of records available in the dataset. Defaults to 0 if not provided.
 * @returns {IPagination} - An object containing pagination information:
 * - `currentPage`: The current page number.
 * - `totalPage`: The total number of pages based on the total rows and limit.
 * - `totalRecords`: The total number of records available.
 * - `prevPage`: The previous page number (if available).
 * - `nextPage`: The next page number (if available).
 */
export function generatePaginationData(
  page: number = 0,
  limit: number = 10,
  totalRows: number = 0
): IPagination {
  return {
    currentPage: page,
    totalPage: Math.ceil(totalRows / limit),
    totalRecords: totalRows,
    prevPage: page - 1,
    nextPage: page + 1,
  }
}
