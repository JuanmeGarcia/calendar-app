import { AppRouter } from "./router"
import { BrowserRouter as Router } from 'react-router-dom'


export const App = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

