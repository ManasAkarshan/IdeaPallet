"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateSection from './_components/TemplateSection'

function Dashboard() {
  const [searchInput, setSearchInput] = useState("")

  return (
    <div>
      {/* Search section  */}
      <SearchSection setSearchInput={setSearchInput}/>
      {/* Template list */}
      <TemplateSection searchInput={searchInput}/>
    </div>
  )
}

export default Dashboard