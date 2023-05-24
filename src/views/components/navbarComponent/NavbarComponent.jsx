import { useContext } from "react";
import { SearchGifsContext } from "../../../context/SearchGifs";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import { CgSearch } from 'react-icons/cg';
import './navbarComponent.scss'

export default function NavbarComponent() {
  const { keyword, setKeyword, handleSearch } = useContext(SearchGifsContext);

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
              value={keyword}
              onChange={handleSearch}
              placeholder="I'm looking for..."
            />
          </ScrollLink>
        </nav>
      </div>
    </div>
  )
}
