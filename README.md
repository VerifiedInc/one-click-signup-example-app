# 1-Click Integration Customer Guide App

This project demonstrates a simple signup flow for a fictional brand, Slooow, using Verified’s 1-click integration in four different modes:

1. Without 1-Click Integration
2. 1-Click Hosted
3. 1-Click Semi-Hosted
4. 1-Click Non-Hosted

## Purpose

By running this project and reviewing the code for each integration flow, you’ll gain a practical guide to integrating your application with Verified’s 1-click solution.

## Documentation

For more information, see the [Verified Quick Start Guide](https://docs.verified.inc/quick-start-guide).

## Getting Started

This is a Next.js project.

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

1. Without 1-Click Integration -> [/register](http://localhost:3061/register)
2. 1-Click Hosted -> [/register/1-click/hosted](http://localhost:3061/register/1-click/hosted)
3. 1-Click Semi-Hosted -> [/register/1-click/semi-hosted](http://localhost:3061/register/1-click/semi-hosted)
4. 1-Click Non-Hosted -> [/register/1-click/non-hosted](http://localhost:3061/register/1-click/non-hosted)
