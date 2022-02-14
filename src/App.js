import "./App.css";
// importing components from react-router-dom package
import {
BrowserRouter as Router,
Switch,
Route,
Redirect,
} from "react-router-dom";

// import Home component
import Home from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import Project from "./Project";
import Settings from "./Settings";
import Users from "./Users";
import EmployeeList from "./EmployeeList";
import Overview from "./Overview";
import Demo from "./Demo/Demo";
import DialogFormFilled from "./Demo/DialogFormFilled";
import DialogFormNormal from "./Demo/DialogFormNormal";
import DialogFormOutlined from "./Demo/DialogFormOutlined";
import IndividualView from "./IndividualView"
import Competencies from "./Competencies";
import GeneralSettings from "./GeneralSettings";
import GeneralSettingsEdit from "./GeneralSettingsEdit";
import AddEmployee from "./AddEmployee";
import Charts from "./Chart"
function App() {
return (
	<>
	{/* This is the alias of BrowserRouter i.e. Router */}
	<Router>
		<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/profile" component={Profile} />
		<Route path="/profile-edit" component={ProfileEdit} />
		<Route path="/project" component={Project} />
		<Route path="/settings" component={Settings} />
		<Route path="/users" component={Users} />
		<Route path="/chart" component={Charts} />
		<Route path="/competencies" component={Competencies} />
		<Route path="/employees" component={EmployeeList} />
		<Route path="/overview" component={Overview} />
		<Route path="/individualview" component={IndividualView} />
		<Route path="/generalsettings" component={GeneralSettings} />
		<Route path="/generalsettingsedit" component={GeneralSettingsEdit} />
		<Route path="/demo" component={Demo} />
		<Route path="/addNewEmployee" component={AddEmployee} />
		<Route path="/dialogfield" component={DialogFormFilled} />
		<Route path="/dialognormal" component={DialogFormNormal} />
		<Route path="/dialogoutlined" component={DialogFormOutlined} />
		<Redirect to="/" />
		</Switch>
	</Router>
	</>
);
}

export default App;
