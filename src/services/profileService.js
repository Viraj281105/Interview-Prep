import { supabase, isBackendAvailable } from './supabase';

const localGet = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(`pm3-${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const localSet = (key, value) => {
  try {
    localStorage.setItem(`pm3-${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
};

// ──────────────────────────────────────────────
// Projects
// ──────────────────────────────────────────────

export async function getProjects(userId) {
  if (!isBackendAvailable()) return localGet(`projects-${userId}`, []);
  const { data, error } = await supabase
    .from('user_projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addProject(userId, project) {
  if (!isBackendAvailable()) {
    const projects = localGet(`projects-${userId}`, []);
    const newProject = { id: Date.now().toString(), user_id: userId, ...project, created_at: new Date().toISOString() };
    localSet(`projects-${userId}`, [newProject, ...projects]);
    return newProject;
  }
  const { data, error } = await supabase
    .from('user_projects')
    .insert({ user_id: userId, ...project })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(projectId, updates) {
  if (!isBackendAvailable()) return; 
  const { data, error } = await supabase
    .from('user_projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(projectId) {
  if (!isBackendAvailable()) return;
  const { error } = await supabase.from('user_projects').delete().eq('id', projectId);
  if (error) throw error;
}

// ──────────────────────────────────────────────
// Experience
// ──────────────────────────────────────────────

export async function getExperience(userId) {
  if (!isBackendAvailable()) return localGet(`experience-${userId}`, []);
  const { data, error } = await supabase
    .from('user_experience')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addExperience(userId, experience) {
  if (!isBackendAvailable()) {
    const exps = localGet(`experience-${userId}`, []);
    const newExp = { id: Date.now().toString(), user_id: userId, ...experience, created_at: new Date().toISOString() };
    localSet(`experience-${userId}`, [newExp, ...exps]);
    return newExp;
  }
  const { data, error } = await supabase
    .from('user_experience')
    .insert({ user_id: userId, ...experience })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExperience(experienceId, updates) {
  if (!isBackendAvailable()) return;
  const { data, error } = await supabase
    .from('user_experience')
    .update(updates)
    .eq('id', experienceId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExperience(experienceId) {
  if (!isBackendAvailable()) return;
  const { error } = await supabase.from('user_experience').delete().eq('id', experienceId);
  if (error) throw error;
}

// ──────────────────────────────────────────────
// Certifications
// ──────────────────────────────────────────────

export async function getCertifications(userId) {
  if (!isBackendAvailable()) return localGet(`certs-${userId}`, []);
  const { data, error } = await supabase
    .from('user_certifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addCertification(userId, cert) {
  if (!isBackendAvailable()) {
    const certs = localGet(`certs-${userId}`, []);
    const newCert = { id: Date.now().toString(), user_id: userId, ...cert, created_at: new Date().toISOString() };
    localSet(`certs-${userId}`, [newCert, ...certs]);
    return newCert;
  }
  const { data, error } = await supabase
    .from('user_certifications')
    .insert({ user_id: userId, ...cert })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCertification(certId, updates) {
  if (!isBackendAvailable()) return;
  const { data, error } = await supabase
    .from('user_certifications')
    .update(updates)
    .eq('id', certId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCertification(certId) {
  if (!isBackendAvailable()) return;
  const { error } = await supabase.from('user_certifications').delete().eq('id', certId);
  if (error) throw error;
}

// ──────────────────────────────────────────────
// Resumes
// ──────────────────────────────────────────────

export async function getResumes(userId) {
  if (!isBackendAvailable()) return localGet(`resumes-${userId}`, []);
  const { data, error } = await supabase
    .from('user_resumes')
    .select('*')
    .eq('user_id', userId)
    .order('uploaded_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function uploadResume(userId, file) {
  if (!isBackendAvailable()) return null; // Can't mock file upload easily
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(filePath, file);
    
  if (uploadError) throw uploadError;

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('resumes')
    .getPublicUrl(filePath);
    
  const fileUrl = publicUrlData.publicUrl;

  // Save to DB
  const { data, error: dbError } = await supabase
    .from('user_resumes')
    .insert({
      user_id: userId,
      file_name: file.name,
      file_url: fileUrl
    })
    .select()
    .single();

  if (dbError) throw dbError;
  return data;
}

export async function deleteResume(resumeId, fileUrl) {
  if (!isBackendAvailable()) return;
  
  // Extract path from public URL
  const urlParts = fileUrl.split('/');
  const filePath = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;

  // Delete from Storage
  await supabase.storage.from('resumes').remove([filePath]);
  
  // Delete from DB
  const { error } = await supabase.from('user_resumes').delete().eq('id', resumeId);
  if (error) throw error;
}

// ──────────────────────────────────────────────
// External Achievements
// ──────────────────────────────────────────────

export async function getExternalAchievements(userId) {
  if (!isBackendAvailable()) return localGet(`achievements-${userId}`, []);
  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addExternalAchievement(userId, achievement) {
  if (!isBackendAvailable()) {
    const achs = localGet(`achievements-${userId}`, []);
    const newAch = { id: Date.now().toString(), user_id: userId, ...achievement, created_at: new Date().toISOString() };
    localSet(`achievements-${userId}`, [newAch, ...achs]);
    return newAch;
  }
  const { data, error } = await supabase
    .from('user_achievements')
    .insert({ user_id: userId, ...achievement })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExternalAchievement(achievementId, updates) {
  if (!isBackendAvailable()) return;
  const { data, error } = await supabase
    .from('user_achievements')
    .update(updates)
    .eq('id', achievementId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExternalAchievement(achievementId) {
  if (!isBackendAvailable()) return;
  const { error } = await supabase.from('user_achievements').delete().eq('id', achievementId);
  if (error) throw error;
}
