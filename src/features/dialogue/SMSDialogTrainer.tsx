import React from "react";
import aufgabeMap from "./aufgabeMap";

interface SMSDialogTrainerProps {
  dialogueNumber: number;
}

const SMSDialogTrainer: React.FC<SMSDialogTrainerProps> = ({
  dialogueNumber,
}) => {
  const aufgabe = aufgabeMap[dialogueNumber];

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white/80 backdrop-blur-md border border-purple-100 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        Aufgabe
      </h2>
      <div className="mb-6 text-base text-gray-900 whitespace-pre-line">
        {aufgabe}
      </div>
      {/* Chat interface and options would go here */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <em>Chat-Interface kommt hier...</em>
      </div>
    </div>
  );
};

export default SMSDialogTrainer;
