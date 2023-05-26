import { Suspense, useEffect, useState } from 'react'
import IntroComponent from '../../components/introComponent/IntroComponent'
import ContentComponent from '../../components/contentComponent/ContentComponent'
import SplineAssets from '../../components/splineAssets/SplineAssets'
import './homePage.scss'

export default function HomePage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  }, [])

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > 1024) ? (
        <>
          <main>
            <IntroComponent />
            <ContentComponent />
          </main>
          <SplineAssets />
        </>
      ) : (
        <main className="home-page-mobile">
          <ContentComponent />
        </main>
      )}
    </Suspense>
  )
}
