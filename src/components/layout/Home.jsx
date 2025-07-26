import React, { lazy } from 'react'

const Hero = lazy(() => import('@/components/sections/Hero'))
const About = lazy(() => import('@/components/sections/About'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Contact = lazy(() => import('@/components/sections/Contact'))

const Home = () => {
  return (
    <>
      <div id="hero" className="hero-section text-white d-flex justify-content-start align-items-start justify-content-md-center align-items-md-center px-3">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  )
}

export default Home
