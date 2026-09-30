# AI FAQ Assistant API — reconstructed runnable project

This folder is a **reconstruction**, not a verbatim extraction of every file. The uploaded PDF shows the project architecture and screenshots for the gateway, middleware, models, and routes, but it only *lists* controller/service/config/helper files without showing their code. The missing implementations here were created to match the documented endpoints and behavior.

## Setup
1. Copy `.env.example` to `.env`.
2. Configure MongoDB, JWT secret, and Gemini API key.
3. Run `npm install`.
4. Run `npm run dev`.

## Documented endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (Bearer token)
- `GET /api/faqs`
- `GET /api/faqs/search?q=configure`
- `GET /api/faqs/:id`
- `POST /api/faqs` (Bearer token)
- `PUT /api/faqs/:id` (Bearer token)
- `DELETE /api/faqs/:id` (Bearer token)
- `POST /api/ai/answer` (Bearer token)
- `POST /api/ai/generate-faq` (Bearer token)
