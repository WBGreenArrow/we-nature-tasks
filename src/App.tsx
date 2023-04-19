import React from 'react'
import Routes from './routes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            fontSize: 16,
            fontFamily: 'Inter, sans-serif',
            color: '#1A194D',
            textTransform: 'capitalize',
          },
        }}
      />
      <Routes />
    </div>
  )
}

export default App
