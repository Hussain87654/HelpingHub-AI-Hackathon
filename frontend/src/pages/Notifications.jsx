import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "New Match Found!",
      description: "Ayesha Khan has offered to help you with your Frontend routing issue. Head to your messages to connect.",
      time: "2 hours ago",
      unread: true,
      type: "match"
    },
    {
      id: 2,
      title: "Skill Endorsement",
      description: "Hassan Ali endorsed you for 'UI/UX Design' after your recent session.",
      time: "5 hours ago",
      unread: true,
      type: "endorsement"
    },
    {
      id: 3,
      title: "Trust Score Updated",
      description: "Your trust score increased by 10 points for successfully resolving a request. Keep up the great work!",
      time: "1 day ago",
      unread: false,
      type: "system"
    },
    {
      id: 4,
      title: "AI Suggestion",
      description: "Our AI noticed a high demand for 'Next.js' right now. You possess this skill! Consider browsing the Feed for open requests.",
      time: "2 days ago",
      unread: false,
      type: "ai"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Activity Hub
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Your Notifications
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            Stay updated on new matches, system alerts, and your trust score progression.
          </p>
        </Card>

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card 
              key={notif.id} 
              className={`p-6 flex items-start gap-4 transition-all ${notif.unread ? 'border-2 border-[#0e9f85] bg-[#f4fcf9]' : 'border border-border bg-white'}`}
            >
              {/* STATUS INDICATOR */}
              <div className="mt-1">
                {notif.unread ? (
                  <div className="w-3 h-3 rounded-full bg-[#0e9f85] shadow-[0_0_8px_rgba(14,159,133,0.6)]"></div>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`text-lg font-bold ${notif.unread ? 'text-[#192122]' : 'text-gray-700'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs font-bold text-gray-400 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                
                <p className="text-[#5e6b6f] text-sm mb-3">
                  {notif.description}
                </p>

                <Badge variant={notif.type === 'match' ? 'primary' : notif.type === 'ai' ? 'gray' : 'primary'}>
                  {notif.type.toUpperCase()}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
