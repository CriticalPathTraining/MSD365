import * as React from 'react';
import './view1.scss';


import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year'
};


export default class View1 extends React.Component<any, any> {
  render() {
    return (
      <div id="view1">
        <h4>Dropdown menu</h4>
        <div>
          <Dropdown
            label="Select your favoriate Beatle"
            options={[
              {
                text: 'John Lennon',
                key: 'JohnL'
              },
              {
                text: 'Paul McCartney',
                key: 'PaulM'
              },
              {
                text: 'George Harrison',
                key: 'GeorgeH'
              },
              {
                text: 'Ringo Starr',
                key: 'RingoS'
              }
            ]}
            selectedKey='JohnL'
            onChanged={(option: IDropdownOption): void => { console.log(option); }}
          />
        </div>
        <h4>Search Box</h4>
        <SearchBox
          placeholder="Search"
          onSearch={newValue => console.log('value is ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onChange called')}
        />
        <h4>Date Picker</h4>
        <div>
          <DatePicker
            firstDayOfWeek={DayOfWeek.Monday}
            strings={DayPickerStrings}
            placeholder="Select a date..."
            onAfterMenuDismiss={() => console.log('onAfterMenuDismiss called')}
          />
        </div>
      </div>
    );
  }

}
