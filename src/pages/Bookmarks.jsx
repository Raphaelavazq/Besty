import { Bookmark, Heart } from "lucide-react";

export default function Bookmarks() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark size={24} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Lesezeichen
          </h1>
          <p className="text-slate-600 mb-8">
            Speichere deine Lieblingsinhalte für später
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <Heart size={40} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Noch keine Lesezeichen
            </h3>
            <p className="text-slate-500">
              Beginne damit, Inhalte zu markieren, die du später wiederfinden
              möchtest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
