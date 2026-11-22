"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Calculator Suggestion");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" /> Get in Touch
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact FinCalcPro
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Have a suggestion for a new calculator, spotted a formula question, or
          want to reach out regarding partnerships or privacy? Send us a message
          below.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">
              Message Received!
            </h2>
            <p className="text-sm text-slate-600">
              Thank you, {name}. Our editorial team reviews inquiries within 1–2
              business days.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              >
                <option>Calculator Suggestion</option>
                <option>Formula / Bug Report</option>
                <option>Privacy / GDPR Request</option>
                <option>General Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
