import { FaCamera } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useRef } from 'react';

function ProfilePage() {
  const { authUser, onlineUsers, updateProfile } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    console.log(authUser);
  }, [authUser]);

  async function handlePictureSubmit(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  }

  return (
    <div className="h-full w-full grid grid-cols-2 p-10 box-border gap-5">
      <div className="h-[100%] w-full bg-[#0b0b0b] rounded-[.2rem]  flex flex-col items-center gap-10 justify-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-white text-2xl">Profile</h1>
          <p className="text-white text-sm">Your profile information</p>
        </div>
        <div className="rounded-full w-30 h-30 sm:w-42 sm:h-42 md:w-50 md:h-50 relative">
          <img
            src={
              authUser.profilePicture || 'src/assets/sbcf-default-avatar.png'
            }
            className='rounded-full w-30 h-30 sm:w-42 sm:h-42 md:w-50 md:h-50 absolute'
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePictureSubmit}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="rounded-[50%] absolute bottom-0 right-[1vw] p-3 w-fit h-fit cursor-pointer bg-[#3A59D1] flex items-center justify-center"
          >
            <FaCamera className=" text-white relative text-2xl " />
          </div>
        </div>
        <p className="text-[#b5b5b5]">
          Click the camera icon to update your photo
        </p>
      </div>
      <div className="grid grid-rows-2 gap-5 h-fit">
        <div className="h-[100%] w-full bg-[#0b0b0b] rounded-[.2rem] p-10 flex flex-col gap-5">
          <TextField
            label="G-mail"
            id="outlined-size-small"
            defaultValue="Small"
            value={authUser.email}
            size="small"
            InputProps={{
              sx: {
                color: 'white', // input text color
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'whitesmoke', // label color
              },
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2c2c2c', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#2c2c2c', // Border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2c2c2c', // Border color
                },
              },
            }}
          />
          <TextField
            label="Full name"
            id="outlined-size-small"
            defaultValue="Small"
            value={authUser.fullName}
            size="small"
            InputProps={{
              sx: {
                color: 'white', // input text color
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'whitesmoke', // label color
              },
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2c2c2c', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#2c2c2c', // Border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2c2c2c', // Border color
                },
              },
            }}
          />
        </div>

        <div className="h-[100%] w-full bg-[#0b0b0b] rounded-[.2rem] p-5 grid grid-rows-2">
          <div className="w-full border-b border-[#212121] flex items-center justify-between">
            {' '}
            <h1 className="text-white">Member since</h1>
            <p className="text-white">
              {' '}
              {new Date(authUser.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
          <div className="w-full border-[#212121] flex items-center justify-between">
            <h1 className="text-white">Account status</h1>
            <p className="text-[#039b0d]">
              {onlineUsers.includes(authUser._id) ? 'Active' : 'Offline'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
