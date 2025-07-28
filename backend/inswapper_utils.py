"""
Utility functions for running InsightFace/inswapper face swap logic.
Used by API endpoints for in-process model inference.
"""
import os
import cv2
import numpy as np
import insightface
from insightface.app import FaceAnalysis
from insightface.model_zoo import get_model

def swap_faces_inswapper(src_img, tgt_img, face_index=None):
    """
    Swaps a face in the target image with the source image using inswapper.
    Args:
        target_img: np.ndarray, target image.
        source_img: np.ndarray, source image.
        face_index: int, index of the face to swap.
    Returns:
        np.ndarray: Image with swapped face.
    """
    # Initialize face analysis and inswapper
    app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
    app.prepare(ctx_id=0, det_size=(640, 640))
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'inswapper_128.onnx')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}\nPlease download it from https://github.com/deepinsight/insightface/releases/download/v0.7/inswapper_128.onnx and place it in the 'backend/models/' directory.")
    inswapper = get_model(model_path, download=False, providers=['CPUExecutionProvider'])

    # Detect faces
    src_faces = app.get(src_img)
    tgt_faces = app.get(tgt_img)
    if len(src_faces) == 0 or len(tgt_faces) == 0:
        raise ValueError('No face detected in source or target image')

    # Use the largest face in source as the swap face
    src_face = max(src_faces, key=lambda f: f.bbox[2]*f.bbox[3])

    res_img = tgt_img.copy()
    if face_index is not None:
        if face_index < 0 or face_index >= len(tgt_faces):
            print(f'Warning: face_index {face_index} out of range (found {len(tgt_faces)} faces), skipping swap for this face.')
            return res_img
        face = tgt_faces[face_index]
        res_img = inswapper.get(res_img, face, src_face, paste_back=True)
    else:
        for face in tgt_faces:
            res_img = inswapper.get(res_img, face, src_face, paste_back=True)
    return res_img
