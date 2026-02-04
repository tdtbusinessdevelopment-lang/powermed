import React, { useState, useEffect } from 'react'
import '../styles/peptide_calculator.css'

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
    const syringeUnits = (actualDose / actualStrength) * 100 // Convert to syringe units (0.01 mL = 1 unit)
    const doseInMl = actualDose / concentration
    const vialDoses = actualWater * actualStrength / actualDose

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
                <svg className="syringe-svg" viewBox="0 0 1800 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Gradients for 3D effect */}
                    <linearGradient id="plungerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#2a2a2a', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#000000', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="syringeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f5f5f5', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#e8e8e8', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#FF8555', stopOpacity: 0.85}} />
                      <stop offset="100%" style={{stopColor: '#FF6B35', stopOpacity: 0.85}} />
                    </linearGradient>
                  </defs>

                  {/* Plunger handle (circular with shadow) */}
                  <circle cx="120" cy="195" r="60" fill="#333333" opacity="0.2" />
                  <circle cx="120" cy="195" r="57" fill="url(#plungerGradient)" stroke="#000" strokeWidth="3" />
                  <circle cx="113" cy="188" r="24" fill="#555555" opacity="0.3" />

                  {/* Plunger rod */}
                  <rect
                    x="177"
                    y="183"
                    width={1300 * Math.min((results?.syringeUnits || 0), 100) / 100}
                    height="24"
                    fill="url(#plungerGradient)"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                  />

                  {/* Plunger head */}
                  <rect
                    x={177 + (1300 * Math.min((results?.syringeUnits || 0), 100)) / 100 - 18}
                    y="145"
                    width="36"
                    height="100"
                    fill="#1a1a1a"
                    stroke="#000"
                    strokeWidth="3"
                  />
                  <rect
                    x={177 + (1300 * Math.min((results?.syringeUnits || 0), 100)) / 100 - 16}
                    y="148"
                    width="32"
                    height="94"
                    fill="#444444"
                    opacity="0.6"
                  />

                  {/* Syringe barrel shadow/border */}
                  <rect x="300" y="137" width="1300" height="116" fill="#1a1a1a" opacity="0.15" rx="3" />
                  
                  {/* Syringe barrel background with gradient */}
                  <rect x="300" y="133" width="1300" height="116" fill="url(#syringeGradient)" stroke="#222" strokeWidth="4" rx="3" />
                  
                  {/* Syringe barrel fill with gradient */}
                  <rect
                    x="300"
                    y="133"
                    width={(1300 * Math.min((results?.syringeUnits || 0), 100)) / 100}
                    height="116"
                    fill="url(#fillGradient)"
                  />
                  
                  {/* Highlight on fill for glass effect */}
                  <rect
                    x="300"
                    y="133"
                    width={(1300 * Math.min((results?.syringeUnits || 0), 100)) / 100}
                    height="14"
                    fill="#ffffff"
                    opacity="0.3"
                  />

                  {/* Tick marks and numbers */}
                  {Array.from({ length: 101 }, (_, i) => i).map((tick) => {
                    const x = 300 + (1300 * tick) / 100
                    const isMainTick = tick % 10 === 0
                    const isMinorTick = tick % 5 === 0 && tick % 10 !== 0
                    
                    return (
                      <g key={`tick-${tick}`}>
                        {isMainTick && (
                          <>
                            <line
                              x1={x}
                              y1="133"
                              x2={x}
                              y2="249"
                              stroke="#1a1a1a"
                              strokeWidth="3.5"
                              opacity="0.75"
                            />
                            <text
                              x={x}
                              y="220"
                              textAnchor="middle"
                              fontSize="28"
                              fontWeight="700"
                              fill="#1a1a1a"
                              pointerEvents="none"
                              letterSpacing="0"
                            >
                              {tick}
                            </text>
                          </>
                        )}
                        {isMinorTick && (
                          <line
                            x1={x}
                            y1="133"
                            x2={x}
                            y2="195"
                            stroke="#333"
                            strokeWidth="2.8"
                            opacity="0.65"
                          />
                        )}
                        {!isMainTick && !isMinorTick && (
                          <line
                            x1={x}
                            y1="133"
                            x2={x}
                            y2="170"
                            stroke="#555"
                            strokeWidth="2.2"
                            opacity="0.45"
                          />
                        )}
                      </g>
                    )
                  })}
                </svg>
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
