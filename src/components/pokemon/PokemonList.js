import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

export default function PokemonList() {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(20);

  const showMoreData = () => {
    setVisible(prevValue => prevValue + 20);
  };

  const getData = async () => {
    const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
    const res = await axios.get(URL);
    setData({ pokemon: res.data['results'] });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data.pokemon ? (
        <div className="row">
          {data.pokemon.slice(0, visible).map(pokemon => (
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
      <div className="text-center">
        <button
          className="btn col-2"
          style={{ color: 'white', backgroundColor: '#ff0000' }}
          onClick={showMoreData}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
