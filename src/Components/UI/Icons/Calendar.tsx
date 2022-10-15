import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const Calendar: React.FC = () => {
  const CalendarSvg = () => (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="60" width="70"
	 viewBox="0 0 59 59">
        <g>
            <path d="M56,57h-1v-2.36c0-3.534-1.845-6.748-4.827-8.64C53.155,44.108,55,40.895,55,37.36V35h1c0.553,0,1-0.447,1-1s-0.447-1-1-1
                h-1h-1H40h-1h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1v2.36c0,3.534,1.845,6.748,4.827,8.64C40.845,47.892,39,51.105,39,54.64V57h-1
                c-0.553,0-1,0.447-1,1s0.447,1,1,1h1h1h14h1h1c0.553,0,1-0.447,1-1S56.553,57,56,57z M41,37.36V35h12v2.36
                c0,3.319-2.033,6.298-5.197,7.64h-1.605C43.033,43.658,41,40.68,41,37.36z M41,54.64c0-3.319,2.033-6.298,5.197-7.64h1.605
                C50.967,48.342,53,51.32,53,54.64V57H41V54.64z" fill="black"/>
            <path d="M47,32V21h-9h-2h-7h-2h-7h-2H9v9v2v7v2v9h9h2h9v-9v-2v-7h7h2H47z M20,23h7v7h-7V23z M11,23h7v7h-7V23z M11,32h7v7h-7V32z
                M18,48h-7v-7h7V48z M27,48h-7v-7h7V48z M27,39h-7v-7h7V39z M36,30h-7v-7h7V30z M38,23h7v7h-7V23z" fill="black"/>
            <path d="M33,55H4V16h48v12c0,0.553,0.447,1,1,1s1-0.447,1-1V15V5c0-0.553-0.447-1-1-1h-5V1c0-0.553-0.447-1-1-1h-7
                c-0.553,0-1,0.447-1,1v3H17V1c0-0.553-0.447-1-1-1H9C8.447,0,8,0.447,8,1v3H3C2.447,4,2,4.447,2,5v10v41c0,0.553,0.447,1,1,1h30
                c0.553,0,1-0.447,1-1S33.553,55,33,55z M41,2h5v3v3h-5V5V2z M10,2h5v3v3h-5V5V2z M4,6h4v3c0,0.553,0.447,1,1,1h7
                c0.553,0,1-0.447,1-1V6h22v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1V6h4v8H4V6z" fill="black"/>
        </g>
    </svg>
  );
  const CalendarIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CalendarSvg} {...props} />
  );
  return <CalendarIcon style={{ backgroundColor: 'transparent', borderRadius: "50px"}} />;
};

export default Calendar;