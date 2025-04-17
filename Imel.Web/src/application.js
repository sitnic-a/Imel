import { current } from "@reduxjs/toolkit";

export const application = {
  url: "https://localhost:7252/api",
  paginationParams: {
    currentPage: 1,
    elementsPerPage: 5,
    lastPage: null,
    previousPage: current - 1,
  },
};
