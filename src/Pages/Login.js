import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iljerwmukflkawazktjy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsamVyd211a2Zsa2F3YXprdGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwNzYzMzEsImV4cCI6MTk4ODY1MjMzMX0.JxH5wsjqq87IvbXVZP0J0u544YDWmt44YVBOEWzXBd4"
);

export default function Login(props) {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      props.navigate("Home");
    } else {
      props.navigate("Login");
    }
  });
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["discord"]}
      />
    </div>
  );
}
