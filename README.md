# Card Validator API

A simple card number validation API built with Node.js, Express.js, and TypeScript.

## Overview

This project was built for a backend intern assessment. It exposes one POST endpoint that accepts a card number and returns whether the card number is valid.

The validation uses the Luhn algorithm, which is commonly used to validate card numbers.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Jest
- Supertest

## Requirements Covered

- Node.js with TypeScript
- `strict: true` enabled in `tsconfig.json`
- Single POST endpoint for card validation
- Graceful handling of bad or missing input
- Appropriate HTTP status codes
- At least one test
- README documentation

## Installation

```bash
npm install
```

## Running the Application

### Development

```bash
npm run dev
```

This starts the server with hot reloading using `ts-node-dev`.

### Production

```bash
npm run build
npm start
```

## API

### POST /api/validate-card

Validates a credit card number using the Luhn algorithm.

**Request Body:**
```json
{
  "cardNumber": "4111 1111 1111 1111"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "isValid": true,
    "cardNumber": "4111111111111111"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "data": {
    "isValid": false
  },
  "error": {
    "message": "Card number failed validation check"
  }
}
```

**Validation Rules:**
- Card number must be a string
- Must contain only digits, spaces, or hyphens
- Length must be between 12 and 19 digits (after normalization)
- Must pass the Luhn algorithm check

## Testing

Run the test suite with:

```bash
npm test
```

Tests are written using Jest and Supertest.