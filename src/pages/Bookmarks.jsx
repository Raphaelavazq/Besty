import { Bookmark, Heart } from "lucide-react";
import { EmptyStateAnimation } from "../components/LottieAnimations";

export default function Bookmarks() {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark
              size={24}
              className="text-purple-600 dark:text-purple-400"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            Lesezeichen
          </h1>
          <p className="text-slate-600 dark:text-dark-text-secondary mb-8">
            Speichere deine Lieblingsinhalte für später
          </p>
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 dark:border-purple-500/20">
            <EmptyStateAnimation
              size="lg"
              title="Noch keine Lesezeichen"
              description="Beginne damit, Inhalte zu markieren, die du später wiederfinden möchtest."
              className="py-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
