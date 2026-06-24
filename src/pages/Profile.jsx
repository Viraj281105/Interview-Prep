import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { User, Mail, Award, Clock, MapPin, Briefcase, Settings as SettingsIcon, BookText, BarChart3, Flame, Server, GraduationCap, Target, Code, Plus, Trash2, ExternalLink, FileText, Upload, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { useAuth } from '../context/AuthContext';
import { ProfileSection } from '../components/profile/ProfileSection';
import { 
  getProjects, addProject, deleteProject,
  getExperience, addExperience, deleteExperience,
  getCertifications, addCertification, deleteCertification,
  getResumes, uploadResume, deleteResume,
  getExternalAchievements, addExternalAchievement, deleteExternalAchievement
} from '../services/profileService';
import { getUserProfile, updateUserProfile } from '../services/database';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { userNotes, completedQuestions, mockInterviews, xp, currentStreak } = useAppStore();
  const { currentUser } = useAuth();

  const tabs = [
    { id: 'Overview', icon: User },
    { id: 'Background', icon: Briefcase },
    { id: 'Portfolio', icon: Code },
    { id: 'Notebook', icon: BookText },
    { id: 'Analytics', icon: BarChart3 }
  ];

  // State
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit states
  const [editSections, setEditSections] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentUser?.id) {
      loadAllData();
    }
  }, [currentUser]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const p = await getUserProfile(currentUser.id);
      setProfile(p);
      setFormData(p);
      setProjects(await getProjects(currentUser.id));
      setExperience(await getExperience(currentUser.id));
      setCertifications(await getCertifications(currentUser.id));
      setAchievements(await getExternalAchievements(currentUser.id));
      setResumes(await getResumes(currentUser.id));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEdit = (section) => {
    setEditSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleProfileChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfileSection = async (section) => {
    try {
      const updated = await updateUserProfile(currentUser.id, formData);
      setProfile(updated);
      toggleEdit(section);
    } catch (e) {
      console.error(e);
    }
  };

  // Generic List Adder
  const handleAddItem = async (type, payload, addFn, setFn) => {
    try {
      const newItem = await addFn(currentUser.id, payload);
      setFn(prev => [newItem, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteItem = async (id, type, deleteFn, setFn) => {
    try {
      await deleteFn(id);
      setFn(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const newResume = await uploadResume(currentUser.id, file);
      if (newResume) {
        setResumes(prev => [newResume, ...prev]);
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading Profile...</div>;

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50">Profile</h1>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner overflow-x-auto max-w-full hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-slate-700 text-brand-indigo shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} /> <span className="hidden sm:inline">{tab.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Always visible */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card animated glass className="p-8 flex flex-col items-center text-center border-white/40">
            <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-indigo/20">
              <span className="text-5xl font-heading font-bold">
                {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <h2 className="text-2xl font-heading font-bold mb-1">{profile?.display_name || 'User'}</h2>
            <p className="text-slate-500 mb-4 flex items-center gap-1 justify-center"><Briefcase size={16}/> {profile?.target_role}</p>
            <Badge variant="gradient" className="px-4 py-1 mb-6">{currentStreak > 0 ? `${currentStreak} Day Streak 🔥` : 'Level ' + (profile?.level || 1)}</Badge>
            
            <div className="w-full flex flex-col gap-3 text-left mb-6">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                <Mail size={16} className="text-brand-indigo" />
                {currentUser?.email}
              </div>
              {profile?.phone_number && (
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                  <Phone size={16} className="text-brand-pink" />
                  {profile.phone_number}
                </div>
              )}
              {(profile?.city || profile?.country) && (
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                  <MapPin size={16} className="text-brand-cyan" />
                  {profile.city}{profile.city && profile.country ? ', ' : ''}{profile.country}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Content Area - Tabbed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {activeTab === 'Overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              
              {/* Personal Information */}
              <ProfileSection 
                title="Personal Information" icon={User} 
                isEditing={editSections['personal']}
                onEdit={() => toggleEdit('personal')}
                onSave={() => saveProfileSection('personal')}
                onCancel={() => { toggleEdit('personal'); setFormData(profile); }}
              >
                {editSections['personal'] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-500">Display Name</label>
                      <Input value={formData.display_name || ''} onChange={e => handleProfileChange('display_name', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Phone Number</label>
                      <Input value={formData.phone_number || ''} onChange={e => handleProfileChange('phone_number', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Date of Birth</label>
                      <Input type="date" value={formData.dob || ''} onChange={e => handleProfileChange('dob', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">City</label>
                      <Input value={formData.city || ''} onChange={e => handleProfileChange('city', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Country</label>
                      <Input value={formData.country || ''} onChange={e => handleProfileChange('country', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-slate-500">Bio / About Me</label>
                      <textarea 
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[100px]"
                        value={formData.bio || ''} 
                        onChange={e => handleProfileChange('bio', e.target.value)} 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-700 dark:text-slate-300">
                    <p className="mb-4">{profile?.bio || 'No bio provided yet.'}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-slate-500">DOB:</span> {profile?.dob || 'N/A'}</div>
                      <div><span className="text-slate-500">Phone:</span> {profile?.phone_number || 'N/A'}</div>
                      <div><span className="text-slate-500">Location:</span> {profile?.city} {profile?.country}</div>
                    </div>
                  </div>
                )}
              </ProfileSection>

              {/* Career Goals */}
              <ProfileSection 
                title="Career Goals" icon={Target} 
                isEditing={editSections['career']}
                onEdit={() => toggleEdit('career')}
                onSave={() => saveProfileSection('career')}
                onCancel={() => { toggleEdit('career'); setFormData(profile); }}
              >
                {editSections['career'] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-500">Target Role</label>
                      <Input value={formData.target_role || ''} onChange={e => handleProfileChange('target_role', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Target Companies (comma separated)</label>
                      <Input value={(formData.target_companies || []).join(', ')} onChange={e => handleProfileChange('target_companies', e.target.value.split(',').map(s => s.trim()))} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-slate-500">Preferred Domains (comma separated)</label>
                      <Input value={(formData.preferred_domains || []).join(', ')} onChange={e => handleProfileChange('preferred_domains', e.target.value.split(',').map(s => s.trim()))} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                      <p className="text-sm text-slate-500 mb-1">Target Role</p>
                      <p className="font-semibold">{profile?.target_role || 'Not set'}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                      <p className="text-sm text-slate-500 mb-1">Target Companies</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile?.target_companies?.length > 0 ? profile.target_companies.map(c => (
                          <Badge key={c} variant="secondary">{c}</Badge>
                        )) : <span className="text-sm text-slate-400">None</span>}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 sm:col-span-2">
                      <p className="text-sm text-slate-500 mb-1">Preferred Domains</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile?.preferred_domains?.length > 0 ? profile.preferred_domains.map(d => (
                          <Badge key={d} variant="outline" className="text-brand-indigo border-brand-indigo/30">{d}</Badge>
                        )) : <span className="text-sm text-slate-400">None</span>}
                      </div>
                    </div>
                  </div>
                )}
              </ProfileSection>

            </motion.div>
          )}

          {activeTab === 'Background' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              
              {/* Academic Details */}
              <ProfileSection 
                title="Academic Details" icon={GraduationCap} 
                isEditing={editSections['academic']}
                onEdit={() => toggleEdit('academic')}
                onSave={() => saveProfileSection('academic')}
                onCancel={() => { toggleEdit('academic'); setFormData(profile); }}
              >
                {editSections['academic'] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-sm text-slate-500">College Name</label>
                      <Input value={formData.college_name || ''} onChange={e => handleProfileChange('college_name', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Degree</label>
                      <Input value={formData.degree || ''} onChange={e => handleProfileChange('degree', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Branch</label>
                      <Input value={formData.branch || ''} onChange={e => handleProfileChange('branch', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Graduation Year</label>
                      <Input type="number" value={formData.graduation_year || ''} onChange={e => handleProfileChange('graduation_year', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">CGPA</label>
                      <Input type="number" step="0.01" value={formData.cgpa || ''} onChange={e => handleProfileChange('cgpa', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">12th / Diploma %</label>
                      <Input type="number" step="0.01" value={formData.twelfth_percentage || ''} onChange={e => handleProfileChange('twelfth_percentage', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">10th %</label>
                      <Input type="number" step="0.01" value={formData.tenth_percentage || ''} onChange={e => handleProfileChange('tenth_percentage', e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-slate-700 dark:text-slate-300">
                    <div>
                      <h4 className="font-bold text-lg">{profile?.college_name || 'Not provided'}</h4>
                      <p className="text-brand-indigo">{profile?.degree} {profile?.branch ? `in ${profile.branch}` : ''}</p>
                      <p className="text-sm text-slate-500">Graduation: {profile?.graduation_year || 'N/A'}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <p className="text-sm text-slate-500">CGPA</p>
                        <p className="font-bold text-xl">{profile?.cgpa || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">12th %</p>
                        <p className="font-bold text-xl">{profile?.twelfth_percentage || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">10th %</p>
                        <p className="font-bold text-xl">{profile?.tenth_percentage || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </ProfileSection>

              {/* Experience */}
              <ProfileSection title="Experience" icon={Briefcase}>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{exp.role} <span className="text-brand-indigo font-normal text-sm px-2 py-0.5 bg-brand-indigo/10 rounded-full ml-2">{exp.type}</span></h4>
                        <p className="text-slate-600 dark:text-slate-400">{exp.company}</p>
                        <p className="text-sm text-slate-500">{exp.duration}</p>
                        <p className="text-sm mt-2">{exp.responsibilities}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteItem(exp.id, 'experience', deleteExperience, setExperience)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.target);
                      handleAddItem('experience', Object.fromEntries(fd.entries()), addExperience, setExperience);
                      e.target.reset();
                    }} className="grid grid-cols-2 gap-3">
                      <Input name="company" placeholder="Company Name" required />
                      <Input name="role" placeholder="Role (e.g. SDE Intern)" required />
                      <select name="type" className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-950">
                        <option>Internship</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                      </select>
                      <Input name="duration" placeholder="Duration (e.g. Jan 2026 - Present)" required />
                      <div className="col-span-2">
                        <Input name="responsibilities" placeholder="Key responsibilities" />
                      </div>
                      <Button type="submit" size="sm" variant="outline" className="col-span-2 gap-2 justify-center"><Plus size={16} /> Add Experience</Button>
                    </form>
                  </div>
                </div>
              </ProfileSection>
            </motion.div>
          )}

          {activeTab === 'Portfolio' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              
              {/* Technical Skills */}
              <ProfileSection 
                title="Technical Skills" icon={Code} 
                isEditing={editSections['skills']}
                onEdit={() => toggleEdit('skills')}
                onSave={() => saveProfileSection('skills')}
                onCancel={() => { toggleEdit('skills'); setFormData(profile); }}
              >
                {editSections['skills'] ? (
                  <div>
                    <label className="text-sm text-slate-500">Skills (comma separated)</label>
                    <textarea 
                      className="w-full mt-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[100px]"
                      value={(formData.skills || []).join(', ')} 
                      onChange={e => handleProfileChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
                      placeholder="React, Node.js, Python, PostgreSQL..."
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.length > 0 ? profile.skills.map((s, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm">{s}</Badge>
                    )) : <span className="text-slate-500">No skills added.</span>}
                  </div>
                )}
              </ProfileSection>

              {/* Projects */}
              <ProfileSection title="Projects" icon={Server}>
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg">{proj.project_name}</h4>
                        <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8" onClick={() => handleDeleteItem(proj.id, 'project', deleteProject, setProjects)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{proj.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {proj.tech_stack?.map(tech => <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>)}
                      </div>
                      <div className="flex gap-4 mt-4">
                        {proj.github_link && <a href={proj.github_link} target="_blank" rel="noreferrer" className="text-sm text-brand-indigo flex items-center gap-1 hover:underline"><ExternalLink size={14}/> GitHub</a>}
                        {proj.live_link && <a href={proj.live_link} target="_blank" rel="noreferrer" className="text-sm text-brand-pink flex items-center gap-1 hover:underline"><ExternalLink size={14}/> Live Demo</a>}
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.target);
                      const data = Object.fromEntries(fd.entries());
                      data.tech_stack = data.tech_stack.split(',').map(s => s.trim());
                      handleAddItem('project', data, addProject, setProjects);
                      e.target.reset();
                    }} className="grid grid-cols-2 gap-3">
                      <Input name="project_name" placeholder="Project Name" required className="col-span-2" />
                      <Input name="description" placeholder="Description" required className="col-span-2" />
                      <Input name="tech_stack" placeholder="Tech Stack (comma separated)" className="col-span-2" />
                      <Input name="github_link" placeholder="GitHub URL" />
                      <Input name="live_link" placeholder="Live Demo URL" />
                      <Button type="submit" size="sm" variant="outline" className="col-span-2 gap-2 justify-center"><Plus size={16} /> Add Project</Button>
                    </form>
                  </div>
                </div>
              </ProfileSection>

              {/* Achievements */}
              <ProfileSection title="Achievements" icon={Award}>
                <div className="space-y-4">
                  {achievements.map(ach => (
                    <div key={ach.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{ach.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{ach.description}</p>
                        {ach.date && <p className="text-xs text-slate-500 mt-2">{ach.date}</p>}
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteItem(ach.id, 'achievement', deleteExternalAchievement, setAchievements)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.target);
                      handleAddItem('achievement', Object.fromEntries(fd.entries()), addExternalAchievement, setAchievements);
                      e.target.reset();
                    }} className="grid grid-cols-2 gap-3">
                      <Input name="title" placeholder="Achievement Title (e.g. 1st Place Hackathon)" required className="col-span-2" />
                      <Input name="description" placeholder="Description" className="col-span-2" />
                      <Input name="date" type="date" className="col-span-2 md:col-span-1" />
                      <Button type="submit" size="sm" variant="outline" className="col-span-2 md:col-span-1 gap-2 justify-center"><Plus size={16} /> Add Achievement</Button>
                    </form>
                  </div>
                </div>
              </ProfileSection>

              {/* Resumes */}
              <ProfileSection title="Resume Section" icon={FileText}>
                <div className="space-y-4">
                  {resumes.map(res => (
                    <div key={res.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-brand-indigo" />
                        <div>
                          <p className="font-medium text-sm">{res.file_name}</p>
                          <p className="text-xs text-slate-500">Uploaded {new Date(res.uploaded_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a href={res.file_url} target="_blank" rel="noreferrer">
                          <Button variant="ghost" size="sm">View</Button>
                        </a>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteItem(res.id, 'resume', deleteResume, setResumes)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors relative cursor-pointer">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                    <Upload size={32} className="mx-auto text-slate-400 mb-3" />
                    <p className="font-medium text-slate-700 dark:text-slate-300">Click or drag file to upload resume</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX up to 5MB</p>
                  </div>
                </div>
              </ProfileSection>
            </motion.div>
          )}

          {activeTab === 'Analytics' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <Card glass className="p-8 border-white/40">
                <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2"><BarChart3 className="text-brand-indigo"/> Prep Stats</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 text-center">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-bold uppercase mb-1">Streak</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-1"><Flame size={20} className="text-orange-500"/>{currentStreak}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 text-center">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">XP</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{xp}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 text-center">
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-bold uppercase mb-1">Solved</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{completedQuestions.length}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 text-center">
                    <p className="text-sm text-green-600 dark:text-green-400 font-bold uppercase mb-1">Mocks</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{mockInterviews.length}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Skill Distribution</h4>
                  <div className="space-y-4">
                    {[
                      { skill: 'Data Structures & Algorithms', percentage: 75, color: 'bg-brand-indigo' },
                      { skill: 'System Design', percentage: 40, color: 'bg-brand-cyan' },
                      { skill: 'Behavioral / HR', percentage: 90, color: 'bg-brand-pink' },
                      { skill: 'React / Frontend', percentage: 65, color: 'bg-brand-lavender' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1 font-medium">
                          <span>{item.skill}</span>
                          <span className="text-slate-500">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'Notebook' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card glass className="p-8 border-white/40">
                <h3 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2"><BookText className="text-brand-indigo"/> My Notebook</h3>
                <p className="text-slate-500 mb-8">All your saved notes across topics.</p>
                
                {Object.keys(userNotes).length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <BookText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">Your notebook is empty</h4>
                    <p className="text-slate-500 mt-1 max-w-sm mx-auto">Start taking notes in the learning modules and they will appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(userNotes).map(([topicId, note], i) => (
                      <div key={topicId} className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border border-yellow-200 dark:border-yellow-900/30 shadow-sm relative group">
                        <Badge variant="secondary" className="mb-3 capitalize bg-white/80 dark:bg-slate-900/80">{topicId.replace('-', ' ')}</Badge>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">"{note}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};
