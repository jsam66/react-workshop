import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, aPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {
      albums.map(a => <Link className='item' key={a.id} to={`${aPathname}/${a.id}`}>{a.name}</Link>)
    }
  </div>
);

export default VerticalMenu;
