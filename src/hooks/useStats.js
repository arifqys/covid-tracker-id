import { useEffect, useState } from "react"

const useStats = () => {
  const [data, setData] = useState(
    {
      confirmed: 0,
      recovered: 0,
      death: 0,
    }
  )
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    setStatus("pending")
    fetch("https://covid19.mathdro.id/api/countries/IDN")
      .then(res => res.json())
      .then(res => {
        setStatus("resolved")
        setData({
          confirmed: res.confirmed.value,
          recovered: res.recovered.value,
          deaths: res.deaths.value,
        })
      })
      .catch(() => {
        setStatus("rejected")
      })
  }, [])

  return { data, status }
}

export default useStats
