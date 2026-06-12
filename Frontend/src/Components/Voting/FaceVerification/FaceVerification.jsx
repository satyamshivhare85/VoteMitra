import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import * as faceapi from 'face-api.js';
import ResultOverlay from "../Overlay/Overlay";
import { useNavigate } from "react-router-dom";

function FaceVerification() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [statusText, setStatusText] = useState("Waiting to start verification...");
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const [resultState, setResultState] = useState({
    isVisible: false,
    isSuccess: false,
    data: {}
  });

  const speak = (msg) => {
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      synth.speak(new SpeechSynthesisUtterance(msg));
    } catch (e) { console.error("Speech error:", e); }
  };

  // --- Updated Logic: Handle Verification Success ---
  const handleVerificationSuccess = (token) => {
    try {
      // Store the token from the backend
      sessionStorage.setItem("token", token);
      
      speak("Verification successful. Redirecting to voting page.");
      navigate("/booth");
    } catch (err) {
      console.error("Token storage error:", err);
      speak("System error. Please try again.");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights";
      setStatusText("Loading essential models...");
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        setStatusText("✅ Models loaded. Ready to verify.");
        speak("Models loaded. Ready for face verification.");
      } catch (err) {
        console.error(err);
        setStatusText("❌ Failed to load models.");
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
      
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      setCameraActive(true);
      
      setStatusText("📸 Camera ready for face verification.");
      speak("Camera ready. Please look straight into the camera.");
      return true;
    } catch (err) {
      console.error("Camera error:", err);
      setStatusText("Camera access denied.");
      speak("Camera access denied. Please enable camera permissions.");
      return false;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    
    setCameraActive(false);
    setShowScanner(false);
  };

  const drawDetectionBox = (detection, ctx) => {
    if (!detection) return;
    const box = detection.detection.box;
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
  };

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
    } catch(e) {
      return 'unknown';
    }
  };

  const performLivenessCheck = async () => {
    const ctx = canvasRef.current.getContext("2d");
    const baseMovements = ['left', 'right'];
    const movements = [];
    for (let i = 0; i < 4; i++) {
      movements.push(baseMovements[Math.floor(Math.random() * baseMovements.length)]);
    }

    await new Promise(r => setTimeout(r, 750));

    for (const move of movements) {
      const command = move === 'left' ? 'right' : 'left';
      setStatusText(`Liveness Check: Please look ${command}`);
      speak(`Please look ${command}`);
      
      let poseDetected = false;
      const maxAttempts = 50; 
      let attempt = 0;

      while (attempt < maxAttempts && !poseDetected) {
        attempt++;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();
        
        if (detection) {
          drawDetectionBox(detection, ctx);
          const pose = getHeadPose(detection.landmarks);
          
          if (pose === move) {
            setStatusText(`✅ ${command} detected!`);
            speak(`${command} detected.`);
            poseDetected = true;
            await new Promise(r => setTimeout(r, 750));
          } else if ((move === 'left' && pose === 'right') || (move === 'right' && pose === 'left')) {
            setStatusText(`❌ Liveness check failed. Wrong direction.`);
            speak(`Liveness check failed. Please look ${command}.`);
            attempt = maxAttempts; 
          }
        }
        await new Promise(r => setTimeout(r, 200));
      }

      if (!poseDetected) {
        setStatusText(`❌ Liveness check failed.`);
        speak(`Liveness check failed. Please try again.`);
        return false; 
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    setStatusText("✅ Liveness check successful!");
    return true;
  };

  const showResult = (isSuccess, data) => {
    setResultState({ isVisible: true, isSuccess, data });
  };

  const verifyFace = async () => {
    if (!modelsLoaded) {
      setModalMessage("Please wait, essential models are still loading...");
      return;
    }

    setIsProcessing(true);
    const cameraStarted = await startCamera();
    if (!cameraStarted) {
      setIsProcessing(false);
      return;
    }

    const livenessPassed = await performLivenessCheck();
    if (!livenessPassed) {
      stopCamera();
      setIsProcessing(false);
      return;
    }

    setShowScanner(true);
    setStatusText("🔍 Scanning your face...");

    let detected = null;
    for (let i = 0; i < 20; i++) {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection && detection.descriptor) {
        detected = detection.descriptor;
        break;
      }
      await new Promise(r => setTimeout(r, 200));
    }

    if (!detected) {
      setStatusText("❌ No face detected.");
      stopCamera();
      setIsProcessing(false);
      return;
    }

    setStatusText("🧠 Matching face with database...");
    
    try {
      const res = await axios.post(
        "http://localhost:8000/api/vote",
        { face: Array.from(detected) },
        { headers: { "Content-Type": "application/json" } }
      );

      // Assuming your backend returns { success: true, token: "..." }
      if (res.data.success && res.data.token) {
        handleVerificationSuccess(res.data.token);
      } else if (res.data.voted) {
        speak("You have already voted.");
        showResult(false, { message: "⚠️ You have already voted!" });
        setTimeout(() => {
          setResultState({ isVisible: false, isSuccess: false, data: {} });
          stopCamera();
          setIsProcessing(false);
        }, 3000);
      } else {
        throw new Error("Access denied");
      }
    } catch (err) {
      console.error(err);
      speak("Verification failed.");
      showResult(false, { message: "Verification failed." });
      setTimeout(() => {
        setResultState({ isVisible: false, isSuccess: false, data: {} });
        stopCamera();
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    // ... JSX remains unchanged to maintain your existing layout
    <>
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
          <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <p className="mb-4 text-lg">{modalMessage}</p>
            <button 
              onClick={() => setModalMessage(null)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div 
        id="verification-container" 
        className={`bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl border border-gray-700 transition-opacity duration-500 ${resultState.isVisible ? 'opacity-0' : 'opacity-100'}`}
      >
        <h1 className="text-3xl font-bold text-center text-red-400 mb-4">Smart Voting System</h1>

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

        <button 
          onClick={verifyFace}
          disabled={isProcessing}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Give Vote"}
        </button>

        <p className="text-center text-sm text-red-400 mt-4 h-5">{statusText}</p>
      </div>

      <ResultOverlay resultState={resultState} />
    </>
  );
}

export default FaceVerification;