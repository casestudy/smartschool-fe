import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const Subjects: React.FC = () => {
  const SubjectSvg = () => (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="60" width="70"
	 viewBox="0 0 476.664 476.664">
        <g>
            <path d="M454.571,138.49c2.452,0,4.847,0.418,7.249,0.749v-35.784c0-12.205-9.888-22.096-22.087-22.096H222.557
                c-18.598,0-33.681-15.082-33.681-33.679v-2.522c0-12.206-9.888-22.096-22.095-22.096H36.931c-12.2,0-22.087,9.89-22.087,22.096
                v94.081c2.402-0.331,4.798-0.749,7.249-0.749H454.571z"/>
            <path d="M470.631,177.686c-4.175-4.413-9.983-6.919-16.06-6.919H22.093c-6.076,0-11.884,2.506-16.059,6.919
                c-4.177,4.42-6.345,10.362-5.998,16.431l13.616,238.65c0.67,11.694,10.347,20.835,22.057,20.835h405.246
                c11.71,0,21.387-9.141,22.057-20.835l13.616-238.65C476.975,188.048,474.808,182.106,470.631,177.686z"/>
        </g>
    </svg>
  );
  const SubjectIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={SubjectSvg} {...props} />
  );
  return <SubjectIcon style={{ backgroundColor: 'transparent', borderRadius: "50px"}} />;
};

export default Subjects;