import React from 'react';
import { NavLink } from 'react-router-dom'
import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, aPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {
      albums.map(a => <NavLink className='item' activeClassName='active' key={a.id} to={`${aPathname}/${a.id}`}>{a.name}</NavLink>
      )
    }
  </div>
);

export default VerticalMenu;
