# Environment Variables & GitHub Secrets Sync

## Current Setup

- **Local**: `.env` file with `MONGO_PASSWORD`, `PROD_DB`, `DEV_DB`
- **GitHub**: Secrets used in `.github/workflows/pr-tests.yml`
- **Sync**: Automated via pre-push hook + manual commands available

## Automated Sync (Pre-Push Hook)

### How It Works
- **Trigger**: Automatically runs before every `git push` (including VS Code interface)
- **Detection**: Only syncs if `.env` file exists
- **Logging**: All sync operations logged to `secrets-sync.log`
- **Blocking**: Prevents push if sync fails

### VS Code Integration
Since VS Code doesn't display hook output, check the log file:
```bash
# View recent sync attempts
npm run logs:secrets

# Watch sync log in real-time
npm run logs:secrets-watch
```

## Manual Sync Commands

### Prerequisites
```bash
# Install GitHub CLI (already done)
brew install gh

# Authenticate with GitHub
gh auth login --web
```

### Sync Secrets
```bash
# Sync all .env variables to GitHub secrets
npm run sync-secrets

# Check current GitHub secrets
npm run check-secrets
```

## Log File Monitoring

### Available Commands
- `npm run logs:secrets` - View last 20 log entries
- `npm run logs:secrets-watch` - Live monitoring of sync operations

### Log Format
```
[2025-01-15 10:30:15] INFO: Starting GitHub secrets sync...
[2025-01-15 10:30:16] SUCCESS: GitHub secrets synced successfully
[2025-01-15 10:30:16] INFO: Push proceeding...
```

## Manual Sync Alternative

If GitHub CLI authentication fails, manually add these secrets in GitHub:
1. Go to repository Settings → Secrets and variables → Actions
2. Add each variable from `.env`:
   - `MONGO_PASSWORD`
   - `PROD_DB` 
   - `DEV_DB`

## Security Notes

- `.env` file is gitignored (never commit secrets)
- `secrets-sync.log` is gitignored (contains sync metadata only)
- GitHub secrets are encrypted and only accessible in workflows
- Use different values for production vs development environments

## Workflow Integration

The GitHub workflow (`.github/workflows/pr-tests.yml`) automatically uses:
- `MONGO_PASSWORD` for database connection
- `DEV_DB` for development database name
- `PROD_DB` for production database name

## Troubleshooting

### Authentication Issues
- **Problem**: `ERROR: GitHub CLI not authenticated`
- **Solution**: Run `gh auth login --web` and follow browser flow

### Permission Errors
- **Problem**: Push blocked due to sync failure
- **Solution**: Ensure you have admin access to the repository

### Missing Secrets
- **Check current secrets**: `npm run check-secrets`
- **View sync logs**: `npm run logs:secrets`

### Hook Not Running
- **Verify hook exists**: Check `.git/hooks/pre-push` is executable
- **VS Code push**: Hook runs silently, check `secrets-sync.log` for output