import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
  licenseKey: z.string().trim().min(3).max(64).optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
  makeAdmin: z.boolean().optional(),
});

export const createUserWithLicense = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createUserSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Authorize caller — they must be a signed-in admin
    const authHeader = getRequestHeader("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) throw new Error("Unauthorized");

    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
    if (userErr || !userData.user) throw new Error("Unauthorized");

    const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (roleErr) throw new Error(roleErr.message);
    if (!isAdmin) throw new Error("Forbidden");

    // Create the auth user (email confirmed so they can log in immediately)
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (createErr || !created.user) {
      throw new Error(createErr?.message ?? "Failed to create user");
    }
    const newUserId = created.user.id;

    // Optional: grant admin role
    if (data.makeAdmin) {
      const { error: e } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: newUserId, role: "admin" });
      if (e && !e.message.includes("duplicate")) {
        // best-effort, surface non-duplicate errors
        console.error("grant admin failed", e);
      }
    }

    // Optional: create + assign license key
    if (data.licenseKey && data.licenseKey.trim()) {
      const { error: keyErr } = await supabaseAdmin.from("license_keys").insert({
        key: data.licenseKey.trim(),
        user_id: newUserId,
        notes: data.notes?.trim() || null,
        assigned_at: new Date().toISOString(),
      });
      if (keyErr) {
        throw new Error(`User created, but license key failed: ${keyErr.message}`);
      }
    }

    return { userId: newUserId, email: created.user.email };
  });

async function assertAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const authHeader = getRequestHeader("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) throw new Error("Unauthorized");
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
  if (userErr || !userData.user) throw new Error("Unauthorized");
  const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
    _user_id: userData.user.id,
    _role: "admin",
  });
  if (roleErr) throw new Error(roleErr.message);
  if (!isAdmin) throw new Error("Forbidden");
  return { supabaseAdmin };
}

export const listLicenseKeys = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await assertAdmin();
  const { data: keys, error } = await supabaseAdmin
    .from("license_keys")
    .select("id, key, user_id, assigned_at, created_at, notes")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const userIds = Array.from(
    new Set((keys ?? []).map((k) => k.user_id).filter((v): v is string => !!v)),
  );
  const emailMap = new Map<string, string>();
  if (userIds.length) {
    // Fetch users page-by-page (admin.listUsers doesn't support filtering by ids)
    let page = 1;
    while (true) {
      const { data, error: e } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage: 200,
      });
      if (e) break;
      for (const u of data.users) if (u.email) emailMap.set(u.id, u.email);
      if (!data.users.length || data.users.length < 200) break;
      page++;
      if (page > 25) break;
    }
  }

  return (keys ?? []).map((k) => ({
    ...k,
    user_email: k.user_id ? emailMap.get(k.user_id) ?? null : null,
  }));
});
