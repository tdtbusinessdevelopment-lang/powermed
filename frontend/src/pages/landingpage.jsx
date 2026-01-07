import React from 'react'
import Topbar from '../components/topbar.jsx'
import '../styles/landingpage.css'

export default function landingpage() {
  return (
    <div>
      <Topbar />
      <div className="landingpage-content">
        <h1>Welcome to the Landing Page</h1>
        <p>This is where the main content of the landing page will go.</p>
      </div>
    </div>
  )
}
