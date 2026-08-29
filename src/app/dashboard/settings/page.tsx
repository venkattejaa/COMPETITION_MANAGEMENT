"use client";

import { useState } from "react";
import { Settings, User, Shield, Users, Mail, Save } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [teamName, setTeamName] = useState("Alpha Robotics Lab");
  const [teamCode, setTeamCode] = useState("EYRC-2026-01");
  const [captainEmail, setCaptainEmail] = useState("captain@college.edu");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-400" />
          Team Settings
        </h1>
        <p className="text-slate-400">Manage your team profile, roster, and notification preferences.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Team Information */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-700/60 pb-4">
            <Shield className="w-5 h-5 text-orange-400" />
            Team Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Team Access Code</label>
              <input
                type="text"
                disabled
                value={teamCode}
                className="w-full px-4 py-3 bg-slate-900/30 border border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Team Members Roster */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-700/60 pb-4">
            <Users className="w-5 h-5 text-blue-400" />
            Team Roster (4 Members)
          </h2>

          <div className="space-y-4">
            {[
              { name: "Team Captain", email: captainEmail, role: "Team Leader", isCaptain: true },
              { name: "Member 2", email: "member2@college.edu", role: "Software Lead", isCaptain: false },
              { name: "Member 3", email: "member3@college.edu", role: "Hardware Lead", isCaptain: false },
              { name: "Member 4", email: "member4@college.edu", role: "CAD & Simulation", isCaptain: false },
            ].map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/40 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    m.isCaptain ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-blue-500/10 text-blue-400"
                  }`}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{m.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {m.email}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  m.isCaptain ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-slate-800 text-slate-400"
                }`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          {saved && (
            <span className="text-sm font-semibold text-emerald-400 animate-pulse">
              ✓ Settings saved successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
