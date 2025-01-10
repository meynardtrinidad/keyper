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

## Requirements

- [ ] Should be able to access a protected resource using API key
even if the JWT token is expired.
- [ ] Authentication
- [ ] API Key
    - [ ] Generate API Key
    - [ ] Revoke API Key

## High Level Design

This service will generate an API key with the following information:

```
<version>_<public_key>_<secret>
```
