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
  const [documents, setDocuments] = useState<File[]>([]);
  const [publicMaterialConfirmed, setPublicMaterialConfirmed] = useState(false);
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
    setStatusMessage(documents.length ? "Securely transferring documents for intake quarantine…" : "Submitting project review request…");
    if (documents.length && !publicMaterialConfirmed) {
      setSubmitState("error");
      setStatusMessage("Confirm that you are authorized to submit these non-sensitive files.");
      return;
    }

    try {
      const payload = {
        fullName: name, organization, email, phone, projectLocation: location, projectType,
        timeline: needBy, budgetRange: "", message: scope, privacyAccepted, smsConsent, website,
      };
      let response: Response;
      if (documents.length) {
        const multipart = new FormData();
        for (const [key, value] of Object.entries({ ...payload, publicMaterialConfirmed })) {
          multipart.append(key, String(value));
        }
        for (const file of documents) multipart.append("documents", file, file.name);
        response = await fetch("/api/intake/documents", { method: "POST", body: multipart });
      } else {
        response = await fetch("/api/intake", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
      }

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
      setStatusMessage(documents.length ? "Documents received into restricted quarantine; preconstruction analysis awaits security and human review." : "Project review request received.");
      setDocuments([]);
      setPublicMaterialConfirmed(false);
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

      <fieldset className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <legend className="px-2 text-sm font-bold text-slate-900">Supporting intake documents (optional)</legend>
        <p className="mb-3 text-xs leading-5 text-slate-600">
          Upload up to 12 PDF, Word, Excel, PowerPoint, ZIP, CSV, text or image files,
          maximum 4 MiB per file and 4 MiB total. ZIP archives are quarantined and not automatically unpacked.
          Files remain unapproved until security screening and preconstruction review.
        </p>
        <input aria-label="Select project files" type="file" multiple
          accept=".pdf,.docx,.xlsx,.pptx,.zip,.csv,.txt,.png,.jpg,.jpeg"
          onChange={(event) => {
            const next = Array.from(event.target.files || []);
            if (next.length > 12 || next.some((file) => file.size > 4 * 1024 * 1024 || file.size === 0) ||
                next.reduce((sum, file) => sum + file.size, 0) > 4 * 1024 * 1024) {
              setSubmitState("error");
              setStatusMessage("Select at most 12 files, 4 MiB per file and 4 MiB total.");
              setDocuments([]);
              event.target.value = "";
              return;
            }
            setDocuments(next);
            setSubmitState("idle");
            setStatusMessage("");
          }}
          className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-100 file:px-3 file:py-2 file:font-semibold file:text-orange-900" />
        {documents.length ? <p className="mt-2 text-xs text-slate-600">
          {documents.length} selected: {documents.map((file) => file.name).join(" · ")}
        </p> : null}
        {documents.length ? <label className="mt-4 flex gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" required checked={publicMaterialConfirmed}
            onChange={(e) => setPublicMaterialConfirmed(e.target.checked)} className="mt-1" />
          <span>I have authority to share these documents. They contain no classified, CUI,
            export-controlled, medical, payment-card or similarly restricted material.
            I understand they will undergo security and human review before agent processing.</span>
        </label> : null}
      </fieldset>

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
        A document receipt confirms restricted storage/quarantine, not document clearance or a consultation result. Successful online submission means the approved intake destination accepted the request and returned a reference. It does not prove project acceptance, availability, licensing, bonding, insurance or other opportunity-specific qualifications. If online delivery is unavailable, use the email fallback.
      </p>
    </form>
  );
}
