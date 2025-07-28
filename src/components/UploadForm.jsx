/**
 * UploadForm Component
 * Handles uploading the target image and submitting the swap request.
 * Props:
 *   onTargetUpload: function (handler for target image upload)
 *   onSwapSubmit: function (handler for swap submit)
 *   swapLoading: boolean (loading state)
 *   targetFile: File (current target image file)
 */
import React from 'react';
export default function UploadForm({ onTargetUpload, onSwapSubmit, swapLoading, targetFile }) {
  return (
    <form onSubmit={onSwapSubmit} style={{ marginBottom: 24 }}>
      <div className="card" style={{ marginBottom: 0 }}>
        <label className="section-title" htmlFor="target-upload" style={{ width: 140 }}>Target Image:</label>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
          <input
            id="target-upload"
            type="file"
            accept="image/*"
            className="input"
            onChange={e => onTargetUpload(e.target.files?.[0])}
            required
            style={{ width: 200, height: 60 }}
          />
          <button type="submit" className="button" disabled={swapLoading || !targetFile} style={{ height: 60 }}>
            {swapLoading ? 'Swapping...' : 'Swap Faces'}
          </button>
        </div>
      </div>
    </form>
  );
}
