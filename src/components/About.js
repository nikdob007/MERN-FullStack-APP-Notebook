import React, { useContext, useEffect } from 'react'
import noteContext from '../context/noteContext'

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      this is {a.state.name} and {a.state.class}
    </div>
  )
}

export default About
