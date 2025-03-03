import { Routes, Route, useLocation } from 'react-router-dom';

import SideNav from '../reusable/SideNav.jsx';

import MyTask from '../pages/MyTask.jsx';
import TaskCategories from '../pages/TaskCategories.jsx';
import Settings from '../pages/Settings.jsx';
import Help from '../pages/Help.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Profile from '../pages/Profile.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import ChangePw from '../pages/ChangePw.jsx';
import AddTask from '../pages/AddTask.jsx';

const Content = () => {
  const location = useLocation();
  const shouldShowSideNav = location.pathname !== '/register' && location.pathname !== '/login';

  return (
    <div className={`${shouldShowSideNav ? 'flex' : ''}`}>
      {shouldShowSideNav && <SideNav />}
      <main className={`${shouldShowSideNav ? 'flex-1 p-5 my-10 mx-20 border-2 border-gray-300 rounded-2xl shadow-md' : 'w-full'} `}>
        <Routes>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-task" element={<MyTask />} />
            <Route path="/task-categories" element={<TaskCategories />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/changepw" element={<ChangePw/>} />
            <Route path='/add-task' element={<AddTask />} />
        </Routes>
      </main>
    </div>
  );
};

export default Content;