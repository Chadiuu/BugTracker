import SignIn from './pages/login';
import SignUp from './pages/signUp';
import HomeComponent from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import MyBugs from './pages/MyBugs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={ <HomeComponent/> } />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path = "/overview" element = {<Overview/>}/>
        <Route path = "/mybugs" element = {<MyBugs/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
