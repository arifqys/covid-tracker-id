import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import './App.css';

import ModeToggle from './components/ModeToggle/ModeToggle';
import FlagId from './img/flag-id.png';

class App extends Component {
  state = {
    data: null,
    isLoaded: false,
    articles: [],
    articlesIsLoaded: false,
    articlesIsError: false,
    theme: lightTheme
  }

  componentDidMount() {
    fetch('https://covid19.mathdro.id/api/countries/IDN')
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoaded: true,
          data: res
        })
      })

    fetch('https://newsapi.org/v2/everything?q=corona+covid&apiKey=' +process.env.REACT_APP_NEWS_API_KEY +'&language=id&sortBy=publishedAt&pageSize=5&page=1')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'error') {
          this.setState({
            articlesIsLoaded: true,
            articlesIsError: true,
          })
        } else {
          this.setState({
            articlesIsLoaded: true,
            articles: res.articles || [],
          })
        }
      })
  }

  changeTheme = () => {
    if (this.state.theme === lightTheme) {
      this.setState({theme: darkTheme})
    }
    else {
      this.setState({theme: lightTheme})
    }
  }

  
  render() {
    let loading = (
      <span className="skeleton-view"></span>
    )

    return (
      <ThemeProvider theme={this.state.theme}>
        <GlobalStyles />
          <div className="container">
            <h1>Covid Tracker ID <img src={FlagId} alt="Indonesia" height="30" style={{marginBottom: '-5px'}}></img></h1>
            <ModeToggle clicked={this.changeTheme} />
            <div className="flex-home">
              <div className="box">
                <p className="num" style={{color: "#f2c94c"}}>{this.state.isLoaded ? this.state.data.confirmed.value : loading}</p>
                <p className="box-title">Terkonfirmasi</p>
              </div>
              <div className="box">
                <p className="num" style={{color: "#219653"}}>{this.state.isLoaded ? this.state.data.recovered.value : loading}</p>
                <p className="box-title">Sembuh</p>
              </div>
              <div className="box">
                <p className="num" style={{color: "#d8232a"}}>{this.state.isLoaded ? this.state.data.deaths.value : loading}</p>
                <p className="box-title">Meninggal</p>
              </div>
            </div>
            <div className="articles">
              <h2>Berita Terkini</h2>
                {this.state.articles.map(article => {
                  let i = article.content.indexOf('…');
                  let content = article.content.slice(0, i+1)
                  return(
                    <div key={article.url} className="box">
                      <a href={article.url} target="_blank" rel="noopener noreferrer"><h3>{this.state.articlesIsLoaded ? article.title : loading}</h3></a>
                      <img src={article.urlToImage} alt="Cover"></img>
                      <p>{this.state.articlesIsLoaded ? content : loading}</p>
                      <small style={{opacity: '0.5'}}>{new Date(article.publishedAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | {article.author}</small>
                    </div>
                  )
                })}
                {this.state.articlesIsError && (
                  <p className="text-center">Gagal memuat berita</p>
                )
                }
            </div>
            <footer>
              API by <a href="https://mathdro.id/" target="_blank" rel="noopener noreferrer">mathdroid</a> and <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">newsapi</a>
            </footer>
          </div>
      </ThemeProvider>
    )
  }
}

export default App;
