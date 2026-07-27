import { SignIn, SignUp } from "@clerk/nextjs";

function clerkConfigured() {
  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const secret = process.env.CLERK_SECRET_KEY ?? "";
  return /^pk_(test|live)_/.test(publishable) && /^sk_(test|live)_/.test(secret);
}

export function PortalAuth({ mode }: { mode: "sign-in" | "sign-up" }) {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-slate-100 px-4 py-16 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">TCCG protected workspace</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">{mode === "sign-in" ? "Authorized access" : "Request portal access"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Operations and capture information is limited to approved team members, clients, and project partners.
          </p>
        </div>

        {clerkConfigured() ? (
          mode === "sign-in" ? <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" /> : <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-slate-700">
            The protected portal is not yet configured in this environment. Contact the project team through the public project-review form or call the TCCG line.
          </div>
        )}
      </div>
    </main>
  );
}
