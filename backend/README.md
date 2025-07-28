# DeepFaceLab Python Backend for Face Swap

This backend provides a REST API for photorealistic face swapping using DeepFaceLab.

## Requirements
- NVIDIA GPU (6GB+ VRAM recommended)
- Python 3.8+
- CUDA/cuDNN (see DeepFaceLab docs)
- DeepFaceLab (https://github.com/iperov/DeepFaceLab)
- Flask, Flask-CORS

## Setup
1. Download and set up DeepFaceLab as per their [GitHub instructions](https://github.com/iperov/DeepFaceLab).
2. Install Python dependencies:
   ```bash
   pip install flask flask-cors
   ```
3. Place this API in the `backend/` directory of your project.

## Usage
- Start the API:
  ```bash
  python api.py
  ```
- POST two images (`source`, `target`) to `/swap` to get a swapped result.

## Note
- This API is a template. You must fill in the DeepFaceLab CLI commands for extraction, training, and merging.
- For best results, pre-train a model on your source/target faces, then use the merge script for inference.
