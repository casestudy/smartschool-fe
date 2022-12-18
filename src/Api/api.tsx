import axios, { AxiosResponse } from 'axios';
import { PostType} from './Models/Post.interface';
import { baseURL } from '../AppEnv';
import { url } from 'inspector';

const instance = axios.create({
	baseURL,
	timeout: 300000
});

const headers = {
	'Content-Type': 'application/json'
};

const responseBody = (response: AxiosResponse) => response.data;

const requests = { 
	get: (url: string) => instance.get(url, { headers }).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body, { headers }).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body, { headers }).then(responseBody),
	delete: ( url: string) => instance.delete(url).then(responseBody), 
};

export const Post = {
	loginUser: (params: {}): Promise <any> => requests.post(`login`, params),
	fetchRoles: (params: {}): Promise <any> => requests.post(`getallroles`, params),
	createRole: (params: {}): Promise <any> => requests.post(`createrole`, params),
	updateRole: (params: {}): Promise <any> => requests.post(`updaterole`, params),
	getRolePerms: (params: {}): Promise <any> => requests.post(`getroleperms`, params),
	deleteRolePerm: (params: {}): Promise <any> => requests.post(`removeprivfromrole`, params),
	getPermTypes: (params: {}): Promise <any> => requests.post(`getpermtypes`, params),
	addPermToRole: (params: {}): Promise <any> => requests.post(`addprivtorole`, params),
	addPermsToRole: (params: {}): Promise <any> => requests.post(`addprivstorole`, params),
	deleteRolePerms: (params: {}): Promise <any> => requests.post(`removeprivsfromrole`, params),

	//Sub role apis
	fetchRoleSubRoles: (params: {}): Promise <any> => requests.post(`getsubroles`, params),
	addRoleToTole: (params: {}): Promise <any> => requests.post(`addroletorole`, params),
	addRolesToTole: (params: {}): Promise <any> => requests.post(`addrolestorole`, params),
	removeRoleFromTole: (params: {}): Promise <any> => requests.post(`removerolefromrole`, params),
	removeRolesFromTole: (params: {}): Promise <any> => requests.post(`removerolesfromrole`, params),
	removeRole: (params: {}): Promise <any> => requests.post(`removerole`, params),

	//Subjects APi
	fetchSubjects: (params: {}): Promise <any> => requests.post(`getallsubjects`, params),
	createSubject: (params: {}): Promise <any> => requests.post(`createsubject`, params),
	updateSubject: (params: {}): Promise <any> => requests.post(`modifysubject`, params),
	fetchGroups: (params: {}): Promise <any> => requests.post(`getgroups`, params),
	createGroup: (params: {}): Promise <any> => requests.post(`creategroup`, params),
	updateGroup: (params: {}): Promise <any> => requests.post(`editgroup`, params),
	deleteGroup: (params: {}): Promise <any> => requests.post(`removegroup`, params),
	fetchGroupSubjects: (params: {}): Promise <any> => requests.post(`getgroupsubjects`, params),
	addGroupSubject: (params: {}): Promise <any> => requests.post(`addgroupsubject`, params),
	removeGroupSubject: (params: {}): Promise <any> => requests.post(`removegroupsubject`, params),

	//Classrooms API
	fetchClassrooms: (params: {}): Promise <any> => requests.post(`getallclassrooms`, params),
	createClassroom: (params: {}): Promise <any> => requests.post(`createclassroom`, params),
	updateClassroom: (params: {}): Promise <any> => requests.post(`modifyclassroom`, params),
	fetchClassroomTeacher: (params: {}): Promise <any> => requests.post(`getclassroomteachers`, params),

	//Users API
	fetchUsers: (params: {}): Promise <any> => requests.post(`getallusers`, params),
	createUser: (params: {}): Promise <any> => requests.post(`createuser`, params),
	editUser: (params: {}): Promise <any> => requests.post(`modifyuser`, params),
	getUserRoles: (params: {}): Promise <any> => requests.post(`getuserroles`, params),
	removeUserRole: (params: {}): Promise <any> => requests.post(`removeuserrole`, params),
	removeUserRoles: (params: {}): Promise <any> => requests.post(`removeuserroles`, params),
	addUserRole: (params: {}): Promise <any> => requests.post(`addroletouser`, params),
	addUserRoles: (params: {}): Promise <any> => requests.post(`addrolestouser`, params),

	//Teachers API
	fetchTeacherSubjects: (params: {}): Promise <any> => requests.post(`getteachersubjects`, params),
	addTeacherSubjects: (params: {}): Promise <any> => requests.post(`addteachersubjects`, params),

	//Students API
	fetchStudents: (params: {}): Promise <any> => requests.post(`getallstudents`, params),
	createStudent: (params: {}): Promise <any> => requests.post(`createstudent`, params),
	editStudent: (params: {}): Promise <any> => requests.post(`modifystudent`, params),
	fetchStudentParents: (params: {}): Promise <any> => requests.post(`getstudentparents`, params),
	removeStudentParent: (params: {}): Promise <any> => requests.post(`removestudentparent`, params),
	addStudentParent: (params: {}): Promise <any> => requests.post(`addstudentparent`, params),
}