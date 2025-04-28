import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiOutlineMessage } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAuthStore } from '../store/useAuthStore';

export type loginTypes = {
  email: string;
  password: string;
};
function LoginInPage() {
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const { login } = useAuthStore();
  const [formData, setFormData] = useState<loginTypes>({
    email: '',
    password: '',
  });

  const onLoginInHandler = async () => {
    const user = login(formData);
    if (user) {
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="bg-black h-full w-full grid grid-cols-2 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col justify-center text-center gap-1">
          <h1 className="text-white text-3xl">Welcome back</h1>
          <p className="text-[whitesmoke] text-sm">Sign in to your account</p>
        </div>
        <form
          action=""
          className="flex flex-col gap-3 self-center w-[70%] text-white text-center"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': {
                color: 'whitesmoke', // Label color
              },
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
                '& input': {
                  color: 'white', // Input text color
                },
              },
            }}
          />
          <div className="relative w-full flex justify-center items-center">
            <TextField
              id="outlined-basic"
              label="Password"
              type={isVisiblePassword ? 'text' : 'password'}
              value={formData.password}
              className="relative w-full"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'whitesmoke', // Label color
                },
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
                  '& input': {
                    color: 'white', // Input text color
                  },
                },
              }}
            ></TextField>
            <AiOutlineEyeInvisible
              className="text-[#b0b0b0] z-30 absolute text-1xl right-5"
              onClick={() => setIsVisiblePassword((val) => !val)}
            />
          </div>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: '#3A59D1', // Red background
              color: 'white', // White text
              borderColor: '#3A59D1',
              '&:hover': {
                backgroundColor: '#27548A', // Darker red on hover
                borderColor: '#27548A', // Darker red border on hover
              },
            }}
            className="w-full mt-3"
            onClick={onLoginInHandler}
          >
            Sign In
          </Button>
          <p className="text-white text-sm">
            Don't have an account?{' '}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate('/sign-up')}
            >
              Create account
            </span>
          </p>
        </form>
      </div>
      <div className=" relative h-full">
        <AiOutlineMessage className="text-[#171717] text-[62vw] rotate-45 absolute" />

        <div className="w-full h-full absolute flex flex-row items-stretch justify-center gap-6">
          <div className="h-full flex-1 overflow-hidden">
            <div className="h-full flex flex-col justify-center items-center overflow-hidden">
              <Marquee
                speed={100} // Adjusted speed for smoother scroll
                gradient={false} // No gradient for smoother scrolling
                direction="up"
                className="h-full w-full flex flex-col items-center justify-start" // Ensure Marquee fills parent height
              >
                {/* Content inside the marquee */}
                <div className="flex flex-col h-auto w-full gap-4 justify-start items-center">
                  <img
                    src="src/assets/marquee-img-4.jpg"
                    className="w-[15rem] rounded-[2rem] object-contain"
                    alt="smile"
                  />
                  <img
                    src="src/assets/marquee-img-1.avif"
                    className="w-[15rem] rounded-[2rem] object-contain"
                    alt="smile"
                  />
                  <img
                    src="src/assets/smile-emoji.jpg"
                    className="w-[15rem] rounded-[2rem] object-contain"
                    alt="smile"
                  />
                </div>
              </Marquee>
            </div>
          </div>

          <div className="h-full flex-1 overflow-hidden">
            {/* Parent container with full height */}
            <div className="h-full flex flex-col justify-center items-center overflow-hidden">
              <Marquee
                speed={100}
                gradient={false}
                direction="down"
                className="h-full flex flex-col items-center justify-start" // Ensure Marquee fills parent height
              >
                {/* Content inside the marquee */}
                <div className="flex flex-col gap-4 justify-start items-center">
                  <img
                    src="src/assets/marquee-img-5.png"
                    className="w-[15rem] rounded-[2rem] object-contain"
                    alt=""
                  />
                  <img
                    src="src/assets/marquee-img-2.png"
                    className="w-[15rem] rounded-[2rem] object-contain"
                    alt=""
                  />
                  <img
                    src="src/assets/marquee-img-3.avif"
                    className="w-[15rem] rounded-[2rem] object-contain"
                    alt=""
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginInPage;
