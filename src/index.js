
import React, { useRef, useState } from 'react';

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sector, setSector] = useState('general');
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getOverlayPath = () => `/marcos/${sector}.png`;

  const applyOverlay = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const baseImage = new Image();
    const overlay = new Image();

    baseImage.src = previewUrl;
    overlay.src = getOverlayPath();

    baseImage.onload = () => {
      canvas.width = 800;
      canvas.height = 800;
      ctx.drawImage(baseImage, 0, 0, 800, 800);
      overlay.onload = () => {
        ctx.drawImage(overlay, 0, 0, 800, 800);
      };
    };
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = `foto_espasa_${sector}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Foto institucional ESPASA VW</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

      <select value={sector} onChange={(e) => setSector(e.target.value)} className="mb-4">
        <option value="general">General</option>
      </select>

      <button onClick={applyOverlay} className="bg-blue-600 text-white px-4 py-2 rounded">Aplicar marco</button>
      <div className="my-4">
        <canvas ref={canvasRef} className="border mx-auto"></canvas>
      </div>
      <button onClick={downloadImage} className="bg-green-600 text-white px-4 py-2 rounded">Descargar imagen</button>
    </div>
  );
}
