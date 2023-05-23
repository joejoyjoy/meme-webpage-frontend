const gifsApi = () => {
  const { VITE_SERVER_URL } = import.meta.env

  const addGif = async ({ taskTitle, taskDate, taskDesc, taskState }) => {
    try {
      await fetch(`${VITE_SERVER_URL}/gif/create-gif`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskTitle, taskDate, taskDesc, taskState })
      })

    } catch (error) {
      console.error(error);
    }
  }

  const updateGifImage = async () => {
    try {
      const response = await fetch(`${VITE_SERVER_URL}/gif/gif-image`)
      const data = await response.json()

      return data.data;

    } catch (error) {
      console.error(error);
    }
  }

  return {
    addGif,
    updateGifImage,
  };
}

export default gifsApi