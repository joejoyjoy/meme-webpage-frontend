import './contentComponent.scss'
import { BsDot } from 'react-icons/bs';
import GifPlaceholder from '../../../assets/webp/gif-placeholder.webp';
import UserPlaceholder from '../../../assets/webp/user-placeholder.webp'

export default function ContentComponent() {
  return (
    <div className="content-component">
      <section className="content-component__head">
        <span className="content-component__head--title">Feed</span>
        <div className="content-component__head--actions">
          <span>
            <p>Latest</p>
            <BsDot size={25} />
          </span>
          <span>
            <p>Oldest</p>
            <BsDot size={25} />
          </span>
          <span>
            <p>A-Z</p>
            <BsDot size={25} />
          </span>
        </div>
      </section>
      <section className="content-component__grid">
        <article className="content-component__grid--item">
          <div className="content-component__grid--item__head">
            <img src={UserPlaceholder} alt="User Placeholder" />
            <div className="content-component__grid--item__head--user">
              <p>User name</p>
              <span>22 May 2023</span>
            </div>
          </div>
          <img src={GifPlaceholder} alt="Gif Placeholder" className="content-component__grid--item__image"/>
        </article>
      </section>
    </div>
  )
}
