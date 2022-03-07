import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'

function App() {
  return (
    <Switch>
      <Route path="/movie-app/movie/:id"><Movie /></Route>
      <Route path="/movie-app" exact><Home /></Route>
    </Switch>
  )
}

export default App
