import React from 'react'
import './introComponent.scss'

export default function IntroComponent() {
  return (
    <section className="intro-component">
      <h2>Memes Browser</h2>
      <p className="intro-component__paragraph">
        Stay <b>up to date</b> with all <b>trending Memes</b> & <b>GIFs</b> on the internet.
        <br />
        All in one platform and <b>available for all devices</b>.
      </p>
      <button className="intro-component__action-btn">
        Let's Browse
      </button>
    </section>
  )
}
