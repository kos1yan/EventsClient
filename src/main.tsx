import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { router } from './services/router';
import { store } from './services/redux/store'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript initialColorMode='light' />
      <ChakraProvider>
        <CookiesProvider>
          <RouterProvider router={router}/>
        </CookiesProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
