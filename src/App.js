import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme'
import { GlobalStyles } from './global'
import './App.css'

import ModeToggle from './components/ModeToggle'
import FlagId from './img/flag-id.png'

import useLocalStorage from './hooks/useLocalStorage'
import useStats from './hooks/useStats'
import useNews from './hooks/useNews'

const SkeletonView = () => (
  <span className="skeleton-view"></span>
)

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light")
  const { data: stats, status: statsStatus } = useStats()
  const { data: news, status: newsStatus } = useNews()

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
        <div className="container">
          <h1>Covid Tracker ID <img src={FlagId} alt="Indonesia" height="30" style={{marginBottom: '-5px'}}></img></h1>
          <ModeToggle isDarkMode={theme === "dark"} onClick={changeTheme} />

          <div className="flex-home">
            <div className="box">
              <p className="num" style={{color: "#f2c94c"}}>
                {statsStatus === "resolved" ?  stats.confirmed : <SkeletonView />}
              </p>
              <p className="box-title">Terkonfirmasi</p>
            </div>
            <div className="box">
              <p className="num" style={{color: "#219653"}}>
                {statsStatus === "resolved" ?  stats.recovered : <SkeletonView />}
              </p>
              <p className="box-title">Sembuh</p>
            </div>
            <div className="box">
              <p className="num" style={{color: "#d8232a"}}>
                {statsStatus === "resolved" ?  stats.deaths : <SkeletonView />}
              </p>
              <p className="box-title">Meninggal</p>
            </div>
          </div>

          <div className="articles">
            <h2>Berita Terkini</h2>
              {news.map(item => (
                <div key={item.url} className="box">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <h3>{item.title}</h3>
                  </a>
                  <img src={item.urlToImage} alt="Cover"></img>
                  <p>{item.content}</p>
                  <small style={{opacity: '0.5'}}>{new Date(item.publishedAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | {item.author}</small>
                </div>
              ))}
              {newsStatus === "rejected" && (
                <p className="text-center">Gagal memuat berita</p>
              )}
          </div>
          <footer>
            API by <a href="https://mathdro.id/" target="_blank" rel="noopener noreferrer">mathdroid</a> and <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">newsapi</a>
          </footer>
        </div>
    </ThemeProvider>
  )
}

export default App;
