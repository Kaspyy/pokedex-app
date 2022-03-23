import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { TYPE_COLORS } from '../constants';

export default function Pokemon() {
  const { pokemonIndex } = useParams();
  const [pokemonUrl, setPokemonUrl] = useState('');
  const [pokemonSpeciesUrl, setPokemonSpeciesUrl] = useState('');
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [{ weight, height }, setWeightHeight] = useState({
    weight: '',
    height: ''
  });

  const getData = async () => {
    setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`);
    setPokemonSpeciesUrl(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`
    );
    const pokemonRes = await axios.get(pokemonUrl);
    setName(pokemonRes.data.name);
    setWeightHeight({
      weight: pokemonRes.data.weight / 10,
      height: pokemonRes.data.height / 10
    });
    setTypes(pokemonRes.data.types.map(type => type.type.name));
    setImageUrl(pokemonRes.data.sprites.front_default);
  };

  useEffect(() => {
    getData();
  });

  const typeName = types.map(type => (
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
  ));
  const displayedName = name
    .toLowerCase()
    .split(' ')
    .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
    .join(' ');

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">
              <h5>{pokemonIndex}</h5>
            </div>
            <div className="col-7">
              <div className="float-right">{typeName}</div>
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
              <h4 className="mx-auto">{displayedName}</h4>
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
