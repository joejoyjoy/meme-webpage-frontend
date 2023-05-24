import GifDataContextProvider from "./context/GifDataContext";
import { RouterProvider } from "react-router-dom";
import router from './router/router';

function App() {
  return (
    <GifDataContextProvider>
      <RouterProvider
        router={router}
        fallbackElement={<></>}
      />
    </GifDataContextProvider>
  )
}

export default App
