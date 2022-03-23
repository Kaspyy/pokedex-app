import React from 'react';
import styled from 'styled-components';
import Pokemon_logo from '../img/Pokemon_logo.svg';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top justify-content-center">
        <a href="" className="navbar-brand d-flex col-1 mr-0">
          <div className="d-flex justify-content-between">
            <img
              src={Pokemon_logo}
              style={{ maxWidth: '90px', maxHeight: '90px' }}
              alt="Pokemon"
            />
          </div>
        </a>
      </nav>
    </div>
  );
}
