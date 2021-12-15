import { useEffect, useState } from 'react';
import Constants from '../constants/constants'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width: width,
      height: height,
      topoutline: Constants.glyphsize,
      rnavwidth: Constants.glyphsize,
      bottomoutline: Constants.glyphsize,
      lnavwidth: Constants.glyphsize
    };
  }


function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

  export default useWindowDimensions;
