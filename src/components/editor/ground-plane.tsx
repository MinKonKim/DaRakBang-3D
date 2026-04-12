export const GroundPlane = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
      raycast={() => null}
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
    </mesh>
  )
}
