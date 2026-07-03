import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) return toast.error(error.message);
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
      <h1 className="text-3xl font-semibold">Home</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : user ? (
        <>
          <p className="text-muted-foreground">Signed in as {user.email}</p>
          <Button onClick={signOut}>Log out</Button>
        </>
      ) : (
        <Button asChild>
          <Link to="/auth">Sign in</Link>
        </Button>
      )}
    </div>
  );
}
