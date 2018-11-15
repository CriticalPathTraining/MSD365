﻿/*
 *  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 *  See LICENSE in the source repository root for complete license information.
 */

using GraphWebhooks.TokenStorage;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using System.Linq;
using System.Net.Http.Headers;

namespace GraphWebhooks.Helpers
{
    public static class GraphHelper
    {
        public static GraphServiceClient GetAuthenticatedClient(string userId, string redirect)
        {
            var graphClient = new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    async (request) =>
                    {
                        var tokenCache = new SampleTokenCache(userId);

                        var cca = new ConfidentialClientApplication(Startup.ClientId, redirect,
                            new ClientCredential(Startup.ClientSecret), tokenCache.GetMsalCacheInstance(), null);

                        var authResult = await cca.AcquireTokenSilentAsync(Startup.Scopes, cca.Users.First());
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authResult.AccessToken);
                    }));

            return graphClient;
        }
    }
}