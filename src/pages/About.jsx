import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Tooltip } from 'react-tooltip';

import { skills, experiences } from '../constants'
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Stars from '../components/Stars';
import RandomText from '../components/RandomText'; 

function About() {
  
  return (
    <>
    <Stars/>
    <section className='max-container z-index-1'>
      {/* <h1 className='head-text'>Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow' onMouseOver={handleMouseOver}>{name}</span></h1> */}
      <h1 className='head-text'>Hello, I'm <RandomText text={'Guillermo'} /></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-400'>
        <p>Freelance Full Stack Developer based in Spain focused on Front-End and UX-UI.</p>
      </div>
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill)=>(
            <div className='block-container w-20 h-20' key={skill.name} data-tooltip-id={skill.name} data-tooltip-content={skill.name}>
              <div className='btn-back rounded-xl'/>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img src={skill.imageUrl} alt={skill.name} className='w-1/2 h-1/2 object-contain'/>
              </div>
              <Tooltip id={skill.name} className='tooltip-style' classNameArrow="tooltip-arrow-style"/>
            </div>
          ))}
        </div>
      </div>
      <div className='py-16'>
         <h3 className='subhead-text'>Licences and Certificates</h3> 
         {/* aqui deberia estar la experiencia xd   */}
          <div className='mt-5 flex flex-col gap-3 text-slate-400'>
            {/* <p>I've worked with all sorts of companies, leveling up my skills and teaming up with smart people. Here's the rundown:</p> */}
            <p>I have undertaken numerous courses and certifications, enriching my skill set and collaborating with astute professionals. Let me provide you with an overview:</p>
          </div>
          <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company_name} 
                  date={experience.date}
                  icon={<div className='flex justify-center items-center w-full h-full'><img src={experience.icon} alt={experience.company_name} 
                  className='w-[60%] h-[60%] object-contain'/></div>}
                  contentStyle={{borderBottom:'8px', borderStyle:'solid', borderBottomColor: experience.iconBg, boxShadow: 'none'}}
                  iconStyle={{background: experience.iconBg}}
                  dateClassName='text-white'
                  >
                  <div>
                    <h3 className='text-black text-xl font-poppins font-semibold'>{experience.title}</h3>
                    <p className='text-black-500 font-medium font-base' style={{margin:0}}>
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point, index)=>(
                      <li key={`experience-point-${index}`} className='text-black-500/80 font-normal pl-1 text-small'>
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
      </div>
      <hr className='border-slate-200'/>
      <CTA />
    </section>  
    <Footer />  
    </>

  )
}

export default About