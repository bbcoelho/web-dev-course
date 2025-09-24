# GitHub Workflow Setup

## Repository Secret Setup

Before the workflow can run, you need to add the required environment variables as repository secrets:

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - Name: `MONGO_PASSWORD`
   - Value: `Eh8yN1OkQ0X5LqXH`

## Testing the Workflow

### Option 1: Create Pull Request (Automatic)
1. Create a feature branch: `git checkout -b feature/test-workflow`
2. Push changes: `git push origin feature/test-workflow`
3. Create PR targeting `master` or `staging` branch
4. Workflow runs automatically

### Option 2: Manual Trigger
1. Go to **Actions** tab in GitHub repo
2. Select "Pull Request Tests" workflow
3. Click **Run workflow** button
4. Choose branch and click **Run workflow**

### Option 3: Local Testing
```bash
# Test the same commands locally
docker build -t yelp-camp:test .
docker run -d --name app-container -p 3000:3000 -e MONGO_PASSWORD="Eh8yN1OkQ0X5LqXH" yelp-camp:test
curl http://localhost:3000  # Check if app is ready
docker exec app-container npm run tests
docker stop app-container && docker rm app-container
```

## Monitoring Results

- View workflow runs in the **Actions** tab
- Download test artifacts (playwright-report) if tests fail
- Check logs for detailed debugging information