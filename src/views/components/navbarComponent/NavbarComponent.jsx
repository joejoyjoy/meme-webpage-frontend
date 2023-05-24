import { useContext, useEffect, useState } from "react";
import { GifDataContext } from '../../../context/GifDataContext';
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import { CgSearch } from 'react-icons/cg';
import './navbarComponent.scss'

export default function NavbarComponent() {
  const { gifMemes, setGifMemes } = useContext(GifDataContext);
  const [query, setQuery] = useState("")

  const handleSearch = (event) => {
    const queryData = event.target.value;
    setQuery(queryData);

    const searchList = gifMemes.filter((item) => {
      return item.name.toLowerCase().indexOf(queryData.toLowerCase()) !== -1;
    });

    setGifMemes(searchList);
    console.log(gifMemes);
  };

  return (
    <div className="navbar-component">
      <div className="navbar-component--content">
        <Link to={"/"} className="navbar-component--content__logo">
          <h1>Memes & GIFs</h1>
        </Link>
        <nav className="navbar-component--content__navbar">
          <NavLink to={"/upload"} className="navbar-component--content__navbar--upload">
            <span>Upload</span>
          </NavLink>
          <ScrollLink
            to="searchResult"
            id="searchButton"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="navbar-component--content__navbar--search"
          >
            <CgSearch size={25} />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="I'm looking for..."
            />
          </ScrollLink>
        </nav>
      </div>
    </div>
  )
}
