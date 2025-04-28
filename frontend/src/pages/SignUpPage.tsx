import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiOutlineMessage } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import Marquee from 'react-fast-marquee';

export type formDataTypes = {
  fullName: string;
  email: string;
  password: string;
};

function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<formDataTypes>({
    fullName: '',
    email: '',
    password: '',
  });

  const onCreateUserHandler = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('All fields must be filled');
    } else if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    } else if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
    } else {
      const user = signup(formData);
      if (user) {
        setFormData({
          fullName: '',
          email: '',
          password: '',
        });
      }
    }
  };

  return (
    <div className="bg-black h-full w-full grid grid-cols-2 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col justify-center text-center gap-1">
          <h1 className="text-white text-3xl">Create your account</h1>
          <p className="text-[whitesmoke] text-sm">Sign in to your account</p>
        </div>
        <form
          action=""
          className="flex flex-col gap-3 self-center w-[70%] text-white text-center"
        >
          <TextField
            id="outlined-basic"
            label="Full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder="Joe Spitch"
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
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="outlined"
            placeholder="joe@gmail.com"
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
            onClick={onCreateUserHandler}
            className="w-full mt-3"
          >
            Create account
          </Button>{' '}
          <p className="text-white text-sm">
            Already have an account?{' '}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate('/')}
            >
              Sign in
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

export default SignUpPage;
