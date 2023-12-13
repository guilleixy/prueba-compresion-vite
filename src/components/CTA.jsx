import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='cta z-index-1'>
        <p className='cta-text'>Have a project in mind? <br className='sm:block hidden'/>Let's build something together!</p>
        <Link to="/contact" className="btn">Contact</Link>
    </section>
  )
}

export default CTA