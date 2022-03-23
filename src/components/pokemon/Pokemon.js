import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73BOC',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default function Pokemon() {
  const { pokemonIndex } = useParams();
  const [pokemonUrl, setPokemonUrl] = useState('');
  const [pokemonSpeciesUrl, setPokemonSpeciesUrl] = useState('');
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const getData = async () => {
    setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`);
    setPokemonSpeciesUrl(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`
    );
    const pokemonRes = await axios.get(pokemonUrl);
    setName(pokemonRes.data.name);
    setWeight(pokemonRes.data.weight / 10);
    setHeight(pokemonRes.data.height / 10);
    setTypes(pokemonRes.data.types.map(type => type.type.name));
    setImageUrl(pokemonRes.data.sprites.front_default);
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">
              <h5>{pokemonIndex}</h5>
            </div>
            <div className="col-7">
              <div className="float-right">
                {types.map(type => (
                  <span
                    key={type}
                    className="badge badge-pill mr-1"
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: 'white'
                    }}
                  >
                    {type
                      .toLowerCase()
                      .split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src={imageUrl}
                alt={name}
                className="card-img-top rounded mx-auto mt-2"
              />
            </div>
            <div className="col-md-9">
              <h4 className="mx-auto">
                {name
                  .toLowerCase()
                  .split(' ')
                  .map(
                    letter =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(' ')}
              </h4>
              <div className="col-12 col-md-3">
                <FontAwesomeIcon
                  style={{ marginRight: '0.5rem' }}
                  icon={faRuler}
                />
                Height: {height} m
              </div>
              <FontAwesomeIcon
                icon={faWeightHanging}
                style={{ marginRight: '0.5rem' }}
              />
              Weight: {weight} kg
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          Data from:{' '}
          <a href="https://pokeapi.co/" target="_blank" className="card-link">
            PokeAPI.co
          </a>
        </div>
      </div>
    </div>
  );
}
