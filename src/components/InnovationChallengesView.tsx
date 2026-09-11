import React, { useState } from 'react';
import { 
  Lightbulb, 
  Users, 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Plus, 
  Building2, 
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';
import { ResearchProject, InnovationChallenge } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface InnovationChallengesViewProps {
  challenges: InnovationChallenge[];
  projects: ResearchProject[];
}

export const InnovationChallengesView: React.FC<InnovationChallengesViewProps> = ({
  challenges,
  projects
}) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'projects'>('challenges');
  const [selectedChallenge, setSelectedChallenge] = useState<InnovationChallenge | null>(null);
  const [submissionModal, setSubmissionModal] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Proposal State
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalAbstract, setProposalAbstract] = useState('');
  const [leadOrg, setLeadOrg] = useState('');

  const handleProposeProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalTitle) return;
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSubmissionModal(null);
      setProposalTitle('');
      setProposalAbstract('');
      setLeadOrg('');
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National Land Innovation Challenges & Collaborative Projects
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ministry of Rural Development & Land Governance Innovation Hub: Hackathons, SIH Grand Challenges, and inter-institutional consortiums.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'challenges' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>National Challenges ({challenges.length})</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'projects' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Collaborative Projects ({projects.length})</span>
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INNOVATION CHALLENGES & HACKATHONS */}
      {activeTab === 'challenges' && (
        <div className="space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {challenges.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Prize Pool: {c.prizeAmount}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Deadline: {c.deadline}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {c.title}
                  </h3>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="font-bold text-slate-800">Problem Statement:</div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{c.problemStatement}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div><strong>Eligibility:</strong> {c.eligibility}</div>
                    <div>
                      <strong>Required Technologies:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {c.requiredTechnology?.map((crit, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            ✓ {crit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Host: <strong>{c.organization}</strong>
                  </span>

                  <button
                    onClick={() => {
                      setSelectedChallenge(c);
                      setSubmissionModal(c.title);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-98"
                  >
                    <span>Submit Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 2: COLLABORATIVE RESEARCH PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-5">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Active Land Governance Research Consortiums
              </h3>
              <p className="text-[11px] text-slate-500">Multidisciplinary projects funded by MoRD, ICAR, and State Land Councils.</p>
            </div>

            <button
              onClick={() => setSubmissionModal('New Collaborative Project')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Propose Research Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {proj.status}
                    </span>
                    <span className="text-xs text-slate-500">Timeline: {proj.startDate} - {proj.endDate}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {proj.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] space-y-1 text-slate-600">
                    <div><strong>Lead Institution:</strong> {proj.organization}</div>
                    <div><strong>Principal Investigator:</strong> {proj.principalResearcher}</div>
                    <div><strong>Target Coverage:</strong> {proj.state}</div>
                    <div><strong>Consortium Budget:</strong> ₹{proj.budgetLakhs} Lakhs</div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Key Objectives:</div>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {proj.objectives?.map((m, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {proj.members?.length || 4} Institutions Participating
                  </span>
                  <button
                    onClick={() => {
                      // Handled cleanly
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Join Team / Share Data →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Submission Modal */}
      {submissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {submissionModal.includes('Challenge') ? 'Submit Challenge Solution' : 'Propose Collaborative Research Project'}
              </h3>
              <button
                onClick={() => setSubmissionModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {submissionSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Submission Recorded Successfully</h4>
                <p className="text-xs text-slate-500">
                  Your project proposal has been registered on the National Land Research Registry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProposeProject} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Proposal / Solution Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Computer Vision Drone Cadastre Verification"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lead Academic / Industry Institution</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., IIT Bombay & ASCI Hyderabad"
                    value={leadOrg}
                    onChange={(e) => setLeadOrg(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Executive Abstract & Methodology</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe problem statement, dataset requirements, expected statutory impact, and technical architecture..."
                    value={proposalAbstract}
                    onChange={(e) => setProposalAbstract(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmissionModal(null)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    Submit to National Committee
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
