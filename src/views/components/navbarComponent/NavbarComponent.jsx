import { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SearchGifsContext } from "../../../context/SearchGifs"
import useWindowSizeReport from "../../../hooks/useWindowSizeReport";
import { Link as ScrollLink } from 'react-scroll';
import { CgSearch } from 'react-icons/cg';
import './navbarComponent.scss'

// custom hook to get the current pathname in React

export const usePathname = () => {
  const location = useLocation();
  return location.pathname;
}

export default function NavbarComponent() {
  const { keyword, handleSearch } = useContext(SearchGifsContext);
  const [mobileView, setMobileView] = useState(true)
  const [searchView, setSearchView] = useState(false)
  const [popperOpen, setPopperOpen] = useState(false);
  const [screenWidth] = useWindowSizeReport();
  let popperRef = useRef();

  const handleOnClick = () => {
    setSearchView(!searchView)
    setMobileView(!mobileView)
  }

  useEffect(() => {
    if (screenWidth < 412) {
      setSearchView(true)
      setMobileView(true)
    } else {
      setSearchView(false)
      setMobileView(true)
    }
  }, [screenWidth])

  useEffect(() => {
    if (screenWidth < 412) {
      const handler = (e) => {
        if (!popperRef.current.contains(e.target)) {
          setPopperOpen(false);
          setSearchView(true)
          setMobileView(true)
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      }
    }
  }, []);

  return (
    <div className="navbar-component" ref={screenWidth < 412 ? popperRef : undefined}>
      <div className="navbar-component--content">
        <Link to={"/"} className="navbar-component--content__logo">
          {mobileView && <h1>Memes & GIFs</h1>}
        </Link>
        <nav className="navbar-component--content__navbar" >
          <NavLink to={"/upload"} className="navbar-component--content__navbar--upload">
            <span>Upload</span>
          </NavLink>
          {usePathname() !== "/upload" &&
            <ScrollLink
              to="searchResult"
              id="searchButton"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="navbar-component--content__navbar--search"
            >
              <CgSearch
                size={25}
                onClick={screenWidth < 412 ? () => { handleOnClick(); setPopperOpen(!popperOpen) } : undefined}
              />
              {!searchView &&
                <input
                  type="text"
                  value={keyword}
                  onChange={handleSearch}
                  placeholder="I'm looking for..."
                />
              }
            </ScrollLink>
          }
        </nav>
      </div>
    </div>
  )
}
