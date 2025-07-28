/**
 * FaceCanvas Component
 * Renders the target image and overlays bounding boxes for detected faces.
 * Props:
 *   image: string (URL of the target image)
 *   faces: array (detected face objects with box and index)
 */
import React, { useEffect, useRef } from 'react';
export default function FaceCanvas({ image, faces }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image || faces.length === 0) return;
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      let displayWidth = img.naturalWidth;
      let displayHeight = img.naturalHeight;
      if (displayWidth > 800) {
        displayHeight = Math.round((800 / displayWidth) * displayHeight);
        displayWidth = 800;
      }
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      canvas.style.width = '100%';
      canvas.style.maxWidth = '800px';
      canvas.style.height = 'auto';
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scaleX = canvas.width / img.naturalWidth;
      const scaleY = canvas.height / img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      faces.forEach(face => {
        const [x1, y1, x2, y2] = face.box;
        const sx1 = x1 * scaleX;
        const sy1 = y1 * scaleY;
        const sx2 = x2 * scaleX;
        const sy2 = y2 * scaleY;
        ctx.strokeStyle = '#eebc1d';
        ctx.lineWidth = 2;
        ctx.strokeRect(sx1, sy1, sx2 - sx1, sy2 - sy1);
        ctx.font = '16px Inter, Arial, sans-serif';
        ctx.fillStyle = '#ff6a3d';
        ctx.fillText(`Face ${face.index + 1}`, sx1, sy1 - 5);
      });
    };
  }, [image, faces]);

  return (
    <div className="card" style={{ marginBottom: 8 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', maxWidth: 800, height: 'auto', borderRadius: 12 }}
      />
    </div>
  );
}
