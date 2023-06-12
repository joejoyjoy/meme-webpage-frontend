export default function useGifApi() {
  const { VITE_SERVER_URL } = import.meta.env

  const getAllGifs = async () => {
    try {
      const response = await fetch(`${VITE_SERVER_URL}/gif/gifs`)
      const data = await response.json()

      return data.allGifs;

    } catch (error) {
      console.error(error);
    }
  }

  const addGif = async (name) => {
    try {
      const response = await fetch(`${VITE_SERVER_URL}/gif/create-gif/${name}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await response.json()
      return data

    } catch (err) {
      console.error(err);
    }
  }

  const updateGifImage = async (id, file) => {
    const { VITE_CLOUDINARY_POST_URL } = import.meta.env

    try {
      const XUniqueUploadId = +new Date();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kthtogwi");
      formData.append("public_id", XUniqueUploadId);

      const response = await fetch(VITE_CLOUDINARY_POST_URL, {
        method: "POST",
        body: formData
      })
      const data = await response.json()

      const sendUrl = await fetch(`${VITE_SERVER_URL}/gif/upload-gif/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageUrl: data.secure_url
        })
      })
      const sendUrlData = await sendUrl.json()
      return sendUrlData

    } catch (err) {
      console.error(err);
    }
  }

  const putGifImage = async (id, url) => {
    try {
      const response = await fetch(`${VITE_SERVER_URL}/gif/upload-gif/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageUrl: url
        })
      })
      
      const data = await response.json()
      return data

    } catch (err) {
      console.error(err);
    }
  }

  return {
    getAllGifs,
    addGif,
    updateGifImage,
    putGifImage
  };
}
