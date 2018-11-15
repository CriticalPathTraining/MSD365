# Troubleshooting

This document covers some of the common issues you may encounter when running this sample.

## You get a 403 Forbidden response when you attempt to create a subscription

Make sure that your app registration includes the **Read user mail** delegated permission for Microsoft Graph (as described in the [Register the app](#register-the-app) section). This permission must be set before your user gives consent. Otherwise you'll need to register a new app, add the `prompt=consent` parameter for the `/authorize` request, or remove the app for the user at [https://myapps.microsoft.com/](https://myapps.microsoft.com/).

## You do not receive notifications

If you're using ngrok, you can use the web interface [http://127.0.0.1:4040](http://127.0.0.1:4040) to see whether the notification is being received. If you're not using ngrok, monitor the network traffic using the tools your hosting service provides, or try using ngrok.

If Microsoft Graph is not sending notifications, please open a [Stack Overflow](https://stackoverflow.com/questions/tagged/MicrosoftGraph) issue tagged `MicrosoftGraph`. Include the subscription ID and the time it was created.

> **Known issue with the sample UI:** Occasionally the notification is received, and the retrieved message is sent to NotificationService, but the SignalR client in this sample does not update. When this happens, it's usually the first notification after the subscription is created.

## You get a "Subscription validation request timed out" response

This indicates that Microsoft Graph did not receive a validation response within the expected time frame (about 10 seconds).

- Make sure that you are not paused in the debugger when the validation request is received.
- If you're using ngrok, make sure that you used your project's HTTP port for the tunnel (not HTTPS).

## You get errors while installing packages

Make sure the local path where you placed the solution is not too long/deep. Moving the solution closer to the root drive resolves this issue.