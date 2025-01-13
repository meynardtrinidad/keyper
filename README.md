# Introduction

This project is to test API key generation.

## Getting Started

Install the required dependencies.

```bash
npm i
```

Run the server.

```bash
npm run dev
```

Register a user.

```bash
curl -X POST \ 
    -H 'Content-Type: application/json' \
    -d '{"username":"john_doe","password":"password123"}' \
    http://localhost:3000/api/v1/auth/register
```

Login through the user registered. This will return a JWT token that you will use in the succeeding requests.

```bash
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"username":"john_doe","password":"password123"}' \
    http://localhost:3000/api/v1/auth
```

After receiving the JWT token. Request for an API key.

```bash
curl -H 'Authorization: Bearer <token>' \
    http://localhost:3000/api/v1/key/generate
```

This will return an API key that you will use to access resource protected routes.

> Note that the key will only be displayed once, copy/store it since there
> is no way to retrieve that key since it will be hashed. Otherwise, you
> will need to regenerate a new key.

```json
{
    ...
    "data": {
        "api_key": "<key>"
    }
}
```

Then, using the API key, request on a resource protected route.

```bash
curl -H 'Authorization: Bearer <api_key>' \
    http://localhost:3000/api/v1/quotes
```


## Requirements

- [x] Should be able to access a protected resource using API key
even if the JWT token is expired.
- [x] Authentication
- [x] API Key
    - [x] Generate API Key
    - [x] Revoke API Key
