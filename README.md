
# Face Swap Web

Author: kinncj

## Technologies Used
- React (Vite)
- face-api.js (frontend face detection)
- InsightFace/inswapper (backend face swapping)
- Flask (Python backend API)
- OpenCV (image processing)
- ONNX (model format)

## Features
- Upload a target image and detect multiple faces
- Interactive UI: select and upload replacement faces for each detected face
- Backend-driven, ultra-realistic face swapping (no training required)
- Per-face replacement, multi-face support
- Responsive, modern UI with canvas visualization
- Side-by-side comparison of original and swapped images


# Face Swap Web

Photorealistic, multi-face swap web app powered by React, Vite, Flask, and InsightFace/inswapper. Modern UI, no model training required.

**Author:** kinncj

---

## 🚀 Features
- Upload a target image and detect multiple faces
- Interactive UI: select and upload replacement faces for each detected face
- Backend-driven, ultra-realistic face swapping (no training required)
- Per-face replacement, multi-face support
- Responsive, modern dark UI with canvas visualization
- Side-by-side comparison of original and swapped images

## 🛠 Technologies
- React (Vite)
- face-api.js (frontend face detection)
- InsightFace/inswapper (backend face swapping)
- Flask (Python backend API)
- OpenCV (image processing)
- ONNX (model format)

## 📚 Documentation
- [Architecture](docs/architecture.md)
- [Product Description](docs/product.md)
- [How to Run](docs/how-to-run.md)
- [Code Documentation](docs/code-documentation.md)
- [Mermaid Diagrams](docs/mermaid-examples.md)
- [License](docs/license.md)
- [OpenAPI Spec](backend/docs/openapi.yaml)


## 🔗 API Reference
- **Swagger UI:** [http://localhost:5555/swagger](http://localhost:5555/swagger) (when backend is running)
- **OpenAPI Spec:** [backend/docs/openapi.yaml](backend/docs/openapi.yaml)

## 🌐 Configuring Backend URL
The frontend uses an environment variable called `VITE_BACKEND_URL` to set the backend API URL. By default, it uses `http://localhost:5555`.

### How to set a custom backend URL
Create a `.env` file in the project root and add:
```env
VITE_BACKEND_URL=https://your-backend-url.com
```
Or set it in your shell before running the dev server:
```bash
export VITE_BACKEND_URL=https://your-backend-url.com
npm run dev
```

### Example: Detect Faces
```bash
curl -X POST -F "image=@target.jpg" $VITE_BACKEND_URL/detect-faces
```

### Example: Swap Faces
```bash
curl -X POST \
  -F "target=@target.jpg" \
  -F "source[]=@face1.jpg" \
  -F "source[]=@face2.jpg" \
  -F "face_index=0" \
  -F "face_index=1" \
  $VITE_BACKEND_URL/swap --output swapped.jpg
```

## 🖼️ Diagrams
- See [docs/architecture.md](docs/architecture.md) and [docs/mermaid-examples.md](docs/mermaid-examples.md) for system, data flow, and sequence diagrams.

## 🤝 Contributing
- All major functions and components should have docblocks.
- Update documentation in `docs/` when adding new features or endpoints.
- Keep code modular and maintainable.

## 👤 Author
kinncj

---
For more details, see the code, comments, and documentation in the repository.
