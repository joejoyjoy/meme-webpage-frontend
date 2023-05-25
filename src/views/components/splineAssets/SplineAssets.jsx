import Spline from '@splinetool/react-spline';
import './splineAssets.scss'

export default function SplineAssets() {
  return (
    <div className="spline-assets">
      <img className="spline-assets__img" src="https://res.cloudinary.com/dcfkvewcz/image/upload/v1685013842/splineBackground/placeholderSpline_n7rlf4.png" alt="Spline background" />
      <Spline scene="https://prod.spline.design/jJ5O8OucH8mv3R4h/scene.splinecode" />
    </div>
  );
}
