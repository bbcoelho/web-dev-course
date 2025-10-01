# Deployment Setup Guide

This guide will help you set up the complete CI/CD pipeline for automatic deployment to Render.

## Required GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

### Docker Hub Secrets
```
DOCKER_HUB_USERNAME=your_dockerhub_username
DOCKER_HUB_ACCESS_TOKEN=your_dockerhub_access_token
```

**To get Docker Hub Access Token:**
1. Go to [Docker Hub Account Settings](https://hub.docker.com/settings/security)
2. Click "New Access Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the generated token

### Render Secrets
```
RENDER_API_KEY=your_render_api_key
RENDER_STAGING_SERVICE_ID=your_staging_service_id
RENDER_PRODUCTION_SERVICE_ID=your_production_service_id
```

**To get Render API Key:**
1. Go to [Render Account Settings](https://dashboard.render.com/account/settings)
2. Scroll to "API Keys" section
3. Click "Create API Key"
4. Copy the generated key

### Database Secrets (Already exist)
```
MONGO_PASSWORD=U2n6uRWpInzLHm0e
DEV_DB=yelpCampDev
PROD_DB=yelpCamp
```

## Docker Hub Setup

1. **Create Docker Hub Repository:**
   - Go to [Docker Hub](https://hub.docker.com)
   - Click "Create Repository"
   - Name: `yelp-camp`
   - Visibility: Public (or Private if you have a paid plan)

2. **Update Workflow Files:**
   - Replace `${{ secrets.DOCKER_HUB_USERNAME }}` with your actual username in both workflow files
   - Or keep it as a secret for flexibility

## Render Services Setup

### 1. Create Staging Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Choose "Deploy an existing image from a registry"
4. **Image URL:** `your_dockerhub_username/yelp-camp:staging`
5. **Service Details:**
   - Name: `yelp-camp-staging`
   - Region: Oregon (or your preferred region)
   - Instance Type: Free
6. **Environment Variables:**
   ```
   NODE_ENV=development
   MONGO_PASSWORD=U2n6uRWpInzLHm0e
   DEV_DB=yelpCampDev
   PORT=3000
   ```
7. **Advanced Settings:**
   - Auto-Deploy: No (will be triggered by GitHub Actions)
   - Health Check Path: `/`
8. Click "Create Web Service"
9. **Copy the Service ID** from the URL (e.g., `srv-xxxxxxxxxxxxxxxxxxxxx`)

### 2. Create Production Service

1. Click "New +" → "Web Service"
2. Choose "Deploy an existing image from a registry"
3. **Image URL:** `your_dockerhub_username/yelp-camp:latest`
4. **Service Details:**
   - Name: `yelp-camp-production`
   - Region: Oregon (or your preferred region)
   - Instance Type: Starter ($7/month recommended for production)
5. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGO_PASSWORD=U2n6uRWpInzLHm0e
   PROD_DB=yelpCamp
   PORT=3000
   ```
6. **Advanced Settings:**
   - Auto-Deploy: No (will be triggered by GitHub Actions)
   - Health Check Path: `/`
7. Click "Create Web Service"
8. **Copy the Service ID** from the URL

### 3. Add Service IDs to GitHub Secrets

Add the service IDs you copied:
```
RENDER_STAGING_SERVICE_ID=srv-xxxxxxxxxxxxxxxxxxxxx
RENDER_PRODUCTION_SERVICE_ID=srv-yyyyyyyyyyyyyyyyyyy
```

## Deployment Flow

### Staging Deployment
```
Any Branch → staging branch → Staging Environment
```
- Push to `staging` branch triggers staging deployment
- Tests run first, deployment only on success
- Uses development database (`DEV_DB`)

### Production Deployment
```
staging → master branch → Production Environment
```
- Push to `master` branch triggers production deployment
- Tests run first, deployment only on success
- Uses production database (`PROD_DB`)
- Creates GitHub release with version tag

## Testing the Setup

### 1. Test Staging Deployment
```bash
# Create a test branch
git checkout -b test-staging-deploy

# Make a small change
echo "# Test staging deployment" >> README.md
git add README.md
git commit -m "test: staging deployment"

# Push and merge to staging
git push origin test-staging-deploy
git checkout staging
git merge test-staging-deploy
git push origin staging
```

### 2. Test Production Deployment
```bash
# Merge staging to master
git checkout master
git merge staging
git push origin master
```

## Troubleshooting

### Common Issues

1. **Docker Hub Authentication Failed**
   - Verify `DOCKER_HUB_USERNAME` and `DOCKER_HUB_ACCESS_TOKEN`
   - Ensure access token has push permissions

2. **Render Deployment Failed**
   - Check `RENDER_API_KEY` is valid
   - Verify service IDs are correct
   - Check Render service logs for errors

3. **Tests Failing**
   - Ensure MongoDB connection works with provided credentials
   - Check if all environment variables are set correctly

4. **Image Not Found on Render**
   - Verify Docker image was pushed successfully
   - Check image tag matches what Render expects
   - Ensure repository is public or Render has access

### Useful Commands

```bash
# Check GitHub Actions status
gh run list

# View workflow logs
gh run view --log

# Check Docker Hub for pushed images
docker pull your_username/yelp-camp:staging

# Test local Docker build
docker build -t test-build .
docker run -p 3000:3000 --env-file .env test-build
```

## Security Notes

- All sensitive data is stored in GitHub Secrets
- Render services use environment variables, not hardcoded values
- Docker images don't contain sensitive information
- API keys have minimal required permissions

## Next Steps

1. Set up monitoring and alerts
2. Configure custom domains for both environments
3. Set up database backups
4. Implement rollback procedures
5. Add staging-to-production promotion workflow