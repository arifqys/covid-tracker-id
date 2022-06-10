import { useEffect, useState } from "react"

const useLocalStorage = (key, initialState) => {
  const [data, setData] = useState(() => JSON.parse(window.localStorage.getItem(key)) || initialState)

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data))
  }, [key, data])

  return [data, setData]
}

export default useLocalStorage
