import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

export default function PokemonList() {
  const [data, setData] = useState({});

  const getData = async () => {
    const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
    const res = await axios.get(URL);
    setData({ pokemon: res.data['results'] });
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      {data.pokemon ? (
        <div className="row">
          {data.pokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
    </div>
  );
}
