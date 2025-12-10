
import React from "react";

export default function DetailsPanel({ selectedPokemon, activeType, setActiveType, loading }) {
  const types = Array.isArray(selectedPokemon?.types) ? selectedPokemon.types : [];

  const handleTypeClick = (name) => {
    if (!name) return;
    setActiveType(name);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[420px] flex flex-col">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
        Pokémon Types{selectedPokemon ? ` (${selectedPokemon.name})` : ""}
      </h2>

      {loading ? (
        <div className="py-10 text-gray-500">Loading details…</div>
      ) : !selectedPokemon ? (
        <div className="text-gray-500 mt-6">Select a Pokémon from the table to view details.</div>
      ) : (
        <>
          <div className="flex items-end gap-4 mb-4">
            {types.length > 0 ? (
              types.map((t) => {
                const name = t.type?.name;
                const isActive = activeType === name;
                return (
                  <button
                    key={name}
                    onClick={() => handleTypeClick(name)}
                    aria-pressed={isActive}
                    className={`px-4 py-2 rounded-md font-semibold capitalize text-sm ${
                      isActive ? "bg-gray-200 text-blue-800" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {name}
                  </button>
                );
              })
            ) : (
              <div className="text-sm text-gray-500">No type information available.</div>
            )}
          </div>

          <div className="h-px bg-gray-200 mb-6" />

          <div className="text-lg text-gray-700 space-y-3">
            <p>
              <span className="font-semibold">Type:</span>{" "}
              <span className="capitalize">{activeType ?? "—"}</span>
            </p>

            <p>
              <span className="font-semibold">Game Indices:</span>{" "}
              {selectedPokemon?.game_indices?.length ?? 0}
            </p>

            <p>
              <span className="font-semibold">Moves:</span>{" "}
              {selectedPokemon?.moves?.length ?? 0}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
