import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

const options: ISourceOptions = {
  fullScreen: false,
  background: { color: '#FFF0DD' },
  fpsLimit: 60,
  particles: {
    number: {
      value: 40,
      density: { enable: true, width: 1200, height: 800 },
    },
    color: { value: '#54BAB9' },
    opacity: {
      value: { min: 0.1, max: 0.9 },
      animation: {
        enable: true,
        speed: 0.5,
        startValue: 'random',
        sync: false,
      },
    },
    size: {
      value: { min: 2, max: 5 },
    },
    shadow: {
      enable: true,
      color: '#FFF0DD',
      blur: 8,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    shape: { type: 'circle' },
  },
  detectRetina: true,
}

export default function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="fireflies"
      options={options}
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
