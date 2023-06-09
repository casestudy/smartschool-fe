import  React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//import type { UploadFile, UploadProps } from 'antd';
import { Col, Modal, Row, Image, Upload, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import Compressor from 'compressorjs';

import Danger from '../../../Components/UI/Icons/Danger';
import { InboxOutlined } from '@ant-design/icons';

import Color from '../../../Components/UI/Header/Theme.json';

import { decode as base64_decode } from 'base-64';

import { useAppDispatch } from '../../../State/Hooks';
import { uploadStudentPhotoAsync, getStudentPhotoAsync } from '../../../State/Thunks/StudentsThunks';
import { UploadProps } from 'antd/es/upload/interface';

const { Dragger } = Upload;

interface Prop {
	userid?: number,
	userfullname?: string,
	matricule?: string
}

const StudentPicture: React.FC<Prop> = ({userid, matricule}) => {
	const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [img, setImg] = useState('');
	const dispatch = useAppDispatch();

	useEffect(() => {
		setLoadingMessage('Fetching student picture');
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

        const uid: any = userid;
		const connid: any = localStorage.getItem('connid');

		const data = new FormData();
		data.append("userid", uid);
		data.append("connid", connid);
		data.append("locale", locale);
		data.append("picture", '');

		dispatch(getStudentPhotoAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				setImg(result.result.value[0].picture);
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
					icon: <Danger color={Color.students}/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
    },[]) ;

	const props: UploadProps = {
		name: 'file',
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

			const size = file.size;
			if(size > 500000) {
				const modal = Modal.error({
					title: 'File too large',
					content: 'The file you selected is too large. Maximum size is 500KB.',
					icon: <Danger color={Color.students}/>
				});
	
				modal.update({});
				return false;
			}

			new Compressor(file, {
				quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
				success: (compressedResult) => {
				  	// compressedResult has the compressed file.
				  	// Use the compressed file to upload the images to your server.        
					const mat: any = matricule;
					const uid: any = userid;
					const connid: any = localStorage.getItem('connid');

					const b64 : any = localStorage.getItem('data');
					const store : any = base64_decode(b64) ;
					const locale = JSON.parse(store).result.value[0][0].locale;

					const data = new FormData();
					data.append("matricule", mat);
					data.append("userid", uid);
					data.append("connid", connid);
					data.append("locale", locale);
					data.append("picture", compressedResult);

					dispatch(uploadStudentPhotoAsync(data)).then((value) => {
						const result = value.payload ;
						if(result.error === false) {
							// We have the db results here
							const reader = new FileReader();
							reader.readAsDataURL(compressedResult); 
							reader.onloadend = function() {
								var base64data: any = reader.result; 
								//console.log(base64data.toString());               
								setImg(base64data.toString());

								const modal = Modal.info({
									title: 'Students',
									content: 'Student photo uploaded successfully!',
								});

								modal.update({});
								setLoading(false);
							}
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
				},
			});
			
			//http://192.168.8.101:3000/uploadstudentphoto https://httpbin.org/anything
			// Axios.post("http://192.168.8.101:3000/uploadstudentphoto", data)
			// 	.then(res => console.log(res))
			// 	.catch(err => console.log(err));
			return false;
		},
		onPreview(file) {
			
		},
	};	
	
    return (
        <>
			<Flex>
				<Spin spinning={loading} tip={loadingMessage}>
					<Row>
						<Col md={16}>
							<ImgCrop rotate>
								<Dragger {...props}>
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className="ant-upload-text">Just drag and drop the file here or click to select a file</p>
									<p className="ant-upload-hint" style={{color: Color.students}}>
										Maximum size is 1MB, only png, jpg and jpeg files are accepted
									</p>
								</Dragger>
							</ImgCrop>
						</Col>
						<Col md={2}></Col>
						<Col md={6}>
							<Image src={img} style={{border: "1px solid black", borderRadius: "5px"}}/>
						</Col>
					</Row>
				</Spin>
				
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentPicture;