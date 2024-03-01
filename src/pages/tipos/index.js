"use client";

import Navbar from "@/app/components/Navbar";
import "../../app/globals.css";
import "flowbite";
import React, { useState, useEffect, useRef } from "react";

export default function Tipos() {
  const baseURL = "https://pokeapi.co/api/v2/type/";
  const [typePokemon, setTypePokemon] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await fetch(`${baseURL}`);
        const data = await response.json();

        const allPokemonType = { name: "Todos os Pokémons", url: null };
        setTypePokemon([allPokemonType, ...data.results]);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchType();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setIsDropdownOpen(false);
  };

  const handleSearch = async () => {
    try {
      let url;

      if (selectedType && selectedType.url) {
        url = selectedType.url;
      } else {
        url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000";
      }

      const response = await fetch(url);
      const data = await response.json();

      let pokemonsData;

      if (data.results) {
        // Caso seja uma lista de pokémons
        const allPokemons = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        });

        pokemonsData = await Promise.all(allPokemons);
      } else if (data.pokemon) {
        // Caso seja um tipo específico de pokémon
        const allPokemons = data.pokemon.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.pokemon.url);
          return await pokemonResponse.json();
        });

        pokemonsData = await Promise.all(allPokemons);
      } else {
        pokemonsData = [];
      }

      setPokemonList(pokemonsData);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const AudioPlayer = ({ audioUrl }) => {
    const audioRef = useRef(null);

    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    return (
      <div>
        <button onClick={playAudio}>Reproduzir Áudio</button>
        <audio ref={audioRef} controls>
          <source src={audioUrl} type="audio/ogg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-6">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedType ? selectedType.name : "Tipos de Pokemons"}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className={`z-10 ${
            isDropdownOpen ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0 mt-2`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {typePokemon &&
              typePokemon.map((type, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleTypeClick(type)}
                  >
                    {type.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <button
          onClick={handleSearch}
          className="ml-4 text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buscar
        </button>

        <div className="mt-4">
          {console.log("pokemonList:", pokemonList)}

          {pokemonList && (
            <div className="mt-6 relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sprite
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Height
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type1
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type2
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Base Experience
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Som
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pokemonList.map((pokemon, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={pokemon.sprites.front_default}
                          alt="Pokemon"
                        ></img>
                      </td>
                      <td className="px-6 py-4">{pokemon.id}</td>
                      <td className="px-6 py-4">{pokemon.name}</td>
                      <td className="px-6 py-4">{pokemon.height}</td>
                      <td className="px-6 py-4">{pokemon.weight}</td>
                      <td className="px-6 py-4">
                        {pokemon.types && pokemon.types.length > 0
                          ? pokemon.types[0]?.type?.name
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {pokemon.types && pokemon.types.length > 1
                          ? pokemon.types[1]?.type?.name
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">{pokemon.base_experience}</td>

                      <td className="px-6 py-4"><AudioPlayer audioUrl={pokemon.cries.latest} /></td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
