import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataFetching() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get('https://yummly2.p.rapidapi.com/feeds/auto-complete')
  })
  return <div></div>
}

export default DataFetching
