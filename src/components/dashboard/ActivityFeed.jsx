import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { getUserHistory } from '../../services/historyService';
import { useAuth } from '../../context/AuthContext';
import { Play, CheckCircle2, BookOpen, Clock, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const ActivityFeed = () => {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      getUserHistory(currentUser.id)
        .then(data => {
          setHistory(data || []);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch activity feed:', err);
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const getActionDetails = (item) => {
    switch (item.action_type) {
      case 'mock_taken':
        return {
          icon: <Play size={18} className="text-brand-indigo" />,
          bg: 'bg-brand-indigo/10',
          title: `Completed a Mock Interview`,
          desc: `Score: ${item.metadata?.score || 0}%`,
          badge: item.metadata?.type?.toUpperCase() || 'MOCK'
        };
      case 'quiz_completed':
        return {
          icon: <CheckCircle2 size={18} className="text-brand-pink" />,
          bg: 'bg-brand-pink/10',
          title: `Completed a Quiz`,
          desc: `Score: ${item.metadata?.score || 0}% in ${item.metadata?.topicTitle || 'Topic'}`,
          badge: 'QUIZ'
        };
      case 'topic_viewed':
        return {
          icon: <BookOpen size={18} className="text-blue-500" />,
          bg: 'bg-blue-500/10',
          title: `Studied Topic`,
          desc: item.metadata?.topicTitle || 'Unknown Topic',
          badge: 'STUDY'
        };
      default:
        return {
          icon: <Activity size={18} className="text-slate-500" />,
          bg: 'bg-slate-100 dark:bg-slate-800',
          title: `Activity Logged`,
          desc: item.action_type,
          badge: 'SYSTEM'
        };
    }
  };

  return (
    <Card animated glass className="p-8 border-white/40 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-brand-indigo" size={24} />
        <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Recent Activity</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        {isLoading ? (
          [1, 2, 3, 4].map(n => (
            <div key={n} className="flex gap-4">
              <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
              <div className="flex-1">
                <Skeleton variant="text" className="w-1/3 h-4 mb-2" />
                <Skeleton variant="text" className="w-2/3 h-3" />
              </div>
            </div>
          ))
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-slate-400 h-full py-10">
            <Activity size={32} className="mb-2 opacity-50" />
            <p>No recent activity. Start studying!</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-5 space-y-8">
            {history.slice(0, 8).map((item, i) => {
              const details = getActionDetails(item);
              const timeAgo = item.created_at ? formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) : 'Recently';
              
              return (
                <div key={item.id || i} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[21px] top-0 p-2 rounded-full bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900 ${details.bg}`}>
                    {details.icon}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[15px] text-slate-900 dark:text-slate-100">
                        {details.title}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {details.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo}</span>
                      <Badge variant="secondary" className="text-[10px] py-0">{details.badge}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};
