# Architecture

This project is a full-stack face swap web application using modern web and AI technologies.

## Overview
- **Frontend:** React (Vite), face-api.js for face detection, canvas for visualization.
- **Backend:** Flask (Python), InsightFace/inswapper for face swapping, OpenCV for image processing.
- **Model:** ONNX format, inswapper_128.onnx.

## Data Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Model
    User->>Frontend: Upload target image
    Frontend->>Backend: POST /detect-faces
    Backend->>Model: Detect faces
    Model-->>Backend: Bounding boxes
    Backend-->>Frontend: Face data (boxes, thumbnails)
    User->>Frontend: Upload replacement faces
    Frontend->>Backend: POST /swap
    Backend->>Model: Swap faces
    Model-->>Backend: Swapped image
    Backend-->>Frontend: Swapped image
    Frontend-->>User: Show result
```

## Deployment Diagram
```mermaid
flowchart TD
    subgraph Frontend
        A[React App] -->|API Calls| B[Browser]
    end
    subgraph Backend
        C[Flask API] --> D[InsightFace/inswapper]
        C --> E[OpenCV]
        C --> F[Swagger UI]
        C --> G[OpenAPI Spec]
    end
    B -->|HTTP| C
    F -->|Docs| G
```

## API Documentation
- [Swagger UI](http://localhost:5555/swagger) (when backend is running)
- [OpenAPI Spec](../backend/docs/openapi.yaml)

## Related Docs
- [Product Description](product.md)
- [How to Run](how-to-run.md)
- [Code Documentation](code-documentation.md)
- [Mermaid Diagrams](mermaid-examples.md)

---
For more details, see the [README](../README.md) and other docs in this folder.
