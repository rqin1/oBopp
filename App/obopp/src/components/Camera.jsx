import React, { useEffect } from 'react';
import Webcam from "react-webcam";
import Cookies from 'js-cookie';
import Title from './Title';

export default function Camera() {

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };
   
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
   
    const capture = React.useCallback(
      () => {
        return webcamRef.current.getScreenshot();
      },
      [webcamRef]
    );

    const io = require("socket.io-client");
    useEffect(() => {
      const socket = io("https://obopp.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] })
      socket.emit('connectUser', Cookies.get('user-id'))
      const interval = setInterval(() => {
        socket.emit('webcam', capture())
      }, 100);
      return () => clearInterval(interval);
    }, [])


    return (
      <React.Fragment>
        <Title>Camera Capture</Title>
        <Webcam
            audio={false}
            height={1080/2}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1920/2}
            videoConstraints={videoConstraints}
          />
      </React.Fragment>
    );
  };

  return (WebcamCapture());
}