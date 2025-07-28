# Frontend Code Documentation

## App.jsx
Main React component. Manages state for image upload, face detection, replacement selection, and swap logic. Contains event handlers and renders all UI components.

- `handleTargetUpload(file)`: Handles target image upload and triggers face detection.
- `handleReplacementUpload(faceIdx, e)`: Handles uploading a replacement face for a detected face.
- `handleSwapSubmit(e)`: Handles submitting the swap request for all selected faces.

## Components
- **FaceCanvas.jsx**: Renders the target image and overlays bounding boxes for detected faces.
- **FaceList.jsx**: Displays thumbnails of detected faces and allows uploading replacement images for each.
- **SwapResult.jsx**: Shows side-by-side comparison of original and swapped images.
- **UploadForm.jsx**: Handles uploading the target image and submitting the swap request.

All components use clear props and are documented with docblocks for maintainability.

---

# Backend Code Documentation

## api.py
Flask API for backend. Handles endpoints for face detection and multi-face swapping using InsightFace/inswapper.

- `/detect-faces` (POST): Detects faces in the uploaded image and returns bounding boxes and thumbnails.
- `/swap` (POST): Swaps selected faces in the target image using provided source images.

- `/docs/openapi.yaml` (GET): Serves the OpenAPI YAML spec for Swagger UI.
- `/swagger` (GET): Serves Swagger UI for interactive API docs.

## inswapper_utils.py
Utility functions for running InsightFace/inswapper face swap logic. Used by API endpoints for in-process model inference.

- `swap_faces_inswapper(target_img, source_img, face_index)`: Swaps a face in the target image with the source image using inswapper.

---

# How to Contribute
- All major functions and components should have docblocks.
- Update documentation in `docs/` when adding new features or endpoints.
- Keep code modular and maintainable.

---

## Backend API Usage Examples

### Detect Faces (Python requests)
```python
import requests
with open('target.jpg', 'rb') as f:
    resp = requests.post('http://localhost:5555/detect-faces', files={'image': f})
    print(resp.json())
```

### Swap Faces (Python requests)
```python
import requests
files = [
    ('target', open('target.jpg', 'rb')),
    ('source[]', open('face1.jpg', 'rb')),
    ('source[]', open('face2.jpg', 'rb')),
]
data = [
    ('face_index', '0'),
    ('face_index', '1'),
]
resp = requests.post('http://localhost:5555/swap', files=files, data=data)
with open('swapped.jpg', 'wb') as out:
    out.write(resp.content)
```

## API Documentation
- [Swagger UI](http://localhost:5555/swagger) (when backend is running)
- [OpenAPI Spec](../backend/docs/openapi.yaml)

## Related Docs
- [Architecture](architecture.md)
- [Product Description](product.md)
- [How to Run](how-to-run.md)
- [Mermaid Diagrams](mermaid-examples.md)
