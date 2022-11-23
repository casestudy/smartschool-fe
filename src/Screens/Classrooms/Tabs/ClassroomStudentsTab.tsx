import  React, { useEffect, useState } from 'react';
import CreateRoleForm from '../../../Components/Form/Role/CreateRoleForm';

const ClassroomStudentsTab: React.FC<any> = ({}) => {
    const [roleId, setRoleId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");

    useEffect(() => {
        // const role: any = localStorage.getItem("role");
        // const roleDetails = JSON.parse(role);
        // setRoleId(roleDetails.roleid);
        // setRoleName(roleDetails.rname);
        // setRoleDescription(roleDetails.descript);
    })
    return (
        <>
			
		</>
    );
};

export default ClassroomStudentsTab;