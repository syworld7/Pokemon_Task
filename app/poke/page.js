
"use client";

import React, { useEffect, useState } from "react";
import usePokemonHook from "../hooks/usePokemonHook";
import PokemonTable from "../components/PokemonTable";
import DetailsPanel from "../components/DetailsPanel";

export default function PokePage() {
  const {
    pokemonData,
    totalPages,
    totalCount,
    tableLoading,
    fetchPokemonData,
    details,
    detailsLoading,
    fetchDetails,
    dataPerPage,
  } = usePokemonHook(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    fetchPokemonData(currentPage);
    setSelectedPokemon(null);
    setActiveType(null);
  }, [currentPage, fetchPokemonData]);

  useEffect(() => {
    if (details) {
      setSelectedPokemon(details);
      const first = details?.types?.[0]?.type?.name ?? null;
      setActiveType(first);
    }
  }, [details]);

  const handleSelect = (url, name) => {
    fetchDetails(url);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-rose-50 py-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 max-w-full">
          <div className="col-span-6">
            <PokemonTable
              pokemon={pokemonData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              onSelect={handleSelect}
              loading={tableLoading}
              dataPerPage={dataPerPage}
            />
          </div>

          <div className="col-span-6">
            <DetailsPanel
              selectedPokemon={selectedPokemon}
              activeType={activeType}
              setActiveType={setActiveType}
              loading={detailsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
