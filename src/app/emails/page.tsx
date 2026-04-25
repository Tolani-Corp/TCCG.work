'use client'

import { NewSubscriberEmail } from '@/emails/NewSubscriber'

export default function EmailPreviewPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-page)] py-12">
            <div className="mx-auto max-w-3xl px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Email Templates</h1>
                    <p className="mt-2 text-[var(--text-secondary)]">Preview production email templates</p>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] ml-2 font-mono">NewSubscriber.tsx</span>
                    </div>
                    <div className="p-0">
                        <NewSubscriberEmail />
                    </div>
                </div>
            </div>
        </div>
    )
}
