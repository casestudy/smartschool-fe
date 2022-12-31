import  React, { useEffect, useState } from 'react';

import { Row , Col, Button, Modal, Spin, Radio } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';
import { decode as base64_decode} from 'base-64';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';
import CustomModal from '../../../Components/UI/Modal/Modal';

import Danger from '../../../Components/UI/Icons/Danger';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';
import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import MinusIcon from '../../../Components/UI/Icons/MinusIcon';
import ArrowUpIcon from '../../../Components/UI/Icons/ArrowUp';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';
import CheckboxField from '../../../Components/UI/Input/CheckBox';

import Color from '../../../Components/UI/Header/Theme.json';
import { useAppDispatch } from '../../../State/Hooks';
import { fetchTeacherSubjectsAsync, addTeacherSubjectsAsync } from '../../../State/Thunks/TeachersThunk';
import { fetchSubjectsAsync} from '../../../State/Thunks/SubjectsThunk';
import { fetchClassroomsAsync } from '../../../State/Thunks/ClassroomsThunk';
import { set } from 'immer/dist/internal';

interface Prop {
	userid?: number,
    usertype?: string,
	userfullname: string,
}

const TeacherClasses: React.FC<Prop> = ({userid, usertype}) => {

	const { confirm, info } = Modal;

    const [loading, setLoading] = useState(true);
	const [originalTeacherSubjects, setOriginalTeacherSubjects] = useState([]);
	const [filteredTeacherSubjects, setFilteredTeacherSubjects] = useState([]);
	const [selectedSubject, setSelectedSubject] = useState();
	const [allClassroomsBatch, setAllClassroomsBatch] = useState<string[]>([]);
	const [originalAllSubjects, setOriginalAllSubjects] = useState([]);
	const [filteredAllSubjects, setFilteredAllSubjects] = useState([]);

	const [originalAllClassrooms, setOriginalAllClassrooms] = useState([]);
	const [filteredAllClassrooms, setFilteredAllClassrooms] = useState([]);

	const [isAddTeacherSubjectModalOpen, setIsAddUserRoleModalOpen] = useState(false);

	const [modalLoading, setModalLoading] = useState(true);
	const [modalLoadingMessage, setModalLoadingMessage] = useState('');

    const dispatch = useAppDispatch();

	const b64 : any = localStorage.getItem('data');
	const store : any = base64_decode(b64) ;

	const filterTable = (e: any) => {
		const filt = originalTeacherSubjects.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.cname.toLowerCase().includes(e.toLowerCase()));
		setFilteredTeacherSubjects(filt);
	};

	const handleOkAddTeacherSubjectBatch = () => {
		setModalLoading(true);
		setModalLoadingMessage('Adding subjects to teacher...');

		const b64 : any = localStorage.getItem('data');
		const store : any = base64_decode(b64) ;
		const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			connid: localStorage.getItem('connid'),
			classids: allClassroomsBatch,
			userid: userid,
			subjectid: selectedSubject,
			locale:locale
		};

		dispatch(addTeacherSubjectsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredAllClassrooms(dataSource);
				setOriginalAllClassrooms(dataSource);
				setModalLoading(false);
				setIsAddUserRoleModalOpen(true);
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
					title: `Teacher subjects`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.teachers}/>
				});
	
				modal.update({});
				setModalLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
			setModalLoading(false);
		} );
	}

	const handleCancelTeacherSubjectBatch = () => {
		setIsAddUserRoleModalOpen(false);
		setAllClassroomsBatch([]);
	}

	const filterAllSubjectsTable = (e: any) => {
		const filt = originalAllSubjects.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredAllSubjects(filt);
	}

	const filterAllClassroomsTable = (e: any) => {
		const filt = originalAllClassrooms.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredAllClassrooms(filt);
	}

	const handleAddTeacherSubject = () => {
		const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchSubjectsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredAllSubjects(dataSource);
				setOriginalAllSubjects(dataSource);

				dispatch(fetchClassroomsAsync(data)).then((value) => {
					const result = value.payload ;
					//console.log(result);
					if(result.error === false) {
						// We have the db results here
						const dataSource = result.result.value;
						setFilteredAllClassrooms(dataSource);
						setOriginalAllClassrooms(dataSource);
						setModalLoading(false);
						setIsAddUserRoleModalOpen(true);
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
							title: `Classrooms`,
							content: msg + ' (' + code + ')',
							icon: <Danger color={Color.teachers}/>
						});
			
						modal.update({});
						setLoading(false);
					}
				},(error) => {
					console.log("Error");
					console.log(error);
				} );

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
					title: `Subjects`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.teachers}/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}

	const handleRadioButtonChange = (a: any) => {
		setSelectedSubject(a.target.value);
	}

    const columns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '5%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Subject name',
			dataIndex: 'sname',
			key: 'sname',
			width: '22%',
			sorter: (a: any, b: any) => a.sname.localeCompare(b.sname)
        },
        {
			title: 'Subject code',
			dataIndex: 'code',
			key: 'code',
			width: '22%'
        },
        {
			title: 'Class name and abbreviation',
			dataIndex: 'cname',
			key: 'cname',
			width: '30%',
			sorter: (a: any, b: any) => a.cname.localeCompare(b.cname),
			render: (text:any,record:any) => (record.cname + ' (' + record.abbreviation + ')')
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '5%',
        },
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '2%',
			hidden: true
		},
        {
			title: 'Classroom Id',
			dataIndex: 'classid',
			key: 'classid',
			width: '2%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	const allSubjectsColumns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '5%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Name',
			dataIndex: 'sname',
			key: 'sname',
			width: '20%',
			sorter: (a: any, b: any) => a.sname.localeCompare(b.sname)
        },
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
			width: '15%',
			sorter: (a: any, b: any) => a.code.localeCompare(b.code)
        },
		{
			title: 'Coefficient',
			dataIndex: 'coefficient',
			key: 'coefficient',
			width: '15%',
			sorter: (a: any, b: any) => a.coefficient.localeCompare(b.coefficient)
        },
        {
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '30%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Radio value={row.subjectid}/>
		},
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	const allClassroomsColumns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '2%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Name',
			dataIndex: 'cname',
			key: 'cname',
			width: '20%',
			sorter: (a: any, b: any) => a.cname.localeCompare(b.cname)
        },
		{
			title: 'Abbreviation',
			dataIndex: 'abbreviation',
			key: 'abbreviation',
			width: '15%',
			sorter: (a: any, b: any) => a.abbreviation.localeCompare(b.abbreviation)
        },
		{
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '35%',
			sorter: (a: any, b: any) => a.descript.localeCompare(b.descript)
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <CheckboxField onChange={(e:any) => {
				if(e.target.checked) {
					setAllClassroomsBatch(classroomid => [...classroomid, row.classid]);
				} else {
					allClassroomsBatch.splice(allClassroomsBatch.indexOf(row.classid), 1);
				}
			}}/>
		},
		{
			title: 'Class Id',
			dataIndex: 'classid',
			key: 'classid',
			width: '25%',
			hidden: true
		},
    ].filter(item => !item.hidden);


    useEffect(() => {
        const data = {
			connid: localStorage.getItem('connid'),
            userid: userid,
		};

        dispatch(fetchTeacherSubjectsAsync(data)).then((value) => {

			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				dataSource.map((data : any) => {
					data.key = data.classid+'/'+data.subjectid
				})
				setFilteredTeacherSubjects(dataSource);
				setOriginalTeacherSubjects(dataSource);
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
					title: usertype === 'teacher'? `Teachers` : `Administrators`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={usertype === 'teacher'? Color.teachers : Color.subjects}/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
    },[])


    return (
        <>
			<Spin spinning={loading} tip='Fetching teacher subjects...'>
				<CustomTable columns={columns} source={filteredTeacherSubjects} rowKey='key' searchIconColor={usertype === 'teacher'? Color.teachers : Color.subjects} filter={filterTable}/>
				<Flex style={{marginTop: '-50px', float:'right', display: 'flex'}}>
					<Flex style={{paddingRight: '15px'}}>
						<AddButton icon={<MinusIcon/>} color={usertype === 'teacher'? Color.teachers : Color.subjects} hint='Remove selected roles from user' onClick={() => {}} />
					</Flex>
					<AddButton icon={<PlusIcon/>} color={usertype === 'teacher'? Color.teachers : Color.subjects} hint='Add subjects to teachers' onClick={handleAddTeacherSubject}/>
				</Flex>
			</Spin>
			
			<CustomModal visible={isAddTeacherSubjectModalOpen} title='All Subjects' 
								okText='Add selected classrooms' onOk={handleOkAddTeacherSubjectBatch} onCancel={handleCancelTeacherSubjectBatch} 
								columns={allSubjectsColumns} source={filteredAllSubjects} tableKey='subjectid' onFilter={filterAllSubjectsTable} onClose={handleCancelTeacherSubjectBatch}
								okDisabled={(allClassroomsBatch.length > 0 && selectedSubject !== undefined)? false : true} spin={modalLoading} spinMessage={modalLoadingMessage} width={1000}
								okColor={usertype === 'teacher'? Color.teachers : Color.subjects}
								
								columnsC={allClassroomsColumns} sourceC={filteredAllClassrooms} tableKeyC='classid' onFilterC={filterAllClassroomsTable} 
								display='block' radio={true} radioChanged={handleRadioButtonChange}/>
		</>
    );
};

const Flex = styled.div``;

export default TeacherClasses;