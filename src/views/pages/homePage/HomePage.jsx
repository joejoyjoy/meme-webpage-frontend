import { Suspense } from 'react'
import IntroComponent from '../../components/introComponent/IntroComponent'
import ContentComponent from '../../components/contentComponent/ContentComponent'
import SplineAssets from '../../components/splineAssets/SplineAssets'
import useWindowSizeReport from '../../../hooks/useWindowSizeReport'
import './homePage.scss'

export default function HomePage() {
  const [screenWidth] = useWindowSizeReport();

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
