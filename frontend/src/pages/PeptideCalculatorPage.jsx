import React from 'react'
import Topbar from '../components/topbar'
import Footer from '../components/footer'
import PeptideCalculator from '../components/PeptideCalculator'

export default function PeptideCalculatorPage() {
  return (
    <div>
      <Topbar />
      <PeptideCalculator />
      <Footer />
    </div>
  )
}
