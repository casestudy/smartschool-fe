import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

interface Prop {
	color?: string,
}

const FeMale: React.FC<Prop> = ({color}) => {
  const FemaleSvg = () => (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="30px" height="30px" viewBox="0 0 420.609 420.609">
        <g>
			<g>
				<path d="M350.035,275.014c-3.38-8.072-11.508-13.254-19.263-16.434l-25.851-11.898c-0.028-18.977-0.207-113.495-0.101-123.436
				c0.153-15.465-1.69-29.278-5.754-41.227l32.188-11.63l0.074,29.738l-2.188-0.001c-1.521-0.134-2.865,0.96-3.04,2.478
				l-2.833,24.559c-0.088,0.747,0.135,1.493,0.609,2.081c0.473,0.585,1.166,0.963,1.914,1.026l22.482-0.008
				c0.756-0.085,1.445-0.446,1.912-1.034c0.48-0.586,0.693-1.344,0.609-2.094c-0.567-4.823-1.132-9.639-1.693-14.462l-1.174-10.095
				c-0.179-1.505-1.526-2.601-3.044-2.466l-2.188,0.003l0.047-33.883l1.144-0.415l3.806-1.375c3.227-1.164,5.372-4.225,5.372-7.65
				c0-3.427-2.146-6.488-5.372-7.653L213.071,0.488c-1.789-0.65-3.744-0.65-5.531,0L72.915,49.139
				c-3.227,1.165-5.374,4.227-5.374,7.653s2.147,6.486,5.374,7.65l48.819,17.644c-4.263,12.257-6.203,26.431-6.044,42.259
				l0.002,122.333L89.837,258.58c-7.757,3.18-15.383,8.016-19.263,16.434c0,0-56.998,145.596-26.081,145.596h331.62
				C407.034,420.607,350.035,275.014,350.035,275.014z M262.119,262.51c0,0-43.391,14.377-51.748,64.875
				c-0.022,0.133-0.106,0.133-0.129,0c-8.359-50.498-51.748-64.875-51.748-64.875l28.439-28.242
				c-40.093-17.982-50.755-79.127-50.755-79.127c-2.266-8.839-2.539-14.885-2.539-14.885c20.073-1.367,90.128-7.401,94.917-30.111
				c6.603,12.2,41.561,42.857,55.705,45.185c0,0-13.729,60.463-51.229,78.895L262.119,262.51z"/>
			</g>
        </g>
    </svg>
  );
  const FemaleIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={FemaleSvg} {...props} />
  );
  return <FemaleIcon style={{ backgroundColor: 'transparent', borderRadius: "50px"}} />;
};

export default FeMale;