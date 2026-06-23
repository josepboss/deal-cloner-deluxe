import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, Download, LogOut, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
const EXTENSION_DOWNLOAD_URL = "https://rivalv2.shop/Rival_V10.2.zip";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — RivalV2" }] }),
  component: DashboardPage,
});


function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin(user?.id);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [keyLoading, setKeyLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setKeyLoading(true);
    supabase
      .from("license_keys")
      .select("key")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) console.error(error);
        setLicenseKey(data?.key ?? null);
        setKeyLoading(false);
      });
  }, [user]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  function copyKey() {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey);
    toast.success("License key copied");
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand font-display text-sm font-bold text-primary-foreground shadow-brand">
              R2
            </span>
            <span className="font-display text-lg font-bold">
              Rival<span className="text-gradient-brand">V2</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
              >
                <Shield className="h-4 w-4" /> Admin
              </Link>
            )}
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your License Key
          </h2>
          {keyLoading ? (
            <p className="mt-4 text-muted-foreground">Loading…</p>
          ) : licenseKey ? (
            <div className="mt-4 flex items-center gap-3">
              <code className="flex-1 rounded-lg bg-muted px-4 py-3 font-mono text-lg tracking-wider">
                {licenseKey}
              </code>
              <button
                onClick={copyKey}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-brand hover:opacity-95"
              >
                <Copy className="h-4 w-4" /> Copy
              </button>
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              No license key assigned yet. Contact support to get one.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Extension Download
          </h2>
          <p className="mt-2 text-muted-foreground">
            Download the RivalV2 browser extension to start unlocking AI credits.
          </p>
          <a
            href={EXTENSION_DOWNLOAD_URL}
            download="Rival_V10.2.zip"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-brand hover:opacity-95"
          >
            <Download className="h-4 w-4" /> Download Extension
          </a>

        </div>
      </main>
    </div>
  );
}
