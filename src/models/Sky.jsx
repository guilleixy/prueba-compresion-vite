import { useGLTF } from "@react-three/drei"
import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"

import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating }) => {
    const sky = useGLTF(skyScene)
    const skyRef = useRef();

    useFrame((_, delta)=>{
      if(isRotating){
        skyRef.current.rotation.y += 0.10 * delta
      }
      skyRef.current.rotation.y += 0.01 * delta
      skyRef.current.rotation.x += 0.001 * delta
    })

  return (
    <mesh ref={skyRef}>  
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky
