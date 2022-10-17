import { AppRouter } from "./router"
// import { HashRouter } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from "./store"


export const App = () => {
  return (
    <Provider store={store}>
      {/* <HashRouter> */}
      <Router>
          <AppRouter />
      </Router>
      {/* </HashRouter> */}
    </Provider>
  )
}

