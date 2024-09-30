import React from 'react'
import DishTable from '../components/DishTable'
import DishSuggester from '../components/DishSuggester'

function Home() {
  return (
    <div>
        <DishSuggester/>
        <DishTable/>
    </div>
  )
}

export default Home