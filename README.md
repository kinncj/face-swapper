
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

### Example: Detect Faces
```bash
curl -X POST -F "image=@target.jpg" http://localhost:5555/detect-faces
```

### Example: Swap Faces
```bash
curl -X POST \
  -F "target=@target.jpg" \
  -F "source[]=@face1.jpg" \
  -F "source[]=@face2.jpg" \
  -F "face_index=0" \
  -F "face_index=1" \
  http://localhost:5555/swap --output swapped.jpg
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
