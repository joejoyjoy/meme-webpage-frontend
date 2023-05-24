import GifDataContextProvider from "./context/GifDataContext";
import SearchGifsContextProvider from "./context/SearchGifs";
import { RouterProvider } from "react-router-dom";
import router from './router/router';

function App() {
  return (
    <GifDataContextProvider>
      <SearchGifsContextProvider>
        <RouterProvider
          router={router}
          fallbackElement={<></>}
        />
      </SearchGifsContextProvider>
    </GifDataContextProvider>
  )
}

export default App
