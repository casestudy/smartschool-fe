import  React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import type { UploadProps } from 'antd';
import { Col, Modal, Row, Image, Upload, message } from 'antd';

import Danger from '../../../Components/UI/Icons/Danger';
import { InboxOutlined } from '@ant-design/icons';

import Color from '../../../Components/UI/Header/Theme.json';

import { decode as base64_decode, encode as base64_encode } from 'base-64';

import { useAppDispatch } from '../../../State/Hooks';
import { uploadStudentPhotoAsync } from '../../../State/Thunks/StudentsThunks';
import Axios , {AxiosResponse, AxiosError} from 'axios';

const { Dragger } = Upload;

const { confirm, info } = Modal;

interface Prop {
	userid?: number,
	userfullname?: string,
}

const StudentPicture: React.FC<Prop> = ({userid}) => {
	const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [img, setImg] = useState('');
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	setLoadingMessage('Fetching student fees');
	// 	const b64 : any = localStorage.getItem('data');
    //     const store : any = base64_decode(b64) ;
    //     const locale = JSON.parse(store).result.value[0][0].locale;

    //     const data = {
	// 		connid: localStorage.getItem('connid'),
    //         userid: userid,
	// 		locale: locale
	// 	};

	// 	dispatch(fetchStudentFeesAsync(data)).then((value) => {
	// 		const result = value.payload ;
	// 		if(result.error === false) {
	// 			// We have the db results here
				
	// 		} else {
	// 			//An axios error
	// 			let msg = '';
	// 			let code = '';
	
	// 			if(result.status === 400) {
	// 				msg = result.message;
	// 				code = result.code;
	// 			} else {
	// 				//It is error from the back end
	// 				msg = result.error.msg;
	// 				code = result.error.code;
	// 			}
	// 			const modal = Modal.error({
	// 				title: 'Students',
	// 				content: msg + ' (' + code + ')',
	// 				icon: <Danger color={Color.students}/>
	// 			});
	
	// 			modal.update({});
	// 			setLoading(false);
	// 		}
	// 	},(error) => {
	// 		console.log("Error");
	// 		console.log(error);
	// 	} );
    // },[])

	const props: UploadProps = {
		name: 'file',
		//action: 'https://httpbin.org/anything',
		showUploadList: false,
		listType: 'picture',
		maxCount: 1,
		beforeUpload(file, FileList) {
			const type = file.type;
			const extension = type.split('/')[1];
	
			if(['png', 'jpg','jpeg'].indexOf(extension) === -1) {
				const modal = Modal.error({
					title: 'Wrong Format',
					content: 'The file you selected is not supported. Only png, jpg and jpeg file formats are accepted.',
					icon: <Danger color={Color.students}/>
				});
	
				modal.update({});
				return false;
			}
			
			var reader = new FileReader();
			reader.readAsDataURL(file); 
			reader.onloadend = function() {
				var base64data: any = reader.result;                
				console.log(base64data);
				setImg(base64data.toString());
			}
			const data = new FormData();
			data.append("name", "Test name");
			data.append("file", file);

			console.log(data);
			//http://192.168.8.101:3000/uploadstudentphoto https://httpbin.org/anything
			// Axios.post("http://192.168.8.101:3000/uploadstudentphoto", data)
			// 	.then(res => console.log(res))
			// 	.catch(err => console.log(err));
			
			dispatch(uploadStudentPhotoAsync(data)).then((value) => {
				const result = value.payload ;
				console.log(result);
				if(result.error === false) {
					// We have the db results here
					
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
						icon: <Danger color={Color.students}/>
					});
		
					modal.update({});
					setLoading(false);
				}
			},(error) => {
				console.log("Error");
				console.log(error);
			} );

			// const size = file.size;
			
			// if(size > 300000) {
			// 	const modal = Modal.error({
			// 		title: 'File too large',
			// 		content: 'The file you selected is too large. Maximum size is 1MB.',
			// 		icon: <Danger color={Color.students}/>
			// 	});
	
			// 	modal.update({});
			// 	return false;
			// }

			return false;
		},
		// customRequest(options) {
		// 	console.log(options.file);
		// },
		onChange({file, fileList}) {
			//console.log(info.file);
			console.log(file);

			// const data = new FormData();
			// data.append("name", "Test name");
			// data.append("file", info.file);

			//console.log(data);

			// Axios.post("http://192.168.8.101:3000/uploadstudentphoto", data)
			// 	.then(res => console.log(res))
			// 	.catch(err => console.log(err));

			// dispatch(uploadStudentPhotoAsync(data)).then((value) => {
			// 	const result = value.payload ;
			// 	console.log(result);
			// 	if(result.error === false) {
			// 		// We have the db results here
					
			// 	} else {
			// 		//An axios error
			// 		let msg = '';
			// 		let code = '';
		
			// 		if(result.status === 400) {
			// 			msg = result.message;
			// 			code = result.code;
			// 		} else {
			// 			//It is error from the back end
			// 			msg = result.error.msg;
			// 			code = result.error.code;
			// 		}
			// 		const modal = Modal.error({
			// 			title: 'Students',
			// 			content: msg + ' (' + code + ')',
			// 			icon: <Danger color={Color.students}/>
			// 		});
		
			// 		modal.update({});
			// 		setLoading(false);
			// 	}
			// },(error) => {
			// 	console.log("Error");
			// 	console.log(error);
			// } );
		},
		onDrop(e) {
		}
	};
	
    return (
        <>
			<Flex>
				<Row>
					<Col md={16}>
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">Just drag and drop the file here or click to select a file</p>
							<p className="ant-upload-hint" style={{color: Color.students}}>
								Maximum size is 1MB, only png, jpg and jpeg files are accepted
							</p>
						</Dragger>
					</Col>
					<Col md={2}></Col>
					<Col md={6}>
						<Image src={img}/>
					</Col>
				</Row>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentPicture;