import { AppRouter } from "./router"
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from "./store"


export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  )
}

