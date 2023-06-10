import  React, { useEffect, useState } from 'react';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import Color from '../../../Components/UI/Header/Theme.json';

import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Modal, Spin } from 'antd';
import { decode as base64_decode } from 'base-64';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../State/Hooks';

import { fetchClassroomStudentsAsync } from '../../../State/Thunks/ClassroomsThunk';
import Danger from '../../../Components/UI/Icons/Danger';
import AddButton from '../../../Components/UI/Button/AddButton';
import PrinterIcon from '../../../Components/UI/Icons/Printer';

interface Prop {
    classid?: string;
	locale?: string;
}

const ClassroomStudentsTab: React.FC<Prop> = ({classid, locale}) => {
    const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [originalStudents, setOriginalStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);

    const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalStudents.filter((x:any) => x.surname.toLowerCase().includes(e.toLowerCase()) || x.othernames.toString().includes(e) || x.matricule.toLowerCase().includes(e.toLowerCase()) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredStudents(filt);
	};

	const printClasslist = () => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			classid: classid,
			locale: locale,
			connid: localStorage.getItem('connid'),
			print: true
		}

		dispatch(fetchClassroomStudentsAsync(data)).then((value) => {
			const result = value.payload ;

			if(result.error === false) {
				// We have the db results here				
				setLoading(false);

				const data = 'data:application/pdf;base64,'+result.data;

				var a = document.createElement('a')
				a.setAttribute('href', data)
				a.setAttribute('download', 'classlist')
				a.click()
				a.remove()

			} else {
				//An axios error
				let msg = '';
				let code = '';
	
				if(result.status === 400) {
					msg = result.message;
					code = result.code;
				} else {
					//It is error from the back end
					msg = result.error.msg;
					code = result.error.code;
				}
				const modal = Modal.error({
					title: 'Students',
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.classrooms}/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}

    const columns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '2%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Surname',
			dataIndex: 'surname',
			key: 'surname',
			width: '15%',
			sorter: (a: any, b: any) => a.surname.localeCompare(b.surname)
        },
		{
			title: 'Othernames',
			dataIndex: 'othernames',
			key: 'othernames',
			width: '15%',
			sorter: (a: any, b: any) => a.othernames.localeCompare(b.othernames)
        },
		{
			title: 'Matricule',
			dataIndex: 'matricule',
			key: 'matricule',
			width: '10%',
			sorter: (a: any, b: any) => a.sname.localeCompare(b.sname)
        },
        {
			title: 'DOB',
			dataIndex: 'dob',
			key: 'dob',
			width: '10%'
        },
        {
			title: 'DOE',
			dataIndex: 'doe',
			key: 'doe',
			width: '10%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
		},
		{
			title: 'Student Id',
			dataIndex: 'userid',
			key: 'userid',
			width: '33%',
			hidden: true
		}
    ].filter(item => !item.hidden);

    useEffect(() => {
        setLoadingMessage('Fetching classroom students...');
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			classid: classid,
			locale: locale,
			connid: localStorage.getItem('connid'),
			print: false
		}

		dispatch(fetchClassroomStudentsAsync(data)).then((value) => {
			const result = value.payload ;
			setLoading(false);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredStudents(dataSource);
				setOriginalStudents(dataSource);
				setLoading(false);
			} else {
				//An axios error
				let msg = '';
				let code = '';
	
				if(result.status === 400) {
					msg = result.message;
					code = result.code;
				} else {
					//It is error from the back end
					msg = result.error.msg;
					code = result.error.code;
				}
				const modal = Modal.error({
					title: 'Students',
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.classrooms}/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
			setLoading(false);
		} );
    },[])
    return (
        <>
			<Flex>
				<Spin spinning={loading} tip={loadingMessage}>
					<CustomTable columns={columns} source={filteredStudents} searchIconColor={Color.classrooms} rowKey='userid' filter={filterTable}/>
					<AddButton hint='Print class list' color={Color.classrooms} icon={<PrinterIcon/>} top='-50px' float='right' onClick={printClasslist}/>
				</Spin>
			</Flex>
		</>
    );
};

const Flex = styled.div``;

export default ClassroomStudentsTab;