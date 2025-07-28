/**
 * FaceList Component
 * Displays thumbnails of detected faces and allows uploading replacement images for each.
 * Props:
 *   faces: array (detected face objects)
 *   replacements: object (mapping face index to replacement image)
 *   onReplacementUpload: function (handler for uploading replacement)
 */
import React from 'react';
export default function FaceList({ faces, replacements, onReplacementUpload }) {
  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {faces.map(face => (
        <div key={face.index} className="card" style={{ alignItems: 'center', minWidth: 120 }}>
          <div className="section-title">Face {face.index + 1}</div>
          <button
            className="button"
            style={{ cursor: 'pointer', marginBottom: 6, borderRadius: 8, padding: 0, background: 'transparent', fontWeight: 600, fontSize: '1rem' }}
            onClick={() => document.getElementById(`replace-face-${face.index}`).click()}
          >
            {face.face_b64 && (
              <img
                src={`data:image/jpeg;base64,${face.face_b64}`}
                alt={`Detected face ${face.index + 1}`}
                width={48}
                height={48}
                style={{ objectFit: 'cover', borderRadius: 8, border: '2px solid #eebc1d' }}
              />
            )}
          </button>
          <input
            id={`replace-face-${face.index}`}
            type="file"
            accept="image/*"
            onChange={e => onReplacementUpload(face.index, e)}
            style={{ marginBottom: 8, display: 'none' }}
          />
          {replacements[face.index]?.url && (
            <img src={replacements[face.index].url} alt={`Replacement for face ${face.index + 1}`} width={40} height={40} style={{ objectFit: 'cover', borderRadius: 6, border: '1px solid #ff6a3d', marginTop: 4 }} />
          )}
        </div>
      ))}
    </div>
  );
}
