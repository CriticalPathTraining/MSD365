import * as React from 'react';
import styles from './ClassyBanner.module.scss';

export default class ClassyBanner extends React.Component<any, any> {
  public render(): React.ReactElement<any> {
    return (
      <div className={styles.classyBanner}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.body}>
              <div className={styles.title}>
                I am a Modern Developer using the SharePoint Framework
              </div>
              <div className={styles.bodyContent}>
                <p>
                  <i className="ms-Icon ms-Icon--Emoji2" aria-hidden="true"></i>
                  Programming in Typescript makes me happy!
                </p>
                <p>
                  <i className="ms-Icon ms-Icon--Permissions" aria-hidden="true"></i>
                  Developing with SPFx is the key to my future!
                </p>
              </div>
            </div>
            <div className={styles.image} />
          </div>
        </div>
      </div>
    );
  }
}
