# 1-Click Signup Example App

## About

This app shows Verified [1-Click Signup](https://docs.verified.inc/) for a fictional brand called Slooow, whose logo is a sloth! 🦥

It shows four different flows (listed under [Usage](#usage)). The first is a manual signup flow, and the next three are 1-Click Signup flows, each using a different [integration type](https://docs.verified.inc/integration-guide#2-determine-integration-type).

For more information about 1-Click Signup, see the [Verified Docs](https://docs.verified.inc/) and in particular the [Integration Guide](https://docs.verified.inc/integration-guide).

### Purpose

By running this app and reviewing the code for each flow, you'll better understand how to integrate 1-Click Signup into your own application.

### Structure

This app uses [Next.js](https://nextjs.org/). If you’re new to Next.js, start by exploring the `src/pages/signup` directory. Here, you’ll find pages for the different flows, each designed to guide you through the process.

See the Next.js [Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) docs for more details on the routing system.

## Setup

1. **Access the [Verified Dashboard](https://dashboard.verified.inc).**

   1. **Enter your email and click the 1-Click Login button.** We'll send you a verification code by email.
   2. **Complete the verification step.** Click the verification button in the email, or enter the verification code. We'll automatically log you in.

   3. **Set "Slooow" as the company name.** The fictional company for this example app is called Slooow. We'll automatically create a brand called Slooow for you and take you to its Brand Details page.
   4. **Copy your Sandbox API key.** You'll use this in the next step.

2. **Set up the app:**

   1. **Clone this repo.**
   2. **Set up environment variables:**

      1. **Rename the `.env.example` file to `.env`.**
      2. **Set your Sandbox API key as the value for `ONE_CLICK_API_KEY`.** You copied this in step (1)(iv).

   3. **Run `npm install`** to install dependencies.
   4. **Run `npm run dev`** to run the development server. The app will be running at http://localhost:3061.

## Usage

You can switch between the different flows using the menu in the upper right corner.

### Manual Signup ([/signup/manual](http://localhost:3061/signup/manual))

This is a manual signup flow, without a 1-Click Signup integration. The user must manually enter all information. _That's why it's slooow!_ ☹️

This flow mimics what a company typically has before they integrate 1-Click Signup.

### 1-Click Signup

These are 1-Click Signup flows, using different [integration types](https://docs.verified.inc/integration-guide#2-determine-integration-type). The user can sign up in less than 10 seconds, with a single click! _That's why it's Slooow, but not slooow!_ 😁

> [!IMPORTANT]
> For a 1-Click Signup flow that uses a particular integration type to work, your brand's **integration type** setting must be set to the correct integration type in the [Dashboard](https://dashboard.verified.inc).

The basic steps of a 1-Click Signup flow are:

1. User enters phone number
2. User enters verification code (which they receive by SMS)
3. User confirms data autofilled by 1-Click Signup

**For simplicity, this example app does not send SMS**. Instead, it displays the verification code in the lower right corner (and logs it in the browser console), so you can easily enter it.

In a real integration of 1-Click Signup that uses the Verified [Production](https://docs.verified.inc/environments#production) environment, the app must actually send SMS, to ensure the user verifies their phone number before Verified returns any of their data. This example app only uses the Verified [Sandbox](https://docs.verified.inc/environments#sandbox) environment, which returns only [mock data](https://docs.verified.inc/environments#mock-data), so it doesn't need to send SMS.

> [!WARNING]  
> This example app only displays verification codes on the page (and logs it in the browser console) for ease of development use. In a real integration, you should never handle verification codes (or any sensitive data) in this way.

#### Non-Hosted ([/signup/1-click/non-hosted](http://localhost:3061/register/signup/1-click/non-hosted))

> [!IMPORTANT]
> For this flow to work, your brand's **integration type** setting must be set to **Non-Hosted** in the [Dashboard](https://dashboard.verified.inc).

With the Non-Hosted integration type, you use your own UI, and you use your own verification code to verify users' phone numbers. The app (rather than Verified) handles all of this functionality.

After the app has collected and verified a user's phone number, it calls the Verified API for 1-Click Signup. See the [Non-Hosted Integration Guide](https://docs.verified.inc/integration-guide?integrationType=non-hosted#integration) for details.

#### Semi-Hosted ([/1-click-signup/semi-hosted](http://localhost:3061/register/signup/1-click/semi-hosted))

> [!IMPORTANT]
> For this flow to work, your brand's **integration type** setting must be set to **Semi-Hosted** in the [Dashboard](https://dashboard.verified.inc).

With the Semi-Hosted integration type, you use your own UI, but you use Verified's verification code to verify users' phone numbers. The app (rather than Verified) handles the UI, but Verified creates a verification code and checks user input against it.

After the app has collected a user's phone number, it calls the Verified API to start a 1-Click Signup flow. See the [Semi-Hosted Integration Guide](https://docs.verified.inc/integration-guide?integrationType=semi-hosted#integration) for details.

#### Hosted ([/1-click-signup/hosted](http://localhost:3061/register/signup/1-click/hosted))

> [!IMPORTANT]
> For this flow to work, your brand's **integration type** setting must be set to **Hosted** in the [Dashboard](https://dashboard.verified.inc).

> [!TIP]
> You should also set the Slooow brand's **logo** setting as the image below and **color** setting as `#D32D2D`. This will configure the branding on the Verified hosted page.

> ![Slooow logo](/public/slooow.png)

With the Hosted integration type, you use Verified's UI, and you use Verified's verification code to verify user phone numbers. Verified (rather than the app) handles this functionality.

After the app has collected a user's phone number, it calls the Verified API to start a 1-Click Signup flow and redirects the user to a Verified hosted page. See the [Hosted Integration Guide](https://docs.verified.inc/integration-guide?integrationType=hosted#integration) for details.

Once the user completes 1-Click Signup on the Verified hosted page, that page redirects them to a URL defined by your brand's **default redirect URL** setting in the [Dashboard](https://dashboard.verified.inc). Using `http://localhost:3061` won’t work due to security restrictions, so you should use a tunneling service like [ngrok](https://ngrok.com/) or [Localtunnel](https://theboroer.github.io/localtunnel-www/) to create a secure, publicly accessible URL.

For example, with Localtunnel, you can install it globally (`npm install -g localtunnel`) and run it (`lt --port 3061`), and it will generate a URL. Set this URL as the default redirect URL for your brand in the Dashboard, and save your brand's settings.
