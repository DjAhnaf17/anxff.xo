# ============================================================================
# Frontend-Only Deployment Script for Google Cloud App Engine
# 
# Instructions:
# 1. Ensure you have the Google Cloud CLI installed.
# 2. Open PowerShell as Administrator and run `gcloud init` to login.
# 3. Then, execute this script: .\deploy.ps1
# ============================================================================

# Step 1: Build Frontend for Production
Write-Host "Building Frontend via Vite..." -ForegroundColor Cyan
cd frontend
npm install
npm run build

# Step 2: Deploy Frontend (Default Service)
Write-Host "Deploying Frontend (Default Service)..." -ForegroundColor Cyan
gcloud app deploy app.yaml --quiet
cd ..

Write-Host "=================================================" -ForegroundColor Green
Write-Host "Deployment Complete! View your frontend via:" -ForegroundColor Green
Write-Host "gcloud app browse" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Green
