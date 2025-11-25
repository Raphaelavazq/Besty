import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();

  useEffect(() => {
    // Handle OAuth callback from Supabase
    const handleAuthCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          navigate("/auth/sign-in?error=oauth_failed");
          return;
        }

        if (session) {
          const user = session.user;

          // Check if profile exists, if not create it
          let { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (!existingProfile) {
            // Create profile for Google user
            const fullName =
              user.user_metadata.full_name ||
              user.user_metadata.name ||
              user.email?.split("@")[0] ||
              "User";
            const bundesland = "Berlin"; // Default only for NEW users

            const { data: newProfile } = await supabase
              .from("profiles")
              .insert([
                {
                  id: user.id,
                  email: user.email,
                  full_name: fullName,
                  bundesland: bundesland,
                },
              ])
              .select()
              .single();

            existingProfile = newProfile;
          }

          // Sign in to our store with data from database profile
          signIn({
            id: user.id,
            email: user.email,
            fullName: existingProfile?.full_name || user.email?.split("@")[0] || "User",
            bundesland: existingProfile?.bundesland || "Berlin",
            createdAt: user.created_at,
          });

          // Redirect to dashboard
          navigate("/dashboard");
        } else {
          // No session found
          navigate("/auth/sign-in");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/auth/sign-in?error=unknown");
      }
    };

    handleAuthCallback();

    // Also listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const user = session.user;
        
        // Load profile from database to get saved bundesland
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        signIn({
          id: user.id,
          email: user.email,
          fullName: profile?.full_name || user.email?.split("@")[0] || "User",
          bundesland: profile?.bundesland || "Berlin",
          createdAt: user.created_at,
        });
        navigate("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, signIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-white">Anmeldung wird verarbeitet...</p>
        <p className="text-sm mt-2 text-white opacity-80">Einen Moment bitte</p>
      </div>
    </div>
  );
}
