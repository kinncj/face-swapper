

/**
 * Main App component for Face Swap Web
 * Handles image upload, face detection, per-face replacement, and swap logic.
 * UI is modular and uses modern dark design.
 */
import React, { useState } from 'react';

// Use BACKEND_URL from environment, fallback to localhost
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5555';
import './App.css';
import { Group, Notification } from '@mantine/core';
import FaceCanvas from './components/FaceCanvas';
import FaceList from './components/FaceList';
import SwapResult from './components/SwapResult';
import UploadForm from './components/UploadForm';

/**
 * App - Main React component for the face swap application.
 * Manages state and event handlers for image upload, face detection, and swapping.
 */
function App() {
  const [targetImage, setTargetImage] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [replacements, setReplacements] = useState({});
  const [swapResult, setSwapResult] = useState(null);
  const [swapLoading, setSwapLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mantine FileInput expects file object directly
  /**
   * Handles uploading the target image and triggers face detection.
   * @param {File} file - The uploaded image file.
   */
  function handleTargetUpload(file) {
    if (file) {
      setSwapResult(null);
      setReplacements({});
      setTargetFile(file);
      const url = URL.createObjectURL(file);
      setTargetImage(url);
      const formData = new FormData();
      formData.append('image', file);
      fetch(`${BACKEND_URL}/detect-faces`, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => setDetectedFaces(data.faces || []))
        .catch(err => {
          setError('Face detection failed: ' + err.message);
          setDetectedFaces([]);
        });
    }
  }

  // Handle uploading a replacement face for a given detected face
  /**
   * Handles uploading a replacement face for a detected face.
   * @param {number} faceIdx - Index of the detected face.
   * @param {Event} e - File input change event.
   */
  function handleReplacementUpload(faceIdx, e) {
    // Mantine FileInput still uses native input under the hood
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setReplacements(prev => ({ ...prev, [faceIdx]: { file, url } }));
    }
  }

  /**
   * Handles submitting the swap request for all selected faces.
   * Sends requests to backend and updates swap result.
   * @param {Event} e - Form submit event.
   */
  async function handleSwapSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!targetFile) {
      setError('Please select a target image.');
      return;
    }
    if (detectedFaces.length === 0) {
      setError('No faces detected in target image.');
      return;
    }
    const replacementIndices = Object.keys(replacements).map(Number).filter(idx => replacements[idx]?.file);
    if (replacementIndices.length === 0) {
      setError('Please upload at least one replacement face.');
      return;
    }
    setSwapLoading(true);
    setSwapResult(null);

    let currentTargetFile = targetFile;
    let currentTargetUrl = targetImage;
    let lastBlob = null;

    for (let i = 0; i < replacementIndices.length; i++) {
      const faceIdx = replacementIndices[i];
      const formData = new FormData();
      if (lastBlob) {
        formData.append('target', lastBlob, 'swap.png');
      } else {
        formData.append('target', currentTargetFile);
      }
      formData.append('source[]', replacements[faceIdx].file);
      formData.append('face_index', faceIdx);
      try {
        const res = await fetch(`${BACKEND_URL}/swap`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Swap failed');
        lastBlob = await res.blob();
        currentTargetUrl = URL.createObjectURL(lastBlob);
      } catch (err) {
        setError('Face swap failed at face ' + (faceIdx + 1) + ': ' + err.message);
        setSwapLoading(false);
        return;
      }
    }
    if (lastBlob) {
      setSwapResult(currentTargetUrl);
    }
    setSwapLoading(false);
  }

  /**
   * Renders the main app UI, including upload, face detection, replacement, and swap result.
   */
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
      <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="header" style={{ textAlign: 'center' }}>Face Swap Web</div>
        {error && (
          <Notification color="red" title="Error" onClose={() => setError(null)} mb={16}>
            {error}
          </Notification>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%' }}>
            {targetImage && (
              <>
                <div className="section-title" style={{ textAlign: 'center' }}>Detected Faces</div>
                {/* <FaceCanvas image={targetImage} faces={detectedFaces} /> */}
                {detectedFaces.length > 0 && (
                  <FaceList
                    faces={detectedFaces}
                    replacements={replacements}
                    onReplacementUpload={handleReplacementUpload}
                  />
                )}
              </>
            )}
            <SwapResult originalImage={targetImage} swappedImage={swapResult} />
          </div>
          <UploadForm
            onTargetUpload={handleTargetUpload}
            onSwapSubmit={handleSwapSubmit}
            swapLoading={swapLoading}
            targetFile={targetFile}
          />
        </div>
      </div>
    </div>
  );
}

export default App;