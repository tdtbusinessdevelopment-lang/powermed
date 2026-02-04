import React, { useState, useEffect } from 'react'
import '../styles/peptide_calculator.css'
import syringeImage from '../assets/images/image.png'

export default function PeptideCalculator() {
  const [dose, setDose] = useState(0)
  const [strength, setStrength] = useState(0)
  const [water, setWater] = useState(0)
  const [customDose, setCustomDose] = useState('')
  const [customStrength, setCustomStrength] = useState('')
  const [customWater, setCustomWater] = useState('')
  const [results, setResults] = useState(null)

  const doseOptions = [0.1, 0.25, 0.5, 1, 2, 2.5, 5, 7.5, 10, 12.5, 15]
  const strengthOptions = [1, 5, 10, 15, 20, 50]
  const waterOptions = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]

  // Calculate results when inputs change
  useEffect(() => {
    calculateResults()
  }, [dose, strength, water])

  const calculateResults = () => {
    // Get the actual dose value (custom or preset)
    const actualDose = customDose ? parseFloat(customDose) : dose
    const actualStrength = customStrength ? parseFloat(customStrength) : strength
    const actualWater = customWater ? parseFloat(customWater) : water

    // Validate inputs
    if (!actualDose || !actualStrength || !actualWater) {
      setResults(null)
      return
    }

    // Calculations
    const concentration = actualStrength / actualWater // mg/mL
    const doseInMl = actualDose / concentration // mL
    const syringeUnits = doseInMl * 100 // Convert mL to syringe units (1 mL = 100 units)
    const vialDoses = (actualStrength / actualDose) // Total doses in vial

    setResults({
      concentration: concentration.toFixed(2),
      syringeUnits: syringeUnits.toFixed(2),
      doseInMl: doseInMl.toFixed(3),
      vialDoses: Math.floor(vialDoses),
      dose: actualDose,
      strength: actualStrength,
      water: actualWater
    })
  }

  const handleDoseSelect = (value) => {
    setDose(value)
    setCustomDose('')
  }

  const handleStrengthSelect = (value) => {
    setStrength(value)
    setCustomStrength('')
  }

  const handleWaterSelect = (value) => {
    setWater(value)
    setCustomWater('')
  }

  const handleCustomDoseChange = (e) => {
    const value = e.target.value
    setCustomDose(value)
    if (value) {
      setDose(0)
    }
  }

  const handleCustomStrengthChange = (e) => {
    const value = e.target.value
    setCustomStrength(value)
    if (value) {
      setStrength(0)
    }
  }

  const handleCustomWaterChange = (e) => {
    const value = e.target.value
    setCustomWater(value)
    if (value) {
      setWater(0)
    }
  }

  return (
    <div className="peptide-calculator">
      <div className="calculator-container">
        <h1 className="calculator-title">Peptide Calculator</h1>
        <p className="calculator-subtitle">
          Easily calculate accurate dosages by selecting your parameters below
        </p>

        <div className="calculator-inputs">
          {/* Dose of Peptide */}
          <div className="input-section">
            <h3 className="section-title">Dose of Peptide</h3>
            <div className="button-grid">
              {doseOptions.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${dose === option && !customDose ? 'active' : ''}`}
                  onClick={() => handleDoseSelect(option)}
                >
                  {option}mg
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Enter custom dose (mg)"
              value={customDose}
              onChange={handleCustomDoseChange}
              className="custom-input"
            />
          </div>

          {/* Strength of Peptide */}
          <div className="input-section">
            <h3 className="section-title">Strength of Peptide</h3>
            <div className="button-grid">
              {strengthOptions.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${strength === option && !customStrength ? 'active' : ''}`}
                  onClick={() => handleStrengthSelect(option)}
                >
                  {option}mg
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Enter custom strength (mg)"
              value={customStrength}
              onChange={handleCustomStrengthChange}
              className="custom-input"
            />
          </div>

          {/* Water for Peptide */}
          <div className="input-section">
            <h3 className="section-title">Water of Peptide</h3>
            <div className="button-grid">
              {waterOptions.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${water === option && !customWater ? 'active' : ''}`}
                  onClick={() => handleWaterSelect(option)}
                >
                  {option.toFixed(1)}mL
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Enter custom water (mL)"
              value={customWater}
              onChange={handleCustomWaterChange}
              className="custom-input"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h2 className="results-title">Results</h2>
          
          <div className="results-content">
            {results && (
              <div className="results-info">
                <p className="result-label">PEPTIDE DOSE: <span className="result-value">{results.dose} mg</span></p>
                <p className="result-label">DRAW SYRINGE TO: <span className="result-value">{results.syringeUnits} units</span></p>
              </div>
            )}

            {/* Syringe Visualizer */}
            <div className="syringe-container">
              <div className="syringe-wrapper">
                <img 
                  src={syringeImage} 
                  alt="Syringe" 
                  className="syringe-base-image"
                />
                <div 
                  className="syringe-fill-overlay"
                  style={{
                    "--fill-percent": Math.min((results?.syringeUnits || 0), 100)
                  }}
                ></div>
              </div>
            </div>

            {results && (
              <div className="results-info">
                <p className="result-label">YOUR VIAL CONTAINS: <span className="result-value">{results.vialDoses} doses</span></p>
                <p className="result-label">CONCENTRATION: <span className="result-value">{results.concentration} mg/mL</span></p>
              </div>
            )}
          </div>
        </div>

        {!results && (
          <div className="no-results">
            <p>Select or enter valid values to calculate dosage</p>
          </div>
        )}
      </div>
    </div>
  )
}
