import {useRef, useEffect} from 'react'
import { useAnimations, useGLTF } from '@react-three/drei';

import planeScene from '../assets/3d/plane.glb';
import { useFrame, useThree } from '@react-three/fiber';


const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { gl, viewport } = useThree();
  const { scene, animations } = useGLTF(planeScene);
  const {actions} = useAnimations(animations, ref);

  const lastX = useRef(0);
  const movementSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerMove =  (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(isRotating){
      // const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      // //esto lo medio arregla
      // if (lastX.current === 0) {
      //   lastX.current = clientX;
      // }
      // const delta = (clientX - lastX.current) / viewport.width;
  
      // ref.current.position.x -= delta * 0.02; 
  
      // lastX.current = clientX;
  
      // movementSpeed.current = delta * 0.02;
    }
  }

  useFrame(({clock})=>{
    ref.current.position.y = Math.sin(clock.elapsedTime) * 0.2 - 2;
    ref.current.rotation.z += 0.002 * dampingFactor;

    // if(!isRotating){
    //   movementSpeed.current *= dampingFactor;
    //   if(Math.abs(movementSpeed.current) < 0.001){
    //     movementSpeed.current = 0;
    //   }
    //   ref.current.position.x -= movementSpeed.current;
    //   ref.current.rotation.z += movementSpeed.current * 3.5;
    //   //hacer variable isSpining o algo
    //   if(ref.current.position.x < props.position[0]){
    //     ref.current.position.x += 0.01;  
    //   }
    //   if(ref.current.position.x > props.position[0]){
    //     ref.current.position.x -= 0.01;  
    //   }
    // }

    //si no esta rotando y su posicion x no es la que deberia que vuelva
    // if(isRotating){
    //   ref.current.rotation.z -= 0.02;
    //   ref.current.position.x -= 0.02;
    //   console.log(props.position[0]);
    // }
    // if(!isRotating){
    //   if(ref.current.position.x < props.position[0]){
    //     ref.current.position.x += 0.02;
    //   }
    // }
    
  })

  useEffect(()=>{
    actions['Take 001'].play();
  }, [actions, isRotating])

  useEffect(()=>{
    const canvas = gl.domElement;

    const handlePointerMoveEvent = (e) => handlePointerMove(e);

    canvas.addEventListener('pointermove', handlePointerMoveEvent);

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMoveEvent);
    };

  },[gl, handlePointerMove])

  return (
    <mesh {...props} ref={ref}>
        <primitive object={scene}/>
    </mesh>
  )
}

export default Plane