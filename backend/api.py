"""
API for Face Swap Web backend.
Handles endpoints for face detection and multi-face swapping using InsightFace/inswapper.
"""


import os
import sys
import uuid
import cv2
import numpy as np
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from insightface.app import FaceAnalysis
from flask import Flask, request, jsonify, send_file
app = Flask(__name__)
CORS(app)


# Endpoint to detect faces in an uploaded image and return bounding boxes

# Serve Swagger UI

# Serve OpenAPI YAML spec for Swagger UI
@app.route('/docs/openapi.yaml', methods=['GET'])
def serve_openapi_yaml():
    """
    GET /docs/openapi.yaml
    Serves the OpenAPI YAML spec for Swagger UI.
    """
    spec_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'docs', 'openapi.yaml'))
    try:
        return send_file(spec_path, mimetype='text/yaml')
    except Exception:
        # Fallback: read and return file contents
        with open(spec_path, 'r') as f:
            return f.read(), 200, {'Content-Type': 'text/yaml'}

# Serve Swagger UI
@app.route('/swagger', methods=['GET'])
def swagger_ui():
    """
    GET /swagger
    Serves Swagger UI for the Face Swap Web API using the OpenAPI spec.
    """
    swagger_html = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Face Swap Web API - Swagger UI</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            url: '/docs/openapi.yaml',
            dom_id: '#swagger-ui',
            presets: [SwaggerUIBundle.presets.apis],
            layout: 'BaseLayout',
          });
        };
      </script>
    </body>
    </html>
    '''
    return swagger_html, 200, {'Content-Type': 'text/html'}
@app.route('/detect-faces', methods=['POST'])
def detect_faces():
    """
    POST /detect-faces
    Detects faces in the uploaded image and returns bounding boxes and thumbnails.
    Request: multipart/form-data with 'image' field.
    Response: JSON with list of faces and their bounding boxes.
    """
    img_file = request.files['image']
    img_bytes = img_file.read()
    npimg = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    app_insight = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
    app_insight.prepare(ctx_id=0, det_size=(640, 640))
    faces = app_insight.get(img)
    import base64
    results = []
    for i, face in enumerate(faces):
        x1, y1, x2, y2 = [int(v) for v in face.bbox]
        face_crop = img[y1:y2, x1:x2]
        _, buf = cv2.imencode('.jpg', face_crop)
        face_b64 = base64.b64encode(buf).decode('utf-8')
        results.append({
            'index': i,
            'box': [x1, y1, x2, y2],
            'face_b64': face_b64
        })
    return jsonify({'faces': results})


@app.route('/swap', methods=['POST'])
def swap():
    """
    POST /swap
    Swaps selected faces in the target image using provided source images.
    Request: multipart/form-data with 'target', 'source[]', and 'face_index'.
    Response: JPEG image with swapped faces.
    """
    from inswapper_utils import swap_faces_inswapper
    tgt_file = request.files['target']
    sources = request.files.getlist('source[]')
    print('DEBUG: Received source[] files:', len(sources))
    if not sources:
        return jsonify({'error': 'No source face(s) uploaded'}), 400

    # Read target image from memory
    tgt_bytes = tgt_file.read()
    tgt_arr = np.frombuffer(tgt_bytes, np.uint8)
    tgt_img = cv2.imdecode(tgt_arr, cv2.IMREAD_COLOR)

    # Get face_index list from form (may be a single value or list)
    face_indices = request.form.getlist('face_index')
    print('DEBUG: face_indices received:', face_indices)
    if len(face_indices) < len(sources):
        face_indices += [str(i) for i in range(len(face_indices), len(sources))]
    elif len(face_indices) > len(sources):
        face_indices = face_indices[:len(sources)]

    # For each source, swap the corresponding face
    for i, src_file in enumerate(sources):
        src_bytes = src_file.read()
        src_arr = np.frombuffer(src_bytes, np.uint8)
        src_img = cv2.imdecode(src_arr, cv2.IMREAD_COLOR)
        face_index = int(face_indices[i]) if face_indices[i] is not None else None
        print(f'Running swap for face {i+1} (face_index={face_index})')
        try:
            result_img = swap_faces_inswapper(src_img, tgt_img, face_index=face_index)
        except Exception as e:
            return jsonify({'error': f'Face swap failed at face {i+1}', 'details': str(e)}), 500
        tgt_img = result_img

    # Encode final swapped image to JPEG in memory
    _, img_buf = cv2.imencode('.jpg', tgt_img, [int(cv2.IMWRITE_JPEG_QUALITY), 98])
    from io import BytesIO
    img_io = BytesIO(img_buf.tobytes())
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


@app.route('/')
def index():
    return jsonify({'status': 'DeepFaceLab API running'})


if __name__ == '__main__':
    os.makedirs('workspace', exist_ok=True)
    app.run(host='0.0.0.0', port=5555)
