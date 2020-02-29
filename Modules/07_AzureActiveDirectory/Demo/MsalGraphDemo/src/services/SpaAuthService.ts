import * as Msal from 'msal';
import AppSettings from "./../AppSettings";

export default class SpaAuthService {

    private static clientId: string = AppSettings.clientId;
    private static authority: string = "https://login.microsoftonline.com/" + AppSettings.aadTenant;

    private static requestScopesDefault = {
        scopes: [
            ".default"
        ]
    };

    private static requestScopes = {
        scopes: [
            "profile",
            "User.ReadWrite",
            "User.ReadBasic.All",
            "Organization.Read.All"
        ]
    };

    public static userIsAuthenticated: boolean = false;
    public static userDisplayName: string = "";
    public static userName: string = "";
    public static accessToken: string;
    public static uiUpdateCallback: any;

    private static msalConfig: Msal.Configuration = {
        auth: {
            clientId: SpaAuthService.clientId,
            authority: SpaAuthService.authority
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        }
    };

    private static userAgent: Msal.UserAgentApplication = new Msal.UserAgentApplication(SpaAuthService.msalConfig);
    
    private static requiresInteraction(errorCode: any) {
        if (!errorCode || !errorCode.length) {
            return false;
        }
        return errorCode === "consent_required" ||
            errorCode === "interaction_required" ||
            errorCode === "login_required";
    }

    public static async getAcessToken() {

        console.log("getAcessToken:");

        let tokenResponse;
        try {
            // try and get the token silently in the background
            tokenResponse = await SpaAuthService.userAgent.acquireTokenSilent(SpaAuthService.requestScopes);
            console.log("access token acquired silently");
            SpaAuthService.updateUi();
            return tokenResponse.accessToken;

        } catch (error) {
            console.log(error);
            // if the silent request failed, it might be because the user
            // needs to request one interactively via a pop-up or redirect
            if (SpaAuthService.requiresInteraction(error.errorCode)) {
                try {
                    // try and get the token with an interactive pop-up window
                    tokenResponse = await SpaAuthService.userAgent.acquireTokenPopup(SpaAuthService.requestScopes);
                    console.log("access token acquired interactively");
                    SpaAuthService.updateUi();
                    return tokenResponse.accessToken;
                } catch (error) {
                    console.log(error);
                }
            }
        }
        throw "Application Error: Could not acquire access token";
    }

    private static updateUi() {

        let userAccount = SpaAuthService.userAgent.getAccount();

        if (userAccount) {
            console.log("User account info retrieved...")
            SpaAuthService.userName = userAccount.userName;
            SpaAuthService.userDisplayName = userAccount.name;
            SpaAuthService.userIsAuthenticated = true;
        }

        if (SpaAuthService.uiUpdateCallback) {
            SpaAuthService.uiUpdateCallback();
        }

    }

    static init = () => {

        SpaAuthService.userAgent.handleRedirectCallback((error: Msal.AuthError, response: Msal.AuthResponse) => {
            console.log("Redirect callback executing...");
            if (error) {
                console.log("Error during auth callback...");
                console.log(error);
            }
            else {
                if (response.tokenType === "access_token") {
                    console.log("Access token acquired...");
                    SpaAuthService.accessToken = response.accessToken;
                    SpaAuthService.userDisplayName = response.account.name;
                    SpaAuthService.userName = response.account.userName;
                    SpaAuthService.userIsAuthenticated = true;
                    if (SpaAuthService.uiUpdateCallback != undefined) {
                        SpaAuthService.uiUpdateCallback();
                    }
                } else {
                    console.log("token type is:" + response.tokenType);
                }
            }
        });


    }

    static login = () => {

        let userAccount = SpaAuthService.userAgent.getAccount();

        if (userAccount) {
            console.log("User account info retrieved...")
            SpaAuthService.userName = userAccount.userName;
            SpaAuthService.userDisplayName = userAccount.name;
            SpaAuthService.userIsAuthenticated = true;
            SpaAuthService.updateUi();
            return;
        }


        SpaAuthService.userAgent.loginPopup(SpaAuthService.requestScopes)
            .then((loginResponse: any) => {
                console.log("login success...");
                var account = SpaAuthService.userAgent.getAccount();
                SpaAuthService.userName = loginResponse.account.userName;
                SpaAuthService.userDisplayName = loginResponse.account.name;
                SpaAuthService.userIsAuthenticated = true;
                SpaAuthService.uiUpdateCallback();
                //SpaAuthService.acquireAccessoken();
            }).catch(function (error: any) {
                console.log("log in error...");
                console.log(error);
            });

        if (SpaAuthService.uiUpdateCallback) {
            SpaAuthService.uiUpdateCallback();
        }

    }

    static logout = () => {
        SpaAuthService.userIsAuthenticated = false;
        SpaAuthService.userAgent.logout();
    }

}
