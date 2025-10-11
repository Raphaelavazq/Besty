import { Info } from "lucide-react";

export default function StudyNotice() {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-start gap-3">
      <Info className="text-purple-600 mt-0.5 flex-shrink-0" size={18} />
      <div className="text-sm text-purple-800">
        <p className="font-medium mb-1">
          Nur zur persönlichen Prüfungsvorbereitung
        </p>
        <p className="text-purple-700">
          Diese Inhalte sind ausschließlich für das individuelle Studium
          bestimmt. Weitergabe oder kommerzielle Nutzung ist nicht gestattet.
        </p>
      </div>
    </div>
  );
}
