import SideBar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import useChatStore from '../store/useChatStore';

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-full w-full grid [grid-template-columns:0.5fr_1fr] p-10 box-border gap-5 overflow-hidden">      {' '}
      <SideBar />
      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    </div>
  );
}

export default HomePage;
