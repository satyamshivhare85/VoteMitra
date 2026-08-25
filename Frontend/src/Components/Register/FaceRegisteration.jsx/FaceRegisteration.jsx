import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import axios from "axios";

const FRAMES_TOTAL = 50;

function FaceRegistration() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  //states

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [statusText, setStatusText] = useState("Waiting to start...");
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aadharId, setAadharId] = useState("");
  const [modalMessage, setModalMessage] = useState(null);

  const speak = (msg) => {
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      synth.speak(new SpeechSynthesisUtterance(msg));
    } catch (e) {
      console.error("Speech error:", e);
    }
  };

  useEffect(() => {
    //models
    const loadModels = async () => {
        //face api
      const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights";
      try {
        setStatusText("Loading models...");
        //all models.... load
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        setStatusText(" Models loaded. Ready.");
        speak("Models loaded. Ready to start registration.");
      } catch (error) {
        setStatusText(" Failed to load models.");
        console.error("Model loading error:", error);
      }
    };
    loadModels();
  }, []);



  const startCamera = async () => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      
      await new Promise(resolve => videoRef.current.onloadedmetadata = resolve);
      setCameraActive(true);
      
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      //CAMERA START
      setStatusText(" Camera ready.");
      speak("Camera ready.");
      return true;
    } catch (err) {
      console.error("Camera error:", err);
      setStatusText(" Camera access denied.");
      speak("Camera access denied. Please enable camera permission.");
      streamRef.current = null;
      return false;
    }
  };

  const drawDetectionBox = (detection, ctx) => {
    if (!detection) return;
    const box = detection.detection.box;
    ctx.strokeStyle = "#16A34A";
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
  };

  const drawOverlay = (frameNum, ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`Frame ${frameNum + 1} / ${FRAMES_TOTAL}`, 10, 30);
  };


  //nose posn eye jaw etc

  const getHeadPose = (landmarks) => {
    try {
      const nose = landmarks.getNose()[3];
      const jawLeft = landmarks.getJawOutline()[0];
      const jawRight = landmarks.getJawOutline()[16];
      const leftEyeCorner = landmarks.getLeftEye()[0];
      const rightEyeCorner = landmarks.getRightEye()[5];

      const noseToLeftJawDist = Math.abs(nose.x - jawLeft.x);
      const noseToRightJawDist = Math.abs(nose.x - jawRight.x);
      const noseToLeftEyeDist = Math.abs(nose.x - leftEyeCorner.x);
      const noseToRightEyeDist = Math.abs(nose.x - rightEyeCorner.x);

      const jawRatio = noseToLeftJawDist / (noseToRightJawDist + 1e-5);
      const eyeRatio = noseToLeftEyeDist / (noseToRightEyeDist + 1e-5);

      if (jawRatio > 2.0 && eyeRatio > 1.8) return 'right';
      if (jawRatio < 0.5 && eyeRatio < 0.6) return 'left';
      if (jawRatio > 0.8 && jawRatio < 1.2 && eyeRatio > 0.8 && eyeRatio < 1.2) return 'straight';
      
      return 'moving';
    } catch (e) {
      console.error("Error getting pose:", e);
      return 'unknown';
    }
  };


  //liveness check
  const performLivenessCheck = async () => {
    const ctx = canvasRef.current.getContext("2d");
    const baseMovements = ['left', 'right'];
    const movements = [];
    for (let i = 0; i < 4; i++) {
      movements.push(baseMovements[Math.floor(Math.random() * baseMovements.length)]);
    }

    for (const move of movements) {
      const command = move === 'left' ? 'right' : 'left';
      setStatusText(`Liveness Check: Please look ${command}`);
      speak(`Please look ${command}`);
      
      let poseDetected = false;
      const maxAttempts = 80;
      let attempt = 0;

      while (attempt < maxAttempts && !poseDetected) {
        attempt++;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        


        // FACE DETECTION ENGINE and liveness checl


       const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();
        
        if (detection) {
          drawDetectionBox(detection, ctx);
          const pose = getHeadPose(detection.landmarks);
          

          //liveness
          if (pose === move) { 
            setStatusText(` ${command} detected!`);
            speak(`${command} detected.`);
            poseDetected = true;
            await new Promise(r => setTimeout(r, 2000));
          } else if ((move === 'left' && pose === 'right') || (move === 'right' && pose === 'left')) {
            setStatusText(` Liveness check failed. Wrong direction.`);
            speak(`Liveness check failed. Please look ${command}.`);
            attempt = maxAttempts; 
          }
        } else {
            setStatusText(`Liveness Check: Please look ${command}`);
        }
        await new Promise(r => setTimeout(r, 100));
      }

      if (!poseDetected) {
        setStatusText(`Liveness check failed. Could not detect ${command}.`);
        speak(`Liveness check failed. Could not detect ${command}. Please try again.`);
        return false;
      }
    }
    
    setStatusText(" Liveness check successful!");
    speak("Liveness check successful. Starting registration.");
    return true;
  };



  const startFrameCapture = async (aadhar) => {
    setShowScanner(true);
    setProgress(0);
    const ctx = canvasRef.current.getContext("2d");
    const faces = [];
    let descriptorLength = null;

    for (let i = 0; i < FRAMES_TOTAL; i++) {
      let detected = null;
      const maxAttempts = 10;
      let attempt = 0;
      let detectionResult = null;

      while (attempt < maxAttempts && !detected) {
        attempt++;
        drawOverlay(i, ctx);

        detectionResult = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detectionResult) {
          drawDetectionBox(detectionResult, ctx);
        }

        if (detectionResult && detectionResult.descriptor) {
            detected = detectionResult.descriptor;
        } else if (!detectionResult) {
            setStatusText(`No face detected. Please position your face (${i+1}/${FRAMES_TOTAL})`);
        }
        
        await new Promise(r => setTimeout(r, 200));
      }

      if (!detected) {
        setStatusText("❌ Couldn't detect face reliably. Try again.");
        speak("Couldn't detect face reliably. Please position your face in the camera and try again.");
        stopCamera();
        return;
      }

      if (!descriptorLength) descriptorLength = detected.length;
      if (detected.length !== descriptorLength) { i--; continue; } 

      faces.push(Array.from(detected));
      setProgress(((i + 1) / FRAMES_TOTAL) * 100);
      setStatusText(`✅ Captured frame ${i+1}/${FRAMES_TOTAL}`);
    }

    await saveFaces(aadhar, faces);
    stopCamera();
  };

  const registerFace = async () => {
    if (!modelsLoaded) {
      setModalMessage("Please wait, models are still loading...");
      speak("Please wait, models are still loading.");
      return;
    }

    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(aadharId)) {
      setStatusText("⚠️ Please enter a valid 12-digit Aadhar ID.");
      speak("Please enter a valid 12-digit Aadhar ID.");
      return;
    }

    setIsProcessing(true);
    const cameraStarted = await startCamera();
    if (!cameraStarted) {
      setIsProcessing(false);
      return;
    }


    //liveness check

    const livenessPassed = await performLivenessCheck();

    if (livenessPassed) {
      await startFrameCapture(aadharId);
    } else {
      stopCamera();
    }
  };



//THIS REQUEST WILL GO TO BACKEND NOW AND MOVE FORWARD TO AUTO DOWNLOAD THREE MODELS---> TO PRETRAINED MODELS

const saveFaces = async (aadhar, faces) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/register",
      { aadhar, faces }
    );

    if (res.data.success) {
      setStatusText("✅ Registration successful!");
      speak("Registration successful");
      return;
    }

  } catch (err) {
    console.log("Save error:", err);

    const code = err.response?.data?.code;

    if (code === "FACE_DUPLICATE") {
      setStatusText("⚠️ Duplicate face detected. Registration stopped.");
      speak("Duplicate face detected");
    } 
    else if (code === "AADHAR_DUPLICATE") {
      setStatusText("⚠️ Aadhar already registered.");
      speak("Aadhar already registered");
    } 
    else {
      setStatusText("❌ Server error. Please try again.");
      speak("Server error");
    }
  }
};
  const stopCamera = () => {
    setShowScanner(false);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    
    setCameraActive(false);
    setProgress(0);
    setAadharId("");
    setIsProcessing(false);
  };



  return (
    <>
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
            <p className="mb-4">{modalMessage}</p>
            <button 
              onClick={() => setModalMessage(null)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Register Yourself as a Voter</h1>

        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
          {showScanner && <div className="absolute inset-0"><div className="scanner-line"></div></div>}
          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-gray-300">
              Camera Off
            </div>
          )}
        </div>

        <input 
          type="text" 
          placeholder="Enter 12-Digit Aadhar ID"
          maxLength="12"
          pattern="\d{12}"
          inputMode="numeric"
          autoComplete="off"
          value={aadharId}
          onChange={(e) => setAadharId(e.target.value)}
          disabled={isProcessing}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 disabled:opacity-50" 
        />

        <button 
          onClick={registerFace}
          disabled={isProcessing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
        >
          Start Registration
        </button>

        <div className="mt-4">
          {(progress > 0 || showScanner) && (
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          <p className="text-center text-sm text-green-400 mt-2">{statusText}</p>
        </div>
      </div>
    </>
  );
}

export default FaceRegistration;

