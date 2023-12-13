import { arrow } from '../assets/icons'
import { projects } from '../constants'
import { Link } from 'react-router-dom' 
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import RandomText from '../components/RandomText';
import Stars from '../components/Stars';

const Projects = () => {
  return (
    <>
    <Stars/>
    <section className='max-container z-index-1'>
      <h1 className='head-text'>My <RandomText text={'Projects'}/> </h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-400'>
        <p>I've delved into a variety of projects involving different technologies over the years, each holding a special place in my journey of continuous learning. Many of these projects showcase diverse skills, and if any catches your eye, don't hesitate to explore the codebase or the live page!</p>
      </div>
      <div className='flex flex-wrap my-20 gap-16'>
         {projects.map((project)=>(
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`}/>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img src={project.iconUrl} alt="Project Icon" className='w-1/2 h-1/2 object-contain'/>
              </div>
            </div>
            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold text-slate-300'>{project.name}</h4>
              <p className='mt-2 text-slate-400'>{project.description}</p>
              <div className='mt-5 flex items-center gap-2 font-fira'>
                {project.livelink && (
                    <>
                      <img src={arrow} alt="arrow" className='w-4 h-4 object-contain'/>
                      <Link to={project.livelink} target='_blank' rel='noopener noreferrer' className='font-semibold text-purple-500'>Live Link</Link>
                    </>
                  )}
                <img src={arrow} alt="arrow" className='w-4 h-4 object-contain'/> 
                <Link to={project.githublink} target='_blank' rel='noopener noreferrer' className='font-semibold text-purple-500'>Github Link</Link>
              </div>
            </div>
          </div>
         ))}
      </div>
      <hr className='border-slate-200'/>
      <CTA />
    </section>
    <Footer />  
    </>

  )
}

export default Projects