"use client";

import { FormEvent, useState } from "react";

export function ContactIntake() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Commercial construction");
  const [location, setLocation] = useState("");
  const [needBy, setNeedBy] = useState("");
  const [scope, setScope] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`TCCG Project Review — ${projectType}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Organization: ${organization}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        `Location: ${location}`,
        `Need-by / bid date: ${needBy}`,
        "",
        "Scope / request:",
        scope,
        "",
        "Submitted from tccg.work project-intake form.",
      ].join("\n"),
    );
    window.location.href = `mailto:info@tccg.work?subject=${subject}&body=${body}`;
  }

  const inputClass = "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-orange-500 focus:ring-2";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">Name<input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} /></label>
        <label className="text-sm font-semibold text-slate-800">Organization<input value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClass} /></label>
        <label className="text-sm font-semibold text-slate-800">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} /></label>
        <label className="text-sm font-semibold text-slate-800">Project type
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
        <label className="text-sm font-semibold text-slate-800">Project location<input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="City, state" /></label>
        <label className="text-sm font-semibold text-slate-800">Need-by / bid date<input value={needBy} onChange={(e) => setNeedBy(e.target.value)} className={inputClass} placeholder="Date or timeframe" /></label>
      </div>
      <label className="mt-5 block text-sm font-semibold text-slate-800">Scope / request
        <textarea required rows={7} value={scope} onChange={(e) => setScope(e.target.value)} className={inputClass} placeholder="Describe the project, scope, procurement method, schedule, documents available and the action you need from TCCG." />
      </label>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white">Prepare email to TCCG</button>
        <a href="mailto:info@tccg.work" className="text-sm font-semibold text-slate-700">Or email info@tccg.work directly</a>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">This form prepares an email in your device's email client; it does not upload project files or sensitive information to the website.</p>
    </form>
  );
}
