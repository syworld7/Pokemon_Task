import React from "react";

export default function PokemonTable({
  pokemon,
  currentPage,
  setCurrentPage,
  totalPages,
  totalCount,
  onSelect,
  loading,
  dataPerPage,
}) {
  const handleRowKeyDown = (e, url) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(url);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Pokémon Table</h1>

        {loading ? (
          <div className="py-20 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="text-left pb-4 pl-1">Sr. No.</th>
                  <th className="text-left pb-4">Poke Name</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {pokemon.map((poke, idx) => {
                  const sr = (currentPage - 1) * dataPerPage + idx + 1;
                  return (
                    <tr
                      key={poke.name}
                      onClick={() => onSelect(poke.url, poke.name)}
                      onKeyDown={(e) => handleRowKeyDown(e, poke.url)}
                      role="button"
                      tabIndex={0}
                      className="transition-colors focus:outline-none hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-6 pr-4 pl-1 text-lg font-semibold text-gray-700 w-24">
                        {sr}
                      </td>

                      <td className="py-6">
                        <span className="text-lg font-medium capitalize text-blue-600">
                          {poke.name}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {Array.from({ length: Math.max(0, dataPerPage - pokemon.length) }).map(
                  (_, i) => (
                    <tr key={`empty-${i}`}>
                      <td className="py-6 pr-4 pl-1 text-lg">&nbsp;</td>
                      <td className="py-6">&nbsp;</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="font-semibold text-base text-gray-700">
                Total: <span className="font-bold">{totalPages}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md bg-white text-gray-700 disabled:opacity-40"
                >
                  Prev.
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Page</span>

                  <select
                    className="px-3 py-1 border rounded-md bg-white"
                    value={totalPages > 0 ? currentPage : ""}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!Number.isNaN(v)) setCurrentPage(v);
                    }}
                  >
                    {totalPages > 0 ? (
                      Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))
                    ) : (
                      <option value="">—</option>
                    )}
                  </select>
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages || p, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1 border rounded-md bg-white text-gray-700 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
