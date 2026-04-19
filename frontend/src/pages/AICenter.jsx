import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AICenter() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [mentorsCount, setMentorsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, userRes] = await Promise.all([
          axios.get('/api/requests'),
          axios.get('/api/users/leaderboard')
        ]);
        setRequests(reqRes.data || []);
        // Count users who have more than base trust score or any contributions as 'Mentors'
        setMentorsCount(userRes.data ? userRes.data.length : 0);
      } catch (err) {
        console.error("Failed fetching AI center data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute dynamic stats
  const activeRequests = requests.filter(r => r.status !== 'Solved');
  const highUrgencyCount = activeRequests.filter(r => r.urgency === 'High').length;
  
  // Compute Trend Pulse (Most common category among active requests)
  let topCategory = 'Diverse Trends';
  if (activeRequests.length > 0) {
    const counts = {};
    activeRequests.forEach(r => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    topCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  // AI Recommended requests (e.g., getting latest active requests)
  const recommendedRequests = activeRequests.slice(0, 4);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* TOP BACKGROUND CARD */}
        <div className="relative mb-24">
          <Card variant="dark" className="p-12 pb-24 rounded-b-3xl!">
            <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
              AI Center
            </h3>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              See what the platform intelligence is<br/>noticing.
            </h1>
            <p className="text-[#a8b7bc] text-lg">
              Live AI-like insights summarizing demand trends, helper readiness, urgency signals, and active request recommendations.
            </p>
          </Card>
          
          <div className="absolute -bottom-28 left-0 right-0 px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 shadow-lg">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Trend Pulse</h3>
              <h2 className="text-3xl font-extrabold mb-4 wrap-break-words">
                {loading ? '...' : topCategory.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
              </h2>
              <p className="text-sm text-[#5e6b6f]">Most common support area based on active community requests.</p>
            </Card>
            <Card className="p-8 shadow-lg">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Urgency Watch</h3>
              <h2 className="text-3xl font-extrabold mb-4">{loading ? '...' : highUrgencyCount}</h2>
              <p className="text-sm text-[#5e6b6f]">Requests currently flagged high priority by the urgency detector.</p>
            </Card>
            <Card className="p-8 shadow-lg">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Mentor Pool</h3>
              <h2 className="text-3xl font-extrabold mb-4">{loading ? '...' : mentorsCount}</h2>
              <p className="text-sm text-[#5e6b6f]">Trusted helpers with strong response history and contribution signals.</p>
            </Card>
          </div>
        </div>

        {/* AI RECOMMENDATIONS */}
        <Card className="p-12 bg-[#f4f2eb] mt-32">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">AI Recommendations</h3>
          <h2 className="text-4xl font-extrabold text-[#192122] mb-8">Requests needing attention</h2>

          <div className="space-y-4">
            {loading ? (
               <div className="text-[#5e6b6f] italic">Analyzing network requests...</div>
            ) : recommendedRequests.length > 0 ? (
               recommendedRequests.map((req) => (
                <Card key={req._id} className="bg-white p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/request/${req._id}`)}>
                  <h4 className="font-bold text-lg mb-2">{req.title}</h4>
                  <p className="text-[#5e6b6f] text-sm mb-4">
                    {req.aiSummary ? `AI summary: ${req.aiSummary}` : req.description.slice(0, 150) + '...'}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="primary">{req.category}</Badge>
                    <Badge variant={req.urgency === 'High' ? 'danger' : 'gray'}>{req.urgency}</Badge>
                  </div>
                </Card>
               ))
            ) : (
                <div className="text-[#5e6b6f] italic bg-white p-6 rounded-3xl border border-border">
                  No active requests needing attention right now! The community is caught up.
                </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
