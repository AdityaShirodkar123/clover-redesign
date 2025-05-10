# Flask Backend for Strapi Integration

This is a Flask backend that serves as a proxy between the Next.js frontend and Strapi CMS.

## Setup

1. Create a virtual environment:

```bash
python3 -m venv venv
```

2. Activate the virtual environment:

- On macOS/Linux:

```bash
source venv/bin/activate
```

- On Windows:

```bash
.\venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file:

```bash
cp .env.example .env
```

5. Update the `.env` file with your Strapi configuration:

- `STRAPI_API_URL`: Your Strapi ngrok URL
- `STRAPI_API_KEY`: Your Strapi API key

## Running the Server

```bash
flask run
```

The server will start on `http://localhost:5000`

## API Endpoints

- `GET /health`: Health check endpoint
- `GET/POST/PUT/DELETE /api/strapi/<endpoint>`: Proxy endpoint for Strapi CMS

## Integration with Next.js

To use this backend in your Next.js application, update your API calls to use the Flask backend URL instead of calling Strapi directly. For example:

```typescript
// Instead of
const response = await fetch("https://your-strapi-url/api/endpoint");

// Use
const response = await fetch("http://localhost:5000/api/strapi/endpoint");
```
