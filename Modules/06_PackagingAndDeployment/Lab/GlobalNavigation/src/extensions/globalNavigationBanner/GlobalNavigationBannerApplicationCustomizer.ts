import { override } from '@microsoft/decorators';

import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import styles from './GlobalNavigationBannerApplicationCustomizer.module.scss';


export interface IGlobalNavigationApplicationCustomizerProperties {
  menuTitle: string;
}

interface IGlobalNavigationLink {
  url: string;
  caption: string;
}

const globalNavigationLinks: IGlobalNavigationLink[] = [
  { url: "http://google.com", caption: "Google" },
  { url: "https://github.com/SharePoint/", caption: "SPFx on GitHub" },
  { url: "https://github.com/CriticalPathTraining/MSD365", caption: "MSD365 on GitHub" }
];


/** A Custom Action which can be run during execution of a Client Side Application */
export default class GlobalNavigationBannerApplicationCustomizer
  extends BaseApplicationCustomizer<IGlobalNavigationApplicationCustomizerProperties> {

    private GlobalNavigation: PlaceholderContent | undefined;

  private RenderGlobalNavigation(): void {
    console.log("RenderGlobalNavigation executing...");

    let menuTitle = this.properties.menuTitle || "Global Nav";

    if (!this.GlobalNavigation) {
      this.GlobalNavigation = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
      if (!this.GlobalNavigation) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      let links: string = globalNavigationLinks.map(link => {
        return "<a href='" + link.url + "' target='_blank' >" + link.caption + "</a>";
      }).join("");

      this.GlobalNavigation.domElement.innerHTML = `
        <div class="${styles.globalNavigationMenu}">
          <i class="ms-Icon ms-Icon--Share" aria-hidden="true"></i>
          <div class="${styles.menuTitle}"  >${menuTitle}</div>
          <div>${links}<div>
        </div>`;
    }
  }

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this.RenderGlobalNavigation);
    this.RenderGlobalNavigation();
    return Promise.resolve<void>();
  }
}
