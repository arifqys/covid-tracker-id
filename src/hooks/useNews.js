import { useEffect, useState } from "react"

const useNews = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    setStatus("pending")
    fetch(`https://newsapi.org/v2/everything?q=corona+covid&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&language=id&sortBy=publishedAt&pageSize=5&page=1`)
      .then(res => res.json())
      .then(res => {
        if (res.status === "error") {
          setStatus("rejected")
        } else {
          setStatus("resolved")
          setData(res.articles)
        }
      })
      .catch(() => {
        setStatus("rejected")
      })
  }, [])

  return { data, status }
}

export default useNews
