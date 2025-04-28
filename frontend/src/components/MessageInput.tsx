import { useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import toast from 'react-hot-toast';
import useChatStore from '../store/useChatStore';

function MessageInput() {
  const [text, setText] = useState<string>('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>();
  const {sendMessage} = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')){
        toast.error("Please select an image file")
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreview(reader.result)
    };
    reader.readAsDataURL(file)
  };
  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault(); // so it does not refresh the page
    
    // if(!text.trim() && !imagePreview) return;

    try{
    await sendMessage({
        text: text.trim(),
        image: imagePreview
    })
    setText("");
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = "";

    }catch(error){
        console.error("Faild to send message:", error)
    }
  };

  return (
    <div className="p-4 w-full ">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#3A59D1]
              flex items-center justify-center"
              type="button"
            >
              <IoIosClose className="text-white text-2xl cursor-pointer" />
            </button>
          </div>
        </div>
      )}
      <form
        action=""
        onSubmit={handleSendMessage}
        className="flex items-center gap-2"
      >
        <div className="flex-1 flex gap-3">
          <input
            placeholder="Type a message..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-3 outline-none text-white w-full input border border-[#171717] rounded-lg input-sm sm:inpt-md"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className='flex flex-row gap-3'>

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle cursor-pointer  items-center
                ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
                onClick={() => fileInputRef.current?.click()}
                >
            <IoImageOutline size={20} />
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-circle cursor-pointer"
            disabled={!text.trim() && !imagePreview}
            >
            <IoIosSend size={22} className='text-[#3A59D1]' />
          </button>
              </div>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
