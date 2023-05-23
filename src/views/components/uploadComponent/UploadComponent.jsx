import { useState } from 'react'
import './uploadComponent.scss'
import { BsLink45Deg } from 'react-icons/bs';
import UploadGifModal from './uploadGifModal/UploadGifModal';

export default function UploadComponent() {
  const [gif, setGif] = useState({});
  const [isOpened, setIsOpened] = useState(false);
  const [gifPreview, setGifPreview] = useState("");

  const addFile = (e) => {
    setGif(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setGifPreview(URL.createObjectURL(e.target.files[0]));
    }
    setIsOpened(true)
  };

  return (
    <>
      <div className="upload-component-content">
        <div className="upload-component-content__head">
          <h2>Upload & Share GIFs Online</h2>
          <p>Upload your collection to share on the meme browser & everywhere else.<br />
            Upload your GIF</p>
        </div>
        <div className="upload-component-content__body">
          <section className="upload-component-content__body--gif">
            <span>&nbsp;</span>
            <span className="upload-component-content__body--gif__item">
              <div className="upload-component-content__body--gif__item--icon">
                GIF
              </div>
              Upload GIF
            </span>
            <label htmlFor="upload-input" className="upload-component-content__body--gif__upload-btn">Choose File</label>
            <input type="file" id="upload-input" onInput={(e) => addFile(e)} value='' accept="image/gif" hidden />
          </section>
          <hr />
          <section className="upload-component-content__body--url">
            <span>&nbsp;</span>
            <span className="upload-component-content__body--url__item">
              <BsLink45Deg size={65} />
              Any URL
            </span>
            <input type='text' className="upload-component-content__body--url__input-btn" placeholder="Enter any media url ending on GIF" />
          </section>
        </div>
      </div>
      <UploadGifModal
        gif={gif}
        isOpened={isOpened}
        gifPreview={gifPreview}
        onClose={() => setIsOpened(false)}
      />
    </>
  )
}
