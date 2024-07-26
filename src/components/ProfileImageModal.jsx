
function ProfileImageModal({ isOpen, imageSrc, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-color-black bg-opacity-50 ">
      <div className="relative bg-white p-4 rounded-lg">
        <button onClick={onClose} className="absolute top-6 bg-color-white rounded-full w-6 h-6  right-6 text-color-black hover:text-color-grey">
          &times;
        </button>
        <img src={imageSrc} alt="Profile" className="max-w-full max-h-full rounded-lg" />
      </div>
    </div>
  );
}

export default ProfileImageModal;
