import { AiOutlineMessage } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { useAuthStore } from '../../store/useAuthStore';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function NavbarHomePage() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-black w-full p-5 flex items-center justify-between gap-1.5">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="logo text-white text-xl p-2 bg-[#3A59D1] flex items-center justify-center rounded-[.2rem]">
            <AiOutlineMessage />
          </div>
          <h1 className="text-white">Chatty.app</h1>
        </div>

        <ul className="text-white flex gap-4">
          <li className="flex items-center gap-1 justify-center">
            <CgProfile />

            <Stack direction="row" spacing={2}>
              <Button
                color="secondary"
                sx={{ color: 'white' }}
                onClick={() => navigate('/profile')}
              >
                Profile
              </Button>
            </Stack>
          </li>
          <li className="flex items-center gap-1 justify-center">
            <CiLogout />

            <Stack direction="row" spacing={2}>
              <Button
                onClick={logout}
                color="secondary"
                sx={{ color: 'white' }}
              >
                Log out
              </Button>
            </Stack>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavbarHomePage;
