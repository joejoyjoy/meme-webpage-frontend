import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { CgSearch } from 'react-icons/cg';
import './navbarComponent.scss'

export default function NavbarComponent() {
  return (
    <div className="navbar-component">
      <Link to={"/"} className="navbar-component__logo">
        <h1>Memes & GIFs</h1>
      </Link>
      <nav className="navbar-component__navbar">
        <NavLink to={"/upload"}>
          <span>Upload</span>
        </NavLink>
        <div className="navbar-component__navbar--search">
          <CgSearch size={25} />
        </div>
      </nav>
    </div>
  )
}
