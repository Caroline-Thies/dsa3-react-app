import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
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
