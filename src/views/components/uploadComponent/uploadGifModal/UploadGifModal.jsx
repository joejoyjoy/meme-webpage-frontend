import { useState, useEffect, useRef } from 'react'
import './uploadGifModal.scss'
import { VscChromeClose } from 'react-icons/vsc'

export default function UploadGifModal({ gif, isOpened, gifPreview, onClose }) {
  const [songData, setSongData] = useState({
    gif: '',
    name: ''
  });
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      setTimeout(() => {
        ref.current?.close();
        document.body.classList.remove("modal-open");
      }, 400);
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    // postPrivateTrack(songData)
    console.log(songData)
    setSongData({ gif: '', name: '' })
    onClose();
  };

  const preventAutoClose = (e) => e.stopPropagation();

  useEffect(() => {
    let isMounted = true
    if (isMounted && gif && gif.name) {
      setSongData({ gif: gif, name: gif.name });
    }
    return () => { isMounted = false }
  }, [gif])

  return (
    <dialog ref={ref} onCancel={onClose} onClick={onClose} className={isOpened ? "modal-upload-song modal-song-open" : "modal-upload-song modal-song-close"}>
      <div onClick={preventAutoClose} className="modal-upload-song--content">
        <h2>Upload you own GIFs</h2>
        <button onClick={onClose} className="modal-upload-song--content__close"><VscChromeClose /></button>
        <div className="modal-upload-song--content__main">
          <img src={gifPreview ? gifPreview : ""} alt={songData.name ? songData.name : "Uploaded Gif"} />
          <div className="modal-upload-song--content__main--content">
            <div className="modal-upload-song--content__main--content__name-input">
              <label htmlFor="song-name">One</label>
              <input
                name="name"
                id="song-name"
                type="text"
                placeholder="There"
                value={songData.name}
                onChange={e => setSongData({ ...songData, name: e.target.value })}
              />
            </div>
          </div>
        </div>
        <button onClick={proceedAndClose} className="modal-upload-song--content__save">Save</button>
      </div>
    </dialog>
  )
}
