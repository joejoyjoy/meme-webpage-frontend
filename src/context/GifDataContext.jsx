import React, { createContext } from "react";
import useGifApi from "../hooks/useGifApi";
import { message } from 'antd';

export const GifDataContext = createContext()

export default function GifDataContextProvider(props) {

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

  const value = { postGifFile, postGifUrl }

  return (
    <GifDataContext.Provider value={value}>
      {props.children}
    </GifDataContext.Provider>
  )
}
