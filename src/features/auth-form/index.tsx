import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/shared/api/supabase";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/kit/dialog";
import { LogIn } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useTheme } from "@/shared/stores/use-theme-store";
import ru from "@/shared/i18n/ru.json";

export function AuthForm() {
  const { theme } = useTheme();
  return (
    <Dialog>
      <DialogTrigger className="relative hover:bg-blue-200 hover:cursor-pointer p-[6px] rounded-md">
        <LogIn className="size-6 scale-100 rotate-0 transition-all text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Добро пожаловать</h1>
            <p className="text-muted-foreground mt-2">
              Войдите в свой аккаунт или создайте новый
            </p>
          </div>
        </DialogTitle>
        <div className="w-full max-w-md">
          <Auth
            supabaseClient={supabase}
            providers={[]}
            redirectTo={window.location.origin}
            theme={theme === "dark" ? "dark" : "light"}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: "linear-gradient(to right, #3b82f6, #2563eb)",
                },
              },
            }}
            localization={{
              variables: ru,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
