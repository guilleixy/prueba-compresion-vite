import { linkedin, githubwhite } from '../assets/icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer-cont z-index-1 text-white'>
        <hr className='border-slate-200 mb-10'/>
        <div className='flex place-content-between items-center flex-wrap '>
            <div>
                © 2023 <span className="font-semibold">Guillermo Bernal</span>. All rights reserved.
            </div>
            <div className='flex items-center'>
                <Link to="https://github.com/guilleixy" target='_blank' rel='noopener noreferrer' className='mx-4'>
                    <img src={githubwhite} alt="Linkedin" className='w-6 h-6 object-contain'/>
                </Link>
                <Link to="https://www.linkedin.com/in/guillermo-bernal-b0515b285/" target='_blank' rel='noopener noreferrer'>
                    <img src={linkedin} alt="Linkedin" className='w-6 h-6 object-contain'/>
                </Link>
            </div>            
        </div>

    </footer>
  )
}

export default Footer