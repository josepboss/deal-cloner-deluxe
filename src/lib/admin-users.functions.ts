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
