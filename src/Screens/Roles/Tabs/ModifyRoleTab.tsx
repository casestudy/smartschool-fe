import  React, { useEffect, useState } from 'react';
import CreateRoleForm from '../../../Components/Form/Role/CreateRoleForm';

const ModifyRole: React.FC<any> = ({}) => {
    const [roleId, setRoleId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");

    useEffect(() => {
        const role: any = localStorage.getItem("role");
        const roleDetails = JSON.parse(role);
        setRoleId(roleDetails.roleid);
        setRoleName(roleDetails.rname);
        setRoleDescription(roleDetails.descript);

		//Allow in local storage because changing tab will need it in useEffect
		// setTimeout(() => {
		// 	localStorage.removeItem("role");
		// },3000);
    })
    return (
        <>
			<CreateRoleForm  roleid={roleId} rname={roleName} description={roleDescription}/>
		</>
    );
};

export default ModifyRole;