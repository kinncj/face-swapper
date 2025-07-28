<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

Face Swap Web is a modern, user-friendly Vite + React app for photorealistic face swapping. Users can upload a photo, detect multiple faces, and swap any face with a replacement image. The app uses face-api.js for detection and a Flask backend powered by InsightFace/inswapper for ultra-realistic swaps. All logic is in JavaScript (frontend) and Python (backend).

Key Features:
- Multi-face detection and selection
- Per-face replacement with preview
- Backend-driven, ultra-realistic swaps
- Responsive, intuitive interface
- Side-by-side comparison of original and swapped images

Architecture:
- Frontend: React (Vite), face-api.js, modular components, modern dark UI
- Backend: Flask, InsightFace/inswapper, OpenCV
- Model: inswapper_128.onnx (ONNX format)

Documentation:
- All major functions and components have docblocks
- Comprehensive docs in /docs (architecture, product, how-to-run, license, mermaid diagrams, code-documentation)

Deployment:
- Ready for GitHub Pages (frontend)
- Backend runs as a Flask server
