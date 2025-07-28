# How to Run

## Prerequisites
- Node.js & npm
- Python 3.8+
- All dependencies listed in `package.json` and `requirements.txt`
- Download `inswapper_128.onnx` model to `backend/models/`

## Steps
1. Install frontend dependencies:
   ```bash
   npm install
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Start backend server:
   ```bash
   cd backend
   FLASK_APP=api.py flask run --host=0.0.0.0 --port=5555
   ```
4. Start frontend dev server:
   ```bash
   npm run dev
   ```
5. Open the app in your browser at `http://localhost:5173`

## Notes
- For production, build the frontend and deploy to GitHub Pages or similar.
- Backend must be running for swaps to work.

---

## Docker Usage
- Build and run containers for backend and frontend:
  ```bash
  # Build backend container
  docker build -t faceswap-backend ./backend
  docker run -p 5555:5555 faceswap-backend

  # Build frontend container
  docker build -t faceswap-ui .
  docker run -p 80:80 faceswap-ui
  ```

- See Makefile for automated commands.


## API Documentation
- [Swagger UI](http://localhost:5555/swagger) (when backend is running)
- [OpenAPI Spec](../backend/docs/openapi.yaml)

## Custom Backend URL
The frontend uses the `VITE_BACKEND_URL` environment variable to set the backend API URL. Default is `http://localhost:5555`.

To use a different backend URL, create a `.env` file in the project root:
```env
VITE_BACKEND_URL=https://your-backend-url.com
```
Or set it in your shell before running:
```bash
export VITE_BACKEND_URL=https://your-backend-url.com
npm run dev
```

## Related Docs
- [Architecture](architecture.md)
- [Product Description](product.md)
- [Code Documentation](code-documentation.md)
- [Mermaid Diagrams](mermaid-examples.md)
