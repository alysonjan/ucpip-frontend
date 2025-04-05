import React from "react";

interface PaginationControlsProps {
  table: any; // Update the type to allow any table instance
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ table }) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className={`px-4 py-2 rounded text-white ${
          !table.getCanPreviousPage() ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"
        }`}
      >
        Previous
      </button>

      <span>
        Page {pageIndex + 1} of {pageCount}
      </span>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className={`px-4 py-2 rounded text-white ${
          !table.getCanNextPage() ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
