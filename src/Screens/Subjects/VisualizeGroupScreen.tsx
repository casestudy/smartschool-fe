import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from 'react-router-dom';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';
import Danger from '../../Components/UI/Icons/Danger';
import PlusIcon from '../../Components/UI/Icons/PlusIcon';

import CustomTable from '../../Components/UI/Table/CustomTable';
import AddButton from '../../Components/UI/Button/AddButton';

import Header from '../../Components/UI/Header/Header';
import CustomModal from '../../Components/UI/Modal/Modal';

import { Col, Modal, Row, Spin } from "antd";

import { useAppDispatch } from "../../State/Hooks";
import { fetchGroupsubjectsAsync } from '../../State/Thunks/SubjectsThunk';

const VisualizeGroupScreen: React.FC<any> = () => {
    const [loading, setLoading] = useState(true);
	const [originalSubjects, setOriginalSubjects] = useState([]);
	const [filteredSubjects, setFilteredSubjects] = useState([]);

    const [isAddSubjectsToGroupModalOpen, setIsAddSubjectsToGroupModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalLoadingMessage, setModalLoadingMessage] = useState('');
    const [originalAddSubjects, setOriginalAddSubjects] = useState([]);
	const [filteredAddSubjects, setFilteredAddSubjects] = useState([]);
    const [selectedSubjectsBatch, setSelectedSubjectsBatch] = useState<string[]>([]);

    let ll: any = localStorage.getItem('lastlogin');
    
	const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { state } = useLocation();

    const filterTable = (e: any) => {
		const filt = originalSubjects.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredSubjects(filt);
	};

    const filterAddTable = (e: any) => {
		const filt = originalAddSubjects.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredAddSubjects(filt);
	};

    const handleCancelAddGroupSubjects = () => {
		setIsAddSubjectsToGroupModalOpen(false);
		setSelectedSubjectsBatch([]);
	};

    const handleOnCloseAddGroupSubjectsModal= () => {
		setSelectedSubjectsBatch([]);
	};

    const handleOkAddGroupSubjects = () => {

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
			// render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
			// 	<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
			// 		onClick={() => {
			// 			//console.log(row.sname);
			// 			navigate('/subjects/new', {
			// 				state: {
			// 					title: 'Modify Subject', 
			// 					subjectid: row.subjectid,
			// 					subjectname: row.sname,
			// 					subjectcode: row.code,
			// 					subjectcoef: row.coefficient,
			// 					subjectdesc: row.descript
			// 				}
			// 			})
			// 		}}>
			// 		<PenIcon color='#5E92A8' size='18px' line='20px'/> 
			// 	</Button>
			// </Flex>
		},
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    const addSubjectscolumns = [
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
			// render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
			// 	<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
			// 		onClick={() => {
			// 			//console.log(row.sname);
			// 			navigate('/subjects/new', {
			// 				state: {
			// 					title: 'Modify Subject', 
			// 					subjectid: row.subjectid,
			// 					subjectname: row.sname,
			// 					subjectcode: row.code,
			// 					subjectcoef: row.coefficient,
			// 					subjectdesc: row.descript
			// 				}
			// 			})
			// 		}}>
			// 		<PenIcon color='#5E92A8' size='18px' line='20px'/> 
			// 	</Button>
			// </Flex>
		},
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    useEffect(() => {
		const data = {
			connid: localStorage.getItem('connid'),
            groupid: state.groupid
		};

		dispatch(fetchGroupsubjectsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredSubjects(dataSource);
				setOriginalSubjects(dataSource);
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
					icon: <Danger/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}, [])

    return (
        <>
			<Flex>
                <Header title='Groups' loggedin={true} lastlogin={ll}></Header>
                <Row>
                    <Col md={18}>
                        <Flex style={{padding: "5rem 5rem 1px 5rem", display: "flex"}}>
							<BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {navigate('/groups')}}/>
							</BackArrow>
							<Flex style={{columnGap: '1rem', display: 'flex'}}>
								<Title>Group</Title> <Title style={{textTransform: 'lowercase'}}>"{state.title}"</Title> <Title>Details</Title>
							</Flex>
                        </Flex>

                        <Spin spinning={loading} tip="Fetching group subjects...">
                            <Flex style={{padding: "2rem 5rem 1px 5rem"}}>
                                <CustomTable columns={columns} source={filteredSubjects} searchIconColor='#351C75' rowKey='subjectid' filter={filterTable}/>
                                <AddButton hint='Add subjects to group' icon={<PlusIcon/>} top='-50px' float='right' color='#351C75' onClick={() => {
                                    setSelectedSubjectsBatch([]); //Reset the subject bactch to initial state
                                    setIsAddSubjectsToGroupModalOpen(true);
                                }}/>
                            </Flex>
                        </Spin>

                        <CustomModal visible={isAddSubjectsToGroupModalOpen} title='All subjects' onClose={handleOnCloseAddGroupSubjectsModal}
                                        columns={addSubjectscolumns} source={filteredAddSubjects} okText='Add selected subjects' tableKey='subjectid'
                                        spin={modalLoading} spinMessage={modalLoadingMessage} onFilter={filterAddTable} onOk={handleOkAddGroupSubjects} 
                                        okDisabled={selectedSubjectsBatch.length > 0? false : true} onCancel={handleCancelAddGroupSubjects} width={1000} okColor='#351C75'/>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Flex>
        </>
    );
};

const Flex = styled.div``;
const BackArrow = styled.div`
    width: 5%;
    & button {
        background: transparent !important;
        border: none
    }
`;
const Title = styled.div`
	font-size: 1.125rem;
	font-weight: 800;
	text-transform: uppercase;
`;
const StyledFormBody = styled.div`
    display: flex;
	font-size: 1rem;
`;
const Filler = styled.div`
	width: 5%;
`;
export default VisualizeGroupScreen;