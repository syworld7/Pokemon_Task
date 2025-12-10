import { useState, useCallback } from "react";

export default function usePokemonHook(initialLimit = 10) {
  const [pokemonData, setPokemonData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const dataPerPage = initialLimit;

  const fetchPokemonData = useCallback(async (page = 1) => {
    setTableLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * dataPerPage;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${dataPerPage}`
      );
      if (!response.ok) throw new Error("Failed to fetch Pokémon list");
      const data = await response.json();
      setPokemonData(data.results || []);
      setTotalPages(Math.ceil((data.count || 0) / dataPerPage));
      setTotalCount(data.count || 0);
    } catch (err) {
      setError(err.message || "Unable to fetch the pokemon list");
      setPokemonData([]);
      setTotalPages(0);
      setTotalCount(0);
    } finally {
      setTableLoading(false);
    }
  }, [dataPerPage]);

  const fetchDetails = useCallback(async (url) => {
    setDetailsLoading(true);
    setDetailsError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch Pokémon details");
      const data = await res.json();
      setDetails(data || null);
    } catch (err) {
      setDetailsError(err.message || "Unknown error");
      setDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  return {
    pokemonData,
    totalPages,
    totalCount,
    tableLoading,
    error,
    fetchPokemonData,
    details,
    detailsLoading,
    detailsError,
    fetchDetails,
    dataPerPage,
  };
}
