# Backend Dockerfile for Face Swap Web
FROM python:3.13.5-slim-bullseye

# Ensure all packages are up-to-date to reduce vulnerabilities
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y && \
    apt-get clean

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get install -y libglib2.0-dev

# Copy backend code and docs
COPY . /app

# Install Python dependencies
RUN pip install --root-user-action --no-cache-dir -r requirements.txt

# Expose Flask port
EXPOSE 5555

# Run the Flask app
CMD ["python", "api.py"]
