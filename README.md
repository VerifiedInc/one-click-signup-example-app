# 1-Click Integration Customer Guide App

This project demonstrates a simple signup flow for a fictional brand, Slooow, using Verified’s 1-Click integration in four different modes:

1. Without 1-Click Integration
2. 1-Click Hosted
3. 1-Click Semi-Hosted
4. 1-Click Non-Hosted

## Purpose

By running this project and reviewing the code for each integration flow, you’ll gain a practical guide to integrating your application with Verified’s 1-Click solution.

## Documentation

For more information, see the [Verified Quick Start Guide](https://docs.verified.inc/quick-start-guide).

## Getting Started

1. Setup Environment Variables

   • Rename the .env.example file to .env.
   • Add required environment variables in this file.

2. Install Dependencies

Run the following command to install all necessary dependencies:

`npm install`

3. Run the Development Server

Start the development server by running:

`npm run dev`

Your application should now be running at http://localhost:3061.

## Important Instructions

**Note:** Be sure to update your brand’s integration type in the Verified dashboard before testing each flow to match the selected mode in the app.

## Usage

Once the project is running, you can switch between the different integration flows by selecting options from the menu in the top-right corner of the page.

You can also access the paths for each integration on the browser:

1. Without 1-Click Integration -> [/signup](http://localhost:3061/signup)
2. 1-Click Hosted -> [/signup/1-click/hosted](http://localhost:3061/signup/1-click/hosted)
3. 1-Click Semi-Hosted -> [/signup/1-click/semi-hosted](http://localhost:3061/signup/1-click/semi-hosted)
4. 1-Click Non-Hosted -> [/signup/1-click/non-hosted](http://localhost:3061/signup/1-click/non-hosted)

When you reach the OTP form, the correct code will be logged in the browser console. Note: This is only for demonstration purposes—avoid logging sensitive information in real applications.

## Project Structure

This project uses Next.js, combining a client-side frontend with a server-side API.

If you’re new to Next.js, start by exploring the `src/pages/signup directory` directory. Here, you’ll find pages for different registration integrations, each designed to guide you through the process.
For example:

1. `src/pages/signup/index.tsx` – This page handles the registration flow without 1-Click integration. A great starting point for understanding the basics.
2. `src/pages/signup/1-click/hosted.tsx` – This page is for the registration flow with the 1-Click hosted integration.

See [Nextjs Pages docs](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) for more details on the routing system.

## Setting Up Your Hosted Redirect URL for Local Development Testing

To test the 1-Click hosted integration locally, you’ll need to configure the `NEXT_PUBLIC_REDIRECT_URL` environment variable. If this variable is left empty, the hosted flow will default to the brand’s main redirect URL.

**Important**: Setting `http://localhost:3061` won’t work due to security restrictions. Instead, use a tunneling service like Ngrok or Localtunnel to create a secure, publicly accessible URL.

Example with localtunnel:
Install it globally (`npm install -g localtunnel`) and run `lt --port 3061`.

It will generate some url. Add it to your .env file:

Example:

```
NEXT_PUBLIC_BASE_URL=https://test-test-test.loca.lt
```
