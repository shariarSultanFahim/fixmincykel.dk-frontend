# Docker

Run the app with Docker Compose:

```bash
docker compose up --build
```

The container reads environment values from the root `.env` file through Compose. Public Next.js env vars are also forwarded into the build so client-side code gets the same values at image build time. The app is published on port `5173` outside Docker.
