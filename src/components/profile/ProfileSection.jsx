import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Edit2, Save, X } from 'lucide-react';

export const ProfileSection = ({ 
  title, 
  icon: Icon, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  children,
  className = ''
}) => {
  return (
    <Card glass className={`p-6 border-white/40 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-heading font-bold flex items-center gap-2">
          {Icon && <Icon className="text-brand-indigo" size={20} />}
          {title}
        </h3>
        <div>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={onEdit} className="text-slate-500 hover:text-brand-indigo gap-1">
              <Edit2 size={14} /> Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onCancel} className="text-slate-500 hover:text-red-500 gap-1">
                <X size={14} /> Cancel
              </Button>
              <Button size="sm" onClick={onSave} className="bg-brand-indigo hover:bg-brand-indigo/90 text-white gap-1">
                <Save size={14} /> Save
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </Card>
  );
};
