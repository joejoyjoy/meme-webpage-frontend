import React, { useState, createContext } from "react";
import useGifApi from "../hooks/useGifApi";
import { message } from 'antd';

export const GifDataContext = createContext()

export default function GifDataContextProvider(props) {
  const [gifMemes, setGifMemes] = useState([])

  const postGifFile = async (data, messageApi) => {
    messageApi.open({ type: 'loading', content: `Publishing uploaded GIF`, duration: 0 })

    try {
      const postGifFile = await useGifApi().addGif(data.name)

      const postGifContent = await useGifApi().updateGifImage(postGifFile.data._id, data.gif)

      if (postGifContent.status === 200) {
        messageApi.destroy()
        message.success(`Gif '${data.name}' created successfully!`)
      }

    } catch (err) {
      message.error(`Server error: ${err}`)
    }
  }

  const postGifUrl = async (gifName, gifUrl, messageApi) => {
    messageApi.open({ type: 'loading', content: `Publishing created GIF`, duration: 0 })

    try {
      const postGifUrl = await useGifApi().addGif(gifName)

      const postGifContent = await useGifApi().putGifImage(postGifUrl?.data._id, gifUrl)

      if (postGifContent.status === 200) {
        messageApi.destroy()
        message.success(`Gif '${data.name}' created successfully!`)
      }

    } catch (err) {
      message.success(`Gif '${data.name}' created successfully!`)
    }
  }

  const getGifsOfExternalApi = async () => {
    const { VITE_GIPHY_API_KEY } = import.meta.env
    const giphyUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${VITE_GIPHY_API_KEY}&limit=25&rating=g`;

    try {
      const response = await fetch(giphyUrl)
      const data = await response.json()

      return data.data;

    } catch (error) {
      console.error(error);
    }
  }

  const value = { gifMemes, setGifMemes, postGifFile, postGifUrl, getGifsOfExternalApi }

  return (
    <GifDataContext.Provider value={value}>
      {props.children}
    </GifDataContext.Provider>
  )
}
