/**
 * SwapResult Component
 * Shows side-by-side comparison of original and swapped images.
 * Props:
 *   originalImage: string (URL of original image)
 *   swappedImage: string (URL of swapped result)
 */
import React from 'react';
export default function SwapResult({ originalImage, swappedImage }) {
  if (!swappedImage) return null;
  return (
    <div className="card" style={{ marginBottom: 32 }}>
      <div className="section-title">Original vs Swapped</div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: '#eaeaea', marginBottom: 4 }}>Original</div>
          {originalImage && (
            <img src={originalImage} alt="Original" style={{ width: '100%', maxWidth: 400, border: '2px solid #eebc1d', borderRadius: 8 }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: '#ff6a3d', marginBottom: 4 }}>Swapped</div>
          <img
            src={swappedImage}
            alt="Swapped Result"
            style={{ width: '100%', maxWidth: 400, border: '2px solid #ff6a3d', borderRadius: 8, cursor: 'pointer' }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = swappedImage;
              link.download = 'swapped-face.jpg';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            title="Click to download"
          />
        </div>
      </div>
    </div>
  );
}
