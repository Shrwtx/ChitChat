import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectAi } from '../../../Redux/features/Ai/aiSlice';
import { setSelectedUsers } from '../../../Redux/features/user/userSlice';
import { showSelectedUser } from '../../../Redux/features/selectedUser/selectedUserBtnSlice';

const AIButton = () => {
  const darkMode = useSelector((state) => state.darkTheme.value);
  const dispatch = useDispatch();

  const handleSelectAi = () => {
    dispatch(showSelectedUser(false));
    dispatch(setSelectedUsers(null));
    dispatch(setSelectAi(true));
  };
  return (
    <>
      <div
        className={`flex space-x-4 px-3 py-3 ${darkMode ? 'bg-slate-900 hover:bg-slate-700' : ' bg-white hover:bg-slate-200'} rounded-md my-2`}
        onClick={handleSelectAi}
      >
        <div className={`avatar `}>
          <div className="w-12 rounded-full">
            <img
              src={darkMode ? './images/ai_black.png' : './images/ai_white.png'}
              alt="profile"
            />
          </div>
        </div>
        <div className="text-sm">
          <h1>Chitty</h1>
          <span>Ask AI</span>
        </div>
      </div>
    </>
  );
};

export default AIButton;
