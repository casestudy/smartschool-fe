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
}