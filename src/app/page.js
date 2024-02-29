"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(1);
  const [randomPokemonNumber, setRandomPokemonNumber] = useState(1);
  const baseURL = "https://pokeapi.co/api/v2/pokemon/";
  //------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(`${baseURL}${pokemonId}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchApi();
  }, []);

  //------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${baseURL}${randomPokemonNumber}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchPokemon();
  }, [randomPokemonNumber]);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleRandomPokemon = () => {
    const newRandomNumber = getRandomNumber(1, 1000); 
    setRandomPokemonNumber(newRandomNumber);
  };

  //------------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    setPokemonId(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${baseURL}${pokemonId}`);
      
      if (!response.ok) {

        throw new Error(`Erro na busca. Código: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (Object.keys(data).length === 0) {

        throw new Error("Pokémon não encontrado. Verifique o ID ou nome.");
      }
  
      setPokemon(data);
    } catch (error) {

      console.error("Erro ao buscar dados da API:", error);

    }
  };

  return (
    <div className="container mx-auto mt-6">
      <label
        htmlFor="pokemonId"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Buscar Pokémon
      </label>
      <div className="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="pokemonId"
          value={pokemonId}
          onChange={handleInputChange}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Pokemon"
          required
        />
        <button
          onClick={handleSearch}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buscar
        </button>
      </div>

      <button
        onClick={handleRandomPokemon}
        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 mt-4"
      >
        Pokémon Aleatório
      </button>

      <div className="mt-6 flex flex-col items-center justify-center">
        {pokemon.sprites && (
          <img src={pokemon.sprites.front_default} alt="Pokemon"></img>
        )}
        <p>ID: {pokemon.id}</p>
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>

        {pokemon.types && (
          <>
            <p>Type 1: {pokemon.types[0]?.type?.name}</p>
            <p>Type 2: {pokemon.types[1]?.type?.name}</p>
          </>
        )}

        <p>Base Experience: {pokemon.base_experience}</p>

        {pokemon.stats && (
          <div className="mt-6 relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name Stat</th>
                  <th scope="col" className="px-6 py-3">Base Stat</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map((stat, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{stat.stat?.name}</td>
                    <td className="px-6 py-4">{stat.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
