# node-apis-project

This project is a simple API that saves contact information of people.

## Overview

This repository contains two versions of the project:

- **V1.0.0:** Run the server directly after cloning. It creates a simple RESTful API over HTTP.
- **V2.0.0:** A more secure and controlled API. Read the post on securing RESTful API applications before running this version.

## Requirements

- NodeJS

### Install global TypeScript and TypeScript Node

npm install -g typescript ts-node

## Getting Started
- Install MongoDB on your local machine, or use other services such as mLab or Compose.
- Replace the mongoURL with your MongoDB address in lib/app.ts.
- **Clone this repository:**
git clone <your-repository-url>

- **Install the dependencies:**
  
npm install

## Start the server

- **Run in development mode:**
  
npm run dev

- **Run in production mode:**
  
npm run prod

## Testing
**Testing over HTTP (tag v1.0.0)**
- The default URL is: http://localhost:3000
**GET all contacts**
http://localhost:3000/contact/

## Testing over HTTPS (tag v2.0.0)
- The default URL is: https://localhost:3000
