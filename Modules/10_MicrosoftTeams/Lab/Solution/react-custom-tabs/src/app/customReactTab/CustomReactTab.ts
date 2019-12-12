import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/customReactTab/index.html")
@PreventIframe("/customReactTab/config.html")
@PreventIframe("/customReactTab/remove.html")
export class CustomReactTab {
}
