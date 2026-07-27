"use client";

import { FormEvent, useMemo, useState } from "react";

import { TCCG_CONTACT } from "@/lib/contact";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; mailtoHref: string };

const projectTypes = [
  "HVAC modernization or replacement",
  "Building controls or smart-building integration",
  "BIM or MEP coordination",
  "Commercial renovation or tenant improvement",
  "Facility assessment or retrofit planning",
  "Public-sector or government opportunity",
  "Subcontracting or teaming opportunity",
  "Existing-project support",
  "Other",
] as const;

const timelineOptions = [
  "Immediate safety or operational issue",
  "Within 30 days",
  "Within 60–90 days",
  "Within 3–6 months",
  "Planning for a later date",
] as const;

function buildMailto(form: HTMLFormElement) {
  const data = new FormData(form);
  const subject = encodeURIComponent(`TCCG project review — ${String(data.get("projectType") || "General inquiry")}`);
  const body = encodeURIComponent(
    [
      `Name: ${String(data.get("fullName") || "")}`,
      `Organization: ${String(data.get("organization") || "")}`,
      `Email: ${String(data.get("email") || "")}`,
      `Phone: ${String(data.get("phone") || "")}`,
      `Project location: ${String(data.get("projectLocation") || "")}`,
      `Project type: ${String(data.get("projectType") || "")}`,
      `Timeline: ${String(data.get("timeline") || "")}`,
      `Budget range: ${String(data.get("budgetRange") || "Not provided")}`,
      "",
      String(data.get("message") || ""),
    ].join("\n"),
  );

  return `mailto:${TCCG_CONTACT.email}?subject=${subject}&body=${body}`;
}

export function ProjectIntakeForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const isSubmitting = state.status === "submitting";
  const statusMessage = useMemo(() => {
    if (state.status === "success") return `Request received. Reference ${state.reference}.`;
    if (state.status === "error") return state.message;
    if (state.status === "submitting") return "Submitting your project request.";
    return "";
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const mailtoHref = buildMailto(form);

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      organization: String(formData.get("organization") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      projectLocation: String(formData.get("projectLocation") || "").trim(),
      projectType: String(formData.get("projectType") || "").trim(),
      timeline: String(formData.get("timeline") || "").trim(),
      budgetRange: String(formData.get("budgetRange") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      privacyAccepted: formData.get("privacyAccepted") === "on",
      smsConsent: formData.get("smsConsent") === "on",
      website: String(formData.get("website") || ""),
    };

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; reference?: string; error?: string }
        | null;

      if (!response.ok || !result?.ok || !result.reference) {
        throw new Error(result?.error || "Online intake is temporarily unavailable.");
      }

      form.reset();
      setState({ status: "success", reference: result.reference });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Online intake is temporarily unavailable.",
        mailtoHref,
      });
    }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" autoComplete="name" required />
        <Field label="Organization" name="organization" autoComplete="organization" />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
        <Field label="Project city or address" name="projectLocation" autoComplete="street-address" required />
        <div>
          <label htmlFor="projectType" className="text-sm font-bold text-slate-800">Project type</label>
          <select id="projectType" name="projectType" required defaultValue="" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10">
            <option value="" disabled>Select a project type</option>
            {projectTypes.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="text-sm font-bold text-slate-800">Desired timeline</label>
          <select id="timeline" name="timeline" required defaultValue="" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10">
            <option value="" disabled>Select a timeline</option>
            {timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <Field label="Estimated budget range" name="budgetRange" placeholder="Optional" />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-bold text-slate-800">Project summary</label>
        <textarea id="message" name="message" required minLength={20} rows={6} placeholder="Describe the facility, requested work, present conditions, access constraints, plans or specifications available, and the outcome you need." className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-slate-950 shadow-sm focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10" />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
          <input name="privacyAccepted" type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
          <span>I agree that TC Construction Group may use this information to evaluate and respond to my request, subject to the privacy notice.</span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
          <input name="smsConsent" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
          <span>I consent to receiving project-related calls or texts at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.</span>
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-wait disabled:opacity-60">
          {isSubmitting ? "Submitting…" : "Request project review"}
        </button>
        <a href={TCCG_CONTACT.phone.telHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">
          Call {TCCG_CONTACT.phone.display}
        </a>
      </div>

      <div aria-live="polite" className="mt-4 min-h-6 text-sm font-semibold">
        {state.status === "success" ? <p className="text-emerald-700">{statusMessage}</p> : null}
        {state.status === "error" ? (
          <p className="text-red-700">
            {statusMessage} <a href={state.mailtoHref} className="underline">Send the request by email instead.</a>
          </p>
        ) : null}
        {state.status === "submitting" ? <p className="text-slate-500">{statusMessage}</p> : null}
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required = false, ...props }: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold text-slate-800">{label}</label>
      <input id={name} name={name} type={type} required={required} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10" {...props} />
    </div>
  );
}
