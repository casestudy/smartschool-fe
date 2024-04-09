import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Theme from './Theme';
import { GlobalStyles } from './Theme/Globalstyles';
import './Theme/style.css';
import 'antd/dist/antd.css'
import LoginScreen from './Screens/Login/LoginScreen';
import DashboardScreen from './Screens/Dashboard/DashboardScreen';
import RoleScreen from './Screens/Roles/RoleScreen';
import CreateRoleScreen from './Screens/Roles/CreateRoleScreen';
import VisualizeRoleScreen from './Screens/Roles/VisualizeRoleScreen';

import SubjectScreen from './Screens/Subjects/SubjectScreen';
import CreateSubjectScreen from './Screens/Subjects/CreateSubjectScreen';

import GroupScreen from './Screens/Subjects/GroupScreen';
import CreateGroupScreen from './Screens/Subjects/CreateGroupScreen';
import VisualizeGroupScreen from './Screens/Subjects/VisualizeGroupScreen';

import ClassroomScreen from './Screens/Classrooms/ClassroomScreen';
import CreateClassroomScreen from './Screens/Classrooms/CreateClassroomScreen';
import VisualizeClassroomScreen from './Screens/Classrooms/VisualizeClassroomScreen';

import TeacherScreen from './Screens/Teachers/TeacherScreen';
import CreateUserScreen from './Screens/Users/CreateUserScreen';
import VisualizeUserScreen from './Screens/Users/VisualizeUserScreen';

import AdministratorScreen from './Screens/Administrators/AdministratorScreen';

import StudentScreen from './Screens/Students/StudentScreen';
import CreateStudentScreen from './Screens/Students/CreateStudentScreen';
import VisualizeStudentScreen from './Screens/Students/VisualizeStudentScreen';

import CalendarScreen from './Screens/Calendar/CalendarScreen';
import CreateAcademicYearScreen from './Screens/Calendar/CreateAcademicYearScreen';
import AcademicTermScreen from './Screens/Calendar/AcademicTermsScreen';
import CreateAcademicTermScreen from './Screens/Calendar/CreateAcademicTermScreen';
import SequenceScreen from './Screens/Calendar/SequenceScreen';
import CreateSequenceScreen from './Screens/Calendar/CreateExaminationScreen';

import { ThemeProvider } from 'styled-components';

const App = () => {
	let loggedin = localStorage.getItem("loggedin");
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={loggedin === 'true'? <DashboardScreen/> : <LoginScreen/>}/>
					<Route path="/dashboard" element={loggedin === 'true'? <DashboardScreen/> : <LoginScreen/>} />
					<Route path="/roles" element={loggedin === 'true'? <RoleScreen/> : <LoginScreen/>} />
					<Route path="/roles/new" element={loggedin === 'true'? <CreateRoleScreen/> : <LoginScreen/>} />
					<Route path="/roles/visualize" element={loggedin === 'true'? <VisualizeRoleScreen/> : <LoginScreen/>} />

					<Route path="/subjects" element={loggedin === 'true'? <SubjectScreen/> : <LoginScreen/>} />
					<Route path="/subjects/new" element={loggedin === 'true'? <CreateSubjectScreen/> : <LoginScreen/>} />

					<Route path="/groups" element={loggedin === 'true'? <GroupScreen/> : <LoginScreen/>} />
					<Route path="/groups/new" element={loggedin === 'true'? <CreateGroupScreen/> : <LoginScreen/>} />
					<Route path="/groups/visualize" element={loggedin === 'true'? <VisualizeGroupScreen/> : <LoginScreen/>} />

					<Route path="/classrooms" element={loggedin === 'true'? <ClassroomScreen/> : <LoginScreen/>} />
					<Route path="/classrooms/new" element={loggedin === 'true'? <CreateClassroomScreen/> : <LoginScreen/>} />
					<Route path="/classroom/visualize" element={loggedin === 'true'? <VisualizeClassroomScreen/> : <LoginScreen/>} />

					<Route path="/teachers" element={loggedin === 'true'? <TeacherScreen/> : <LoginScreen/>} />
					<Route path="/user/new" element={loggedin === 'true'? <CreateUserScreen/> : <LoginScreen/>} />
					<Route path="/user/visualize" element={loggedin === 'true'? <VisualizeUserScreen/> : <LoginScreen/>} />

					<Route path="/administrators" element={loggedin === 'true'? <AdministratorScreen/> : <LoginScreen/>} />

					<Route path="/students" element={loggedin === 'true'? <StudentScreen/> : <LoginScreen/>} />
					<Route path="/student/new" element={loggedin === 'true'? <CreateStudentScreen/> : <LoginScreen/>} />
					<Route path="/student/visualize" element={loggedin === 'true'? <VisualizeStudentScreen/> : <LoginScreen/>} />

					<Route path="/calendar" element={loggedin === 'true'? <CalendarScreen/> : <LoginScreen/>} />
					<Route path="/calendar/new" element={loggedin === 'true'? <CreateAcademicYearScreen/> : <LoginScreen/>} />
					<Route path="/calendar/terms" element={loggedin === 'true'? <AcademicTermScreen/> : <LoginScreen/>} />
					<Route path="/calendar/terms/new" element={loggedin === 'true'? <CreateAcademicTermScreen/> : <LoginScreen/>} />
					<Route path="/calendar/terms/visualize" element={loggedin === 'true'? <SequenceScreen/> : <LoginScreen/>} />
					<Route path="/calendar/exam/new" element={loggedin === 'true'? <CreateSequenceScreen/> : <LoginScreen/>} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
