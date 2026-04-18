import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import axios from 'axios';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data } = await axios.get('/api/users/leaderboard');
        setLeaders(data);
      } catch (err) {
        console.error("Failed fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Leaderboard
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Recognize the people who keep the<br/>community moving.
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            Trust score, contribution count, and badges create visible momentum for reliable helpers.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: RANKINGS */}
          <Card className="p-8">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Top Helpers</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Rankings</h2>

            <div className="space-y-4">
              {loading ? (
                <div className="text-[#5e6b6f] italic">Loading rankings...</div>
              ) : leaders.length > 0 ? (
                leaders.map((user, index) => (
                  <Card key={user._id} className="p-4 shadow-none border border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1e272a] flex items-center justify-center text-white font-bold">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#192122]">#{index + 1} {user.name}</div>
                        <div className="text-xs text-[#5e6b6f]">Trust factor: High</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#192122]">{user.trustScore}%</div>
                      <div className="text-xs text-[#5e6b6f]">{user.contributions || 0} contributions</div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-[#5e6b6f] italic">No data yet.</div>
              )}
            </div>
          </Card>

          {/* RIGHT: BADGE SYSTEM */}
          <Card className="p-8">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Badge System</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Trust and achievement</h2>

            <div className="space-y-4">
              {loading ? null : leaders.slice(0, 3).map((user, index) => {
                const colors = ['bg-primary', 'bg-[#0e9f85]', 'bg-linear-to-r from-[#d69f37] to-[#0e9f85]'];
                return (
                  <Card key={user._id + 'badge'} className="p-6 shadow-none border border-border">
                    <h4 className="font-bold text-[#192122] mb-1">{user.name}</h4>
                    <p className="text-xs text-[#5e6b6f] mb-4">Top Contributor</p>
                    <div className="h-2 w-full bg-[#e2e1d7] rounded-full overflow-hidden flex">
                      <div className={`h-full ${colors[index % colors.length]}`} style={{ width: `${Math.min(user.trustScore, 100)}%` }} />
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
