import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — RivalV2" }] }),
  component: AdminPage,
});

type LicenseRow = {
  id: string;
  key: string;
  user_id: string | null;
  user_email: string | null;
  assigned_at: string | null;
  created_at: string;
  notes: string | null;
};

function genKey() {
  const part = () =>
    Array.from({ length: 4 }, () =>
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
    ).join("");
  return `R2-${part()}-${part()}-${part()}`;
}

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin(user?.id);

  const [rows, setRows] = useState<LicenseRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [newKey, setNewKey] = useState(genKey());
  const [assignEmail, setAssignEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (isAdmin === false) navigate({ to: "/dashboard" });
  }, [isAdmin, navigate]);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("license_keys_with_email")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((data ?? []) as LicenseRow[]);
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  async function createKey(e: React.FormEvent) {
    e.preventDefault();
    if (!newKey.trim()) return;
    setBusy(true);
    try {
      let user_id: string | null = null;
      if (assignEmail.trim()) {
        const { data, error } = await supabase.rpc("get_user_id_by_email", {
          _email: assignEmail.trim(),
        });
        if (error) throw error;
        if (!data) {
          toast.error("No user with that email");
          setBusy(false);
          return;
        }
        user_id = data as string;
      }
      const { error } = await supabase.from("license_keys").insert({
        key: newKey.trim(),
        user_id,
        notes: notes.trim() || null,
        assigned_at: user_id ? new Date().toISOString() : null,
      });
      if (error) throw error;
      toast.success("License key created");
      setNewKey(genKey());
      setAssignEmail("");
      setNotes("");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function assignToEmail(id: string) {
    const email = prompt("Assign to user email:");
    if (!email) return;
    const { data, error } = await supabase.rpc("get_user_id_by_email", { _email: email });
    if (error) return toast.error(error.message);
    if (!data) return toast.error("No user with that email");
    const { error: e2 } = await supabase
      .from("license_keys")
      .update({ user_id: data as string, assigned_at: new Date().toISOString() })
      .eq("id", id);
    if (e2) return toast.error(e2.message);
    toast.success("Assigned");
    load();
  }

  async function unassign(id: string) {
    const { error } = await supabase
      .from("license_keys")
      .update({ user_id: null, assigned_at: null })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Unassigned");
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this license key?")) return;
    const { error } = await supabase.from("license_keys").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  }

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <span className="font-display font-bold">Admin</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <section className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6">
          <h2 className="font-display text-xl font-bold mb-4">Create License Key</h2>
          <form onSubmit={createKey} className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Key</label>
              <div className="flex gap-2">
                <input
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setNewKey(genKey())}
                  className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
                >
                  Random
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Assign to email (optional)
              </label>
              <input
                type="email"
                value={assignEmail}
                onChange={(e) => setAssignEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Notes</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-4">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand hover:opacity-95 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" /> Create Key
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/40">
            <h2 className="font-display text-xl font-bold">All License Keys ({rows.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Key</th>
                  <th className="px-6 py-3">Assigned To</th>
                  <th className="px-6 py-3">Notes</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border/40">
                    <td className="px-6 py-3 font-mono">{r.key}</td>
                    <td className="px-6 py-3">
                      {r.user_email ?? <span className="text-muted-foreground">— unassigned —</span>}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{r.notes ?? ""}</td>
                    <td className="px-6 py-3 text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-right space-x-1">
                      {r.user_id ? (
                        <button
                          onClick={() => unassign(r.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-accent"
                        >
                          <UserX className="h-3 w-3" /> Unassign
                        </button>
                      ) : (
                        <button
                          onClick={() => assignToEmail(r.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-accent"
                        >
                          Assign
                        </button>
                      )}
                      <button
                        onClick={() => remove(r.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                      No license keys yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
