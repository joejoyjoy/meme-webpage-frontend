import React from 'react'
import IntroComponent from '../../components/introComponent/IntroComponent'
import ContentComponent from '../../components/contentComponent/ContentComponent'
import SplineAssets from '../../components/splineAssets/SplineAssets'

export default function HomePage() {
  return (
    <>
      <main>
        <IntroComponent />
        <ContentComponent />
      </main>
      <SplineAssets />
    </>
  )
}
