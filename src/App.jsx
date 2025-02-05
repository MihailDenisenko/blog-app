// import { useDispatch, useSelector } from 'react-redux'

// import styles from './App.module.scss'
import Posts from './components/Posts/Posts'
import NavigationPanel from './components/NavigationPanel/NavigationPanel'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import ArticlePage from './components/ArticlePage/ArticlePage'


function App() {

  return (
    <>
      <NavigationPanel />

      <Routes>
        <Route exact path='/' element={<HomePage />} />

        <Route exact path='/articles' element={<Posts />} />
        <Route exact path='/articles/:slug' element={<ArticlePage />} />
      </Routes>
    </>
  )
}

export default App
