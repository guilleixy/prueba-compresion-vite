import {Suspense, useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber'

import Loader from '../components/Loader'
import HomeInfo from '../components/HomeInfo'

import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';


const Home = () => {

  // const audioRef = useRef(new Audio(sakura));
  // audioRef.current.volume = 0.2;
  // audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false)

  const [currentStage, setCurrentStage] = useState(1)

  const [isPlayingMusic, setIsPlayingMusic] = useState(false)

  // useEffect(() => {
  //   if(isPlayingMusic){
  //     audioRef.current.play();
  //   }else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlayingMusic])

  const adjustIslandForScreenSize = () =>{
    let screenScale = null;
    let screenPosition = [0, -4.5, -43];
    let rotation = [0.1, 4.75, 0.3];
    if(window.innerWidth < 768){
      screenScale = [0.125, 0.125, 0.125];
    }else{
      screenScale = [0.25, 0.25, 0.25];      
    }
    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () =>{
    let screenScale, screenPosition;
    if(window.innerWidth < 768){
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0,-1.5,0];
    }else{
      screenScale = [1, 1, 1];    
      screenPosition = [-2, 0, -4];
    }
    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000}} 
        // style={{ background: 'black' }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={1} />
          <directionalLight position={[0,-2,0]} intensity={1} color={'#DF6AE0'} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={0.5}/>
          {/* <Bird /> */}
          <Sky isRotating={isRotating} />
          <Plane isRotating = {isRotating} scale = {planeScale} position = {planePosition} rotation = {[0,50.4,0]} />
          <Island 
            position={islandPosition} 
            scale={islandScale} 
            rotation={islandRotation} 
            isRotating={isRotating} 
            setIsRotating={setIsRotating} 
            setCurrentStage={setCurrentStage}
            />
        </Suspense>
      </Canvas>
      {/* no se para ni guarda cuando cambias de pestaña */}
      {/* <div className='absolute bottom-2 left-2'>
        <img src={!isPlayingMusic ? soundoff : soundon} alt="sound" className='w-10 h-10 cursor-pointer object-contain' onClick={()=>setIsPlayingMusic(!isPlayingMusic)} />
      </div> */}
    </section>
  )
}

export default Home
