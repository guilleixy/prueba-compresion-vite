import React, {useState, useEffect, useRef, Suspense} from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import Fox from '../models/Fox';
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import useAlert from '../hooks/useAlert'
import Stars from '../components/Stars';

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('Idle')

  const { alert, showAlert, hideAlert} = useAlert()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const intervalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setCurrentAnimation('ThumbsUp');
  
    intervalRef.current = setInterval(() => {
      setCurrentAnimation(prevState => prevState === 'Idle' ? 'ThumbsUp' : 'Idle');
    }, 1800);
  
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Guillermo",
        from_email: form.email,
        to_email: 'guillermobernallou@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      clearInterval(intervalRef.current);
      setIsLoading(false);
      showAlert({show: true, text: 'Message sent successfully', type: 'success'})
      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('Idle')
        setForm({ name: '', email: '', message: ''});
      }, 3000)
    }).catch((error) => {
      clearInterval(intervalRef.current);
      setIsLoading(false);
      setCurrentAnimation('Idle')
      console.log(error);
      showAlert({show: true, text: 'I didnt receive your message', type: 'danger'})
    })
  };

  const handleFocus = () => {
    if (intervalRef.current === null) {
      setCurrentAnimation('Wave');
    
      intervalRef.current = setInterval(() => {
        setCurrentAnimation(prevState => prevState === 'Idle' ? 'Wave' : 'Idle');
      }, 1800);
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleBlur = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  
    setCurrentAnimation('Idle');
  };

  const adjustFoxForScreenSize = () =>{
    let screenPosition;
    if(window.innerWidth < 768){
      screenPosition = [-0.5, -1.5, 0];
    }else{
      screenPosition = [0.5, -1.8, 0];      
    }
    return [screenPosition]
  }
  

  const [foxPosition] = adjustFoxForScreenSize();

  return (
    <section className='relaive flex lg:flex-row flex-col max-container h-[100vh]'>
      <Stars />
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col z-index-1'>
        <h1 className='head-text'>Get in Touch</h1>
        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
          <label className='text-slate-400 font-semibold'>
          Name
          <input 
            type='text'
            name='name'
            className='input'
            placeholder='John'
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          </label>
          <label className='text-slate-400 font-semibold'>
          Email
          <input 
            type='email'
            name='email'
            className='input'
            placeholder='john@gmail.com'
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          </label>
          <label className='text-slate-400 font-semibold'>
          Your Message
          <textarea 
            name='message'
            rows={4}
            className='textarea'
            placeholder='Let me know how I can help you!'
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          </label>
          <button
            type='submit'
            className='btn'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] z-index-1'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0,0,1]}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader/>}>
            <Fox currentAnimation={currentAnimation} position={foxPosition} rotation={[12.6,-0.6,0]} scale={[0.8,0.8,0.8]}/>
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact