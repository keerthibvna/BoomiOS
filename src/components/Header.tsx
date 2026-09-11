import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Search, 
  User as UserIcon, 
  ChevronDown, 
  Building2, 
  CheckCircle2,
  LogIn,
  LogOut,
  Users
} from 'lucide-react';
import { User, UserRole } from '../types.ts';

interface HeaderProps {
  currentUser: User | null;
  onRoleSwitch: (role: UserRole) => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  onNavigate: (viewId: string) => void;
  unreadNotificationsCount: number;
  onToggleNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onRoleSwitch,
  onOpenLoginModal,
  onLogout,
  onNavigate,
  unreadNotificationsCount,
  onToggleNotifications
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const rolesList: { role: UserRole; title: string; subtitle: string }[] = [
    { role: 'RESEARCHER', title: 'Researcher', subtitle: 'Dr. Ananya Sharma (IIT Delhi)' },
    { role: 'POLICYMAKER', title: 'Government / Policymaker', subtitle: 'Rajesh Verma, IAS (NITI Aayog)' },
    { role: 'ACADEMIC', title: 'Academic Institution', subtitle: 'Prof. S. Ranganathan (TISS)' },
    { role: 'ADMIN', title: 'Administrator', subtitle: 'Shri Amitabh Kant (DoLR, MoRD)' },
    { role: 'PUBLIC_USER', title: 'Public User', subtitle: 'Kavita Patel (Citizen / FPO)' },
  ];

  return (
    <header id="platform-master-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* National Tricolor Top Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Identity & National Emblem Style */}
          <div 
            id="header-brand-section" 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none min-w-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-amber-300 shadow-sm ring-1 ring-blue-800/50 shrink-0">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-amber-300/60 border-dashed animate-[spin_40s_linear_infinite]" />
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight truncate group-hover:text-blue-900 transition-colors">
                  National Digital Platform for Land Governance
                </span>
                <span className="hidden lg:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Official Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                Department of Land Resources • Ministry of Rural Development, Govt. of India
              </p>
            </div>
          </div>

          {/* Quick Actions & Header Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Global Search Shortcut Button */}
            <button
              id="header-global-search-btn"
              onClick={() => onNavigate('semantic-search')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search repository...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200">⌘K</kbd>
            </button>

            {/* If Logged In: Role Switcher & User Profile Controls */}
            {currentUser ? (
              <>
                {/* Role Switcher Dropdown */}
                <div className="relative">
                  <button
                    id="role-switcher-dropdown-btn"
                    onClick={() => {
                      setRoleDropdownOpen(!roleDropdownOpen);
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/70 text-slate-800 border border-slate-200/70 transition-all cursor-pointer"
                    title="Switch user role"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="max-w-[100px] sm:max-w-[130px] truncate">{currentUser.role.replace('_', ' ')}</span>
                    <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
                  </button>

                  {roleDropdownOpen && (
                    <div 
                      id="role-switcher-menu"
                      className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active User Roles</p>
                          <p className="text-xs text-slate-500">Switch persona permissions</p>
                        </div>
                        <button
                          onClick={() => {
                            setRoleDropdownOpen(false);
                            onOpenLoginModal();
                          }}
                          className="text-[11px] text-blue-700 hover:underline font-semibold"
                        >
                          All Users
                        </button>
                      </div>

                      <div className="py-1">
                        {rolesList.map((item) => {
                          const isSelected = currentUser.role === item.role;
                          return (
                            <button
                              key={item.role}
                              onClick={() => {
                                onRoleSwitch(item.role);
                                setRoleDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 flex items-start justify-between text-xs transition-colors cursor-pointer ${
                                isSelected ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div>
                                <div className="font-semibold flex items-center gap-1.5">
                                  {item.title}
                                  {isSelected && <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-200 text-blue-900">Current</span>}
                                </div>
                                <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                              </div>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-2 border-t border-slate-100 bg-slate-50 rounded-b-xl">
                        <button
                          onClick={() => {
                            setRoleDropdownOpen(false);
                            onOpenLoginModal();
                          }}
                          className="w-full py-1.5 text-center text-xs font-semibold text-blue-900 bg-white border border-slate-200 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>Login as Different User...</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Switch User Button */}
                <button
                  id="header-switch-user-btn"
                  onClick={onOpenLoginModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
                  title="Switch user account or log in with credentials"
                >
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  <span>Switch User</span>
                </button>

                {/* In-App Notifications Button */}
                <button
                  id="header-notifications-btn"
                  onClick={onToggleNotifications}
                  className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
                  )}
                </button>

                {/* User Profile Mini-Badge & Dropdown */}
                <div className="relative">
                  <button
                    id="user-profile-menu-btn"
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setRoleDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 p-1 pl-1.5 sm:pl-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 text-amber-300 flex items-center justify-center text-xs font-bold ring-1 ring-blue-800">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                      {currentUser.fullName.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </button>

                  {userMenuOpen && (
                    <div 
                      id="user-profile-dropdown"
                      className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/70">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900">{currentUser.fullName}</p>
                          <span className="text-[10px] px-1.5 py-0.5 font-bold rounded bg-blue-100 text-blue-800 uppercase">
                            {currentUser.role.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{currentUser.email}</p>
                        <p className="text-[11px] text-slate-600 truncate mt-1">
                          {currentUser.designation || currentUser.organization}
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            onNavigate('projects');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Projects & Workspace</span>
                        </button>

                        {currentUser.role === 'ADMIN' && (
                          <button
                            onClick={() => {
                              onNavigate('admin');
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            <span>Admin Console & System Logs</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenLoginModal();
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                        >
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-medium text-blue-900">Switch User / Login as Different User</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          id="dropdown-logout-btn"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5 text-red-500" />
                          <span>Log Out of Session</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Log Out Button in Header */}
                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                  title="Sign out of current user session"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </>
            ) : (
              /* If Logged Out: Guest indicator & Log In Button */
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                  <UserIcon className="w-3 h-3 text-slate-400" />
                  Guest Mode
                </span>

                <button
                  id="header-login-btn"
                  onClick={onOpenLoginModal}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-300" />
                  <span>Log In / Select User</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
