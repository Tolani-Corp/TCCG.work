"use client";

import { FormEvent, useState } from "react";

import { emitTccgConversionEvent } from "@/lib/publicConversionAnalytics";
import { tccgPublicProductContext as context } from "@/lib/publicProductContext";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactIntake() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Commercial construction");
  const [location, setLocation] = useState("");
  const [needBy, setNeedBy] = useState("");
  const [scope, setScope] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [reference, setReference] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function prepareFallbackEmail() {
    emitTccgConversionEvent("tccg_intake_email_prepared", {
      projectType,
      locationProvided: Boolean(location.trim()),
      needByProvided: Boolean(needBy.trim()),
      organizationProvided: Boolean(organization.trim()),
      downstreamState: "project_review_email_prepared",
      handoffSystem: "mailto",
    });

    const subject = encodeURIComponent(`TCCG Project Review — ${projectType}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Organization: ${organization}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project type: ${projectType}`,
        `Location: ${location}`,
        `Need-by / bid date: ${needBy}`,
        "",
        "Scope / request:",
        scope,
        "",
        "Prepared from tccg.work project-intake form.",
      ].join("\n"),
    );
    window.location.href = `mailto:info@tccg.work?subject=${subject}&body=${body}`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;

    setSubmitState("submitting");
    setReference("");
    setStatusMessage("Submitting project review request…");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          organization,
          email,
          phone,
          projectLocation: location,
          projectType,
          timeline: needBy,
          budgetRange: "",
          message: scope,
          privacyAccepted,
          smsConsent,
          website,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; reference?: string; error?: string }
        | null;

      if (!response.ok || payload?.ok !== true || !payload.reference) {
        emitTccgConversionEvent("tccg_intake_delivery_failed", {
          projectType,
          httpStatus: response.status,
          downstreamState: "project_review_delivery_failed",
          handoffSystem: "api",
        });
        setSubmitState("error");
        setStatusMessage(
          payload?.error ||
            "Online intake is temporarily unavailable. You can still send the request by email.",
        );
        return;
      }

      setReference(payload.reference);
      setSubmitState("success");
      setStatusMessage("Project review request received.");
      emitTccgConversionEvent("tccg_intake_submitted", {
        reference: payload.reference,
        projectType,
        locationProvided: Boolean(location.trim()),
        needByProvided: Boolean(needBy.trim()),
        organizationProvided: Boolean(organization.trim()),
        smsConsent,
        downstreamState: context.operationalHandoff.state,
        handoffSystem: "api",
      });
    } catch {
      emitTccgConversionEvent("tccg_intake_delivery_failed", {
        projectType,
        downstreamState: "project_review_delivery_failed",
        handoffSystem: "api",
      });
      setSubmitState("error");
      setStatusMessage(
        "Online intake could not be reached. You can still send the request by email.",
      );
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-orange-500 focus:ring-2";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} autoComplete="name" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Organization
          <input value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClass} autoComplete="organization" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Phone
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} autoComplete="tel" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Project type
          <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className={inputClass}>
            <option>Commercial construction</option>
            <option>HVAC / controls</option>
            <option>BIM / VDC</option>
            <option>Public-sector opportunity</option>
            <option>Teaming / subcontracting</option>
            <option>Vendor / supplier relationship</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Project location
          <input required value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="City, state" />
        </label>
        <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
          Need-by / bid date
          <input required value={needBy} onChange={(e) => setNeedBy(e.target.value)} className={inputClass} placeholder="Date or timeframe" />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-slate-800">
        Scope / request
        <textarea
          required
          minLength={20}
          rows={7}
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          className={inputClass}
          placeholder="Describe the project, scope, procurement method, schedule, documents available and the action you need from TCCG."
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>

      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input
            required
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1"
          />
          <span>I agree that TCCG may use the submitted information to evaluate and respond to this project-review request.</span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-1"
          />
          <span>I consent to project-related text messages at the number provided. Consent is optional.</span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "submitting" ? "Submitting…" : "Request project review"}
        </button>
        <button
          type="button"
          onClick={prepareFallbackEmail}
          className="text-sm font-semibold text-slate-700"
        >
          Prepare email instead
        </button>
      </div>

      {statusMessage ? (
        <div
          role="status"
          className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
            submitState === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : submitState === "error"
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <p>{statusMessage}</p>
          {reference ? <p className="mt-1 font-mono text-xs">Reference: {reference}</p> : null}
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Successful online submission means the approved intake destination accepted the request and returned a reference. It does not prove project acceptance, availability, licensing, bonding, insurance or other opportunity-specific qualifications. If online delivery is unavailable, use the email fallback.
      </p>
    </form>
  );
}
