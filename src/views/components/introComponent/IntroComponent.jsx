import React from 'react'
import { Link as ScrollLink } from 'react-scroll';
import './introComponent.scss'

export default function IntroComponent() {
  return (
    <>
      <section className="intro-component">
        <h2>Memes Browser</h2>
        <p className="intro-component__paragraph">
          Stay <b>up to date</b> with all <b>trending Memes</b> & <b>GIFs</b>.
          <br />
          All in one platform and <b>available for all devices</b>.
        </p>
        <ScrollLink
          to="searchResult"
          id="action-button"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="intro-component__action-btn"
        >
          Let's Browse
        </ScrollLink>
      </section>
    </>
  )
}
