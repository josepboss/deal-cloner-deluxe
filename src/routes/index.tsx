import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import {
  Zap,
  Puzzle,
  Clock,
  Crown,
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Globe,
  RefreshCw,
  Headphones,
  ChevronDown,
  Download,
  MessageCircle,
  Star,
  AlertTriangle,
  Users,
  Rocket,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import extensionAsset from "@/assets/rival-extension.zip.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RivalV2 — Stop struggling with AI credit limits" },
      { name: "description", content: "Top-ups, PRO accounts and the extension that freezes your credits — all instant." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <ExtensionDownload />
        <Pricing />
        <Problem />
        <Testimonials />
        <WhyUs />
        <Guarantee />
        <Faq />
        <FinalCta />
        
      </main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="border-b border-border/60 bg-background/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-success" />
          </span>
          Online
        </span>
        <span>Instant delivery · 24/7 Support</span>
      </div>
    </div>
  );
}

function Header() {
  const { user } = useAuth();
  const nav = [
    { label: "Home", href: "#" },
    { label: "Packages", href: "#pricing" },
    { label: "Credits", href: "#pricing" },
    { label: "Extension", href: "#extension" },
    { label: "Community", href: "#community" },
    { label: "Support", href: "#faq" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand font-display text-sm font-bold text-primary-foreground shadow-brand">
            R2
          </span>
          <span className="font-display text-lg font-bold">
            Rival<span className="text-gradient-brand">V2</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Link
          to={user ? "/dashboard" : "/auth"}
          className="rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-95"
        >
          {user ? "Dashboard" : "Sign In"}
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-brand">
            <Sparkles className="h-3.5 w-3.5" />
            #1 AI Credits Platform
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-4 py-1.5 text-xs font-semibold text-success">
            <span className="h-2 w-2 rounded-full bg-success" />
            Online now
          </span>
        </div>
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Stop struggling with{" "}
          <span className="text-gradient-brand">AI credit limits.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          Top-ups directly to your account, PRO accounts ready to go, and the
          extension that freezes your credits — all instant.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-brand px-7 py-4 font-semibold text-primary-foreground shadow-glow transition hover:translate-y-[-1px]"
          >
            <Zap className="h-4 w-4" />
            Use Without Limits
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-7 py-4 font-semibold text-foreground transition hover:bg-accent"
          >
            See offers
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const items = [
    { icon: Zap, title: "Credit Top-Up", desc: "Recharge your AI credits instantly" },
    { icon: Puzzle, title: "Extensions", desc: "Powerful add-ons for every workflow" },
    { icon: Clock, title: "Instant Delivery", desc: "Get access in under 60 seconds" },
    { icon: Crown, title: "Pro Accounts", desc: "Premium features, unlimited power" },
  ];
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="card-surface group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-brand"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-brand">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExtensionDownload() {
  return (
    <section id="extension" className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="card-surface rounded-3xl p-10 md:p-14">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/40 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
              <Puzzle className="h-3.5 w-3.5" /> RivalV2 Extension
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold md:text-5xl">
              Download <span className="text-gradient-brand">Extension</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Choose the version for your device. Always the official, up-to-date link.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { label: "Desktop", version: "v1.0.12.zip" },
              { label: "Mobile", version: "—" },
            ].map((p) => (
              <div key={p.label} className="rounded-2xl border border-border bg-background/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold">{p.label}</span>
                  <code className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    {p.version}
                  </code>
                </div>
                <a
                  href={extensionAsset.url}
                  download="Rival_V10.2.zip"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-95"

                >
                  <Download className="h-4 w-4" />
                  Download {p.label}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-accent/30 p-5 md:flex-row">
            <div>
              <h4 className="font-semibold">Try it free for 30 minutes</h4>
              <p className="text-sm text-muted-foreground">
                No signup. Generate an instant trial license and test now.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20">
              Get 30-min Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [tab, setTab] = useState<"Extensions" | "Workspaces" | "Pro Accounts">("Extensions");
  const plans = [
    { name: "1 Day Extension", price: "$1", features: ["1 day access", "Instant activation", "Full features"] },
    { name: "7 Days Extension", price: "$5", features: ["7 days access", "Instant activation", "Full features", "Best for trial"] },
    { name: "15 Days Extension", price: "$9", features: ["15 days access", "Instant activation", "Full features", "Great value"], featured: true },
    { name: "30 Days Extension", price: "$15", features: ["30 days access", "Instant activation", "Full features", "Best value"] },
  ];
  return (
    <section id="pricing" className="px-6 pb-24">
      <div className="mx-auto max-w-7xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
          30% OFF — Limited Time
        </span>
        <h2 className="mt-5 font-display text-4xl font-bold md:text-5xl">
          Best price and value <span className="text-gradient-brand">in the market</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Premium AI tools at the best prices. Instant delivery guaranteed.
        </p>

        <div className="mx-auto mt-8 inline-flex rounded-2xl border border-border bg-card/60 p-1">
          {(["Extensions", "Workspaces", "Pro Accounts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                tab === t
                  ? "bg-gradient-brand text-primary-foreground shadow-brand"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card-surface relative flex flex-col rounded-2xl p-6 text-left transition hover:-translate-y-1 ${
                p.featured ? "shadow-brand ring-1 ring-primary/40" : ""
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-gradient-brand">{p.price}</span>
                <span className="text-sm text-muted-foreground">.00</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-95">
                Buy now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <button className="mt-10 inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 text-sm font-semibold transition hover:bg-accent">
          View all packages <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function Problem() {
  const bad = ["Run out of credits mid-flow", "Keep remixing projects", "Lose productivity", "Depend on daily limits"];
  const good = [
    { kicker: "Use without limits", val: "extension" },
    { kicker: "Buy cheap", val: "credits" },
    { kicker: "Or get it all ready", val: "accounts" },
  ];
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="card-surface rounded-3xl p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" /> Warning
          </span>
          <h3 className="mt-4 font-display text-3xl font-bold">You're wasting time and money</h3>
          <ul className="mt-6 space-y-3">
            {bad.map((b) => (
              <li key={b} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-destructive/20 text-destructive">×</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-surface rounded-3xl p-10 shadow-brand">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
            Solution
          </span>
          <h3 className="mt-4 font-display text-3xl font-bold">
            You won't have <span className="text-gradient-brand">that problem here</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">You choose the level.</p>
          <div className="mt-6 space-y-3">
            {good.map((g) => (
              <div key={g.kicker} className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4">
                <div>
                  <div className="text-sm text-muted-foreground">{g.kicker}</div>
                  <div className="font-display text-xl font-bold text-gradient-brand">{g.val}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const stats = [
    { value: "2,000+", label: "Orders delivered" },
    { value: "1,500+", label: "Active clients" },
    { value: "4.9", label: "Average rating" },
  ];
  const items = [
    { quote: "Best platform for AI credits. Instant delivery and the prices are unbeatable.", name: "Rahim K.", role: "Full-Stack Developer", initials: "RK" },
    { quote: "The extensions are incredible! They saved me hours of work every week.", name: "Sarah L.", role: "UI/UX Designer", initials: "SL" },
    { quote: "We switched our entire team to RivalV2 Pro accounts. The value is insane.", name: "Tanvir H.", role: "Startup Founder", initials: "TH" },
  ];
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Real testimonials</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Users <span className="text-gradient-brand">recommend us</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Over 2,000 deliveries with a 4.9-star average rating</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="card-surface rounded-2xl p-6 text-center">
              <div className="font-display text-4xl font-bold text-gradient-brand">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="card-surface rounded-2xl p-6">
              <div className="mb-3 flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-foreground/90">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Globe, title: "Browser-Based", desc: "No downloads required. Access everything from your browser." },
    { icon: Zap, title: "Zero Setup", desc: "One-click activation. Start using within seconds." },
    { icon: RefreshCw, title: "Always Updated", desc: "Automatic updates ensure you always have the latest features." },
    { icon: Headphones, title: "24/7 Support", desc: "Real humans, real help. Available around the clock." },
  ];
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl text-center">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Why choose us</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Simple, direct <span className="text-gradient-brand">and secure</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Everything designed so you can focus on what matters: creating.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.title} className="card-surface rounded-2xl p-6 text-left">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-brand">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{i.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  const items = [
    { title: "Extensions", desc: "30-day money-back guarantee on all extensions" },
    { title: "Credits", desc: "Unused credits never expire with active subscription" },
    { title: "Pro Accounts", desc: "Full refund within 7 days if not satisfied" },
  ];
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="card-surface rounded-3xl p-10">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Active Guarantee</span>
              <h3 className="mt-2 font-display text-3xl font-bold">
                Buy with <span className="text-gradient-brand">total security</span>
              </h3>
            </div>
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {items.map((i) => (
              <div key={i.title} className="rounded-2xl border border-border bg-background/40 p-6">
                <h4 className="font-display text-lg font-semibold">{i.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const qa = [
    { q: "How does credit delivery work?", a: "We deliver credits directly to your account within 60 seconds of payment confirmation." },
    { q: "Are the extensions safe to use?", a: "Yes. All extensions are tested and signed. They never request access to sensitive data." },
    { q: "Can I get a refund if I'm not satisfied?", a: "Absolutely. Extensions come with a 30-day guarantee, accounts with 7 days." },
    { q: "What payment methods do you accept?", a: "Card, PayPal, and major crypto. All processed via secure providers." },
    { q: "Do credits expire?", a: "Unused credits never expire as long as your subscription remains active." },
    { q: "How is your pricing so competitive?", a: "Volume deals with providers + automation lets us pass savings to you." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-6 pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Frequently asked <span className="text-gradient-brand">questions</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Everything you need to know before getting started.</p>
        </div>
        <div className="mt-10 space-y-3">
          {qa.map((item, idx) => (
            <button
              key={item.q}
              onClick={() => setOpen(open === idx ? null : idx)}
              className="card-surface w-full rounded-2xl p-5 text-left transition hover:bg-accent/30"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${open === idx ? "rotate-180" : ""}`}
                />
              </div>
              {open === idx && (
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="card-surface relative overflow-hidden rounded-3xl p-12 text-center shadow-glow">
          <div className="absolute inset-0 -z-10 bg-gradient-brand opacity-10" />
          <h2 className="font-display text-4xl font-bold md:text-5xl">Either you stay limited…</h2>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            or you <span className="text-gradient-brand">use it freely</span>
          </h2>
          <a
            href="#pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-brand px-8 py-4 font-semibold text-primary-foreground shadow-brand transition hover:translate-y-[-1px]"
          >
            Get Packages <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            Instant delivery · 24/7 Support · Satisfaction guarantee
          </p>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">R2</span>
          <span className="font-display font-semibold text-foreground">RivalV2</span>
        </div>
        <p>© {new Date().getFullYear()} RivalV2. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#faq" className="hover:text-foreground">Support</a>
        </div>
      </div>
    </footer>
  );
}
