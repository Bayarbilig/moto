import React from "react";

interface ModalProps {
  oil: {
    name: string;
    description: string;
    usage: string;
    images: string[];
  };
  onClose: () => void;
}

export const MotoOilModal: React.FC<ModalProps> = ({ oil, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-2xl font-bold hover:text-black"
        >
          &times;
        </button>

        {/* Image */}
        <img
          src={oil.images[0]}
          alt={oil.name}
          className="w-full aspect-video object-contain bg-white"
        />

        {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold text-red-600">{oil.name}</h2>
          <p className="text-gray-800 whitespace-pre-line">{oil.description}</p>

          <div className="text-sm text-gray-700 italic">
            <span className="font-medium">Зориулалт:</span> {oil.usage}
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            Хэрвээ та энэ тосыг авахыг хүсвэл манай мото дэлгүүр рүү холбогдоорой:<br />
            <strong className="text-red-600 text-base">📞 8957-8282</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
