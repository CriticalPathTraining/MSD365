import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle, 
  PropertyPaneDropdown,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';

import styles from './WalmartGreeterWebPart.module.scss';

export interface IWalmartGreeterWebPartProps {
  greeting: string;
  fontBold: boolean;
  fontSize: number;
  fontType: string;
}

export default class WalmartGreeterWebPart extends BaseClientSideWebPart<IWalmartGreeterWebPartProps> {

  public render(): void {

    var userName: string = this.context.pageContext.user.displayName;
  
    var fontStyle = `font-weight:${this.properties.fontBold ? "bold" : "normal"};
                     font-family:${this.properties.fontType};
                     font-size:${this.properties.fontSize}px;`;
  
    this.domElement.innerHTML = `
    <div class="${styles.walmartGreeter}">
      <h1 style="${fontStyle}" >Hello ${userName}, ${this.properties.greeting}</h1>
    </div>`;
  
  }
  
  
  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: "Greeter Web Part" },
        groups: [
          {
            groupName: "General Properties",
            groupFields: [PropertyPaneTextField('greeting', { label: 'Greeting' })]
          },
          {
            groupName: "Cosmetic Properties",
            groupFields: [
              PropertyPaneToggle('fontBold', {
                label: 'Font Bold',
                onText: 'On',
                offText: 'Off'
              }),
              PropertyPaneDropdown('fontType', {
                label: 'Font Type',
                options: [
                  { key: 'Arial', text: 'Arial' },
                  { key: 'Times New Roman', text: 'Times New Roman' },
                  { key: 'Courier,', text: 'Courier' },
                  { key: 'Verdana', text: 'Verdana' }
                ]
              }),
              PropertyPaneSlider("fontSize", {
                label: "Font Size",
                min: 24,
                max: 64
              })
            ]
          }
        ]
        
      }]
    };
  }
  
}
