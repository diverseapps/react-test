import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api/rickMortyApi";
import CharacterTable from "../components/CharacterTable";

const CharacterList = () => {
  const [page, setPage] = useState(
    Number(localStorage.getItem("page")) || 1
  );

  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    localStorage.setItem("page", newPage.toString());
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="relative">
      {isFetching && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <span className="text-gray-600 font-semibold">Loading...</span>
        </div>
      )}

      <div className="flex justify-between mb-4">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>

        <button
          disabled={!data.info.next}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <CharacterTable characters={data.results} />

      <p className="text-center mt-4">
        Page {page} of {data.info.pages}
      </p>
    </div>
  );
};

export default CharacterList;
