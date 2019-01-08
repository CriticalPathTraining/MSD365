import * as React from 'react';
import * as AppImages from './../../images/AppImages';

import './view3.scss';

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';

const teamMembers = [
  { key: 'AustinP', name: 'Austin Powers', title: 'Internation Man of Mystery', interests: 'Dancing, Saving the World', photo: AppImages.AustinP },
  { key: 'CarrieP', name: 'Carrie Mathison', title: 'Veteran CIA Operative', interests: 'Yoga, Meditation, Firearms', photo: AppImages.CarrieM },
  { key: 'EmmaP', name: 'Emma Peel', title: 'M6 Operative', interests: 'Drinking tea', photo: AppImages.EmmaP },
  { key: 'JackB', name: 'Jack Bauer', title: 'Counter Terrorist Unit (CTU)', interests: 'Sensory Deprivation', photo: AppImages.JackB },
  { key: 'JackR', name: 'Jack Ryan', title: 'Veteran CIA Operative', interests: 'Yoga, Meditation, Firearms', photo: AppImages.JackR },
  { key: 'JasonB', name: 'Json Born', title: 'Ex CIA Operative', interests: 'Evading detection', photo: AppImages.JasonB },
  { key: 'MaxwellS', name: 'Maxwell Smart', title: 'CONTROL Agent 86', interests: 'Assuming different identites', photo: AppImages.MaxwellS }
];

export default class View3 extends React.Component<any, any> {

  render() {
    return (
      <div id="view3">
        <h4>Persona Cards</h4>
        <div>{teamMembers.map((teamMember: any) => (
          <div className='persona-card'>
            <Persona
              key={teamMember.key}
              primaryText={teamMember.name}
              imageUrl={teamMember.photo}
              size={PersonaSize.size100}
              secondaryText={teamMember.title}
              onRenderTertiaryText={() => (
                <div><strong>Interests: </strong>{teamMember.interests}</div>
              )}
            />
          </div>
        ))}
        </div>
      </div>
    );
  }
}
