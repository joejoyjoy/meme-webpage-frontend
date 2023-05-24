import { useState, useEffect, useRef, useContext } from 'react'
import { message } from 'antd'
import { GifDataContext } from '../../../../context/GifDataContext';
import './uploadGifModal.scss'
import { VscChromeClose } from 'react-icons/vsc'

export default function UploadGifModal({ gif, isOpened, gifPreview, onClose }) {
  const [gifData, setGifData] = useState({
    gif: '',
    name: ''
  });
  const { postGifFile } = useContext(GifDataContext);
  const [messageApi, contextHolder] = message.useMessage()
  const ref = useRef(null);

  const proceedAndClose = async () => {
    postGifFile(gifData, messageApi)
    setGifData({ gif: '', name: '' })
    onClose();
  };

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

  const preventAutoClose = (e) => e.stopPropagation();

  useEffect(() => {
    let isMounted = true
    if (isMounted && gif && gif.name) {
      setGifData({ gif: gif, name: gif.name });
    }
    return () => { isMounted = false }
  }, [gif])

  return (
    <>
      {contextHolder}
      <dialog ref={ref} onCancel={onClose} onClick={onClose} className={isOpened ? "modal-upload-gif modal-gif-open" : "modal-upload-gif modal-gif-close"}>
        <div onClick={preventAutoClose} className="modal-upload-gif--content">
          <button onClick={onClose} className="modal-upload-gif--content__close"><VscChromeClose /></button>
          <div className="modal-upload-gif--content__main">
            <img src={gifPreview ? gifPreview : ""} alt={gifData.name ? gifData.name : "Uploaded Gif"} />
            <div className="modal-upload-gif--content__main--content">
              <h2>Upload you own GIFs</h2>
              <div className="modal-upload-gif--content__main--content__name-input">
                <label htmlFor="gif-name">Gif name</label>
                <input
                  name="name"
                  id="gif-name"
                  type="text"
                  placeholder="Insert name of GIF"
                  value={gifData.name}
                  onChange={e => setGifData({ ...gifData, name: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button onClick={proceedAndClose} className="modal-upload-gif--content__save">Save</button>
        </div>
      </dialog>
    </>
  )
}
