import React from 'react';
import Link from 'next/link';

export function CreatorLanding() {
    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans selection:bg-[var(--color-primary-lightness)]">
            {/* Hero Section with Glass Effect */}
            <div className="relative overflow-hidden">
                {/* Abstract Background Blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[oklch(0.6_0.2_280)] opacity-20 blur-[100px] animate-pulse-soft" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[oklch(0.6_0.2_330)] opacity-20 blur-[100px]" />

                <div className="relative max-w-2xl mx-auto px-4 py-20 text-center">
                    <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-tr from-[oklch(0.6_0.2_280)] to-[oklch(0.6_0.2_330)] mb-8">
                        <div className="w-full h-full rounded-full bg-[var(--bg-surface)] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                                alt="Creator"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        <span className="text-gradient">Sarah Create</span>
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                        Digital Artist & storyteller. Creating exclusive worlds for my subscribers. Join the journey.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-3 rounded-full bg-[oklch(0.6_0.2_280)] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[oklch(0.6_0.2_280/0.3)]">
                            Subscribe $5/mo
                        </button>
                        <button className="px-8 py-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] transition-colors font-medium">
                            View Gallery
                        </button>
                    </div>
                </div>
            </div>

            {/* Links Grid */}
            <div className="max-w-md mx-auto px-4 pb-20 space-y-4">
                {[
                    { title: 'Latest YouTube Video', subtitle: 'Speedpaint: Cyberpunk City', icon: '📺' },
                    { title: 'Shop Prints', subtitle: 'Limited Edition Canvas', icon: '🎨' },
                    { title: 'Discord Community', subtitle: 'Join 5k+ Artists', icon: '💬' },
                    { title: 'Commission Status', subtitle: 'Open for Business', icon: '✨' },
                ].map((link, i) => (
                    <div key={i} className="group flex items-center p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[oklch(0.6_0.2_280)] transition-all cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 rounded-lg bg-[var(--bg-page)] flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
                            {link.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[var(--text-primary)]">{link.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{link.subtitle}</p>
                        </div>
                        <div className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="text-center py-8 border-t border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm">
                Powered by <span className="font-bold text-[oklch(0.6_0.2_280)]">TCCG</span>
            </div>
        </div>
    );
}
