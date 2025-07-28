# Mermaid Diagram Examples

## Architecture Flowchart
```mermaid
flowchart TD
    A[User Uploads Image] --> B[Frontend Detects Faces]
    B --> C[User Selects Replacement]
    C --> D[Frontend Sends to Backend]
    D --> E[Backend Swaps Faces]
    E --> F[Frontend Shows Result]
```

## Sequence Diagram
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    U->>F: Upload image
    F->>B: /detect-faces
    B-->>F: Face data
    U->>F: Upload replacement
    F->>B: /swap
    B-->>F: Swapped image
    F-->>U: Show result
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

---

## Related Docs
- [Architecture](architecture.md)
- [Product Description](product.md)
- [How to Run](how-to-run.md)
- [Code Documentation](code-documentation.md)
