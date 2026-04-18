import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export default function AICenter() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* TOP BACKGROUND CARD (Similar to absolute header in image) */}
        <div className="relative mb-24">
          <Card variant="dark" className="p-12 pb-24 rounded-b-3xl!">
            <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
              AI Center
            </h3>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              See what the platform intelligence is<br/>noticing.
            </h1>
            <p className="text-[#a8b7bc] text-lg">
              AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
            </p>
          </Card>
          
          <div className="absolute -bottom-16 left-0 right-0 px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 shadow-lg">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Trend Pulse</h3>
              <h2 className="text-3xl font-extrabold mb-4">Web<br/>Development</h2>
              <p className="text-sm text-[#5e6b6f]">Most common support area based on active community requests.</p>
            </Card>
            <Card className="p-8 shadow-lg">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Urgency Watch</h3>
              <h2 className="text-3xl font-extrabold mb-4">2</h2>
              <p className="text-sm text-[#5e6b6f]">Requests currently flagged high priority by the urgency detector.</p>
            </Card>
            <Card className="p-8 shadow-lg">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Mentor Pool</h3>
              <h2 className="text-3xl font-extrabold mb-4">2</h2>
              <p className="text-sm text-[#5e6b6f]">Trusted helpers with strong response history and contribution signals.</p>
            </Card>
          </div>
        </div>

        {/* AI RECOMMENDATIONS */}
        <Card className="p-12 bg-[#f4f2eb] mt-32">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">AI Recommendations</h3>
          <h2 className="text-4xl font-extrabold text-[#192122] mb-8">Requests needing attention</h2>

          <div className="space-y-4">
            <Card className="bg-white p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/request/1')}>
              <h4 className="font-bold text-lg mb-2">Need help</h4>
              <p className="text-[#5e6b6f] text-sm mb-4">AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.</p>
              <div className="flex gap-2">
                <Badge variant="primary">Web Development</Badge>
                <Badge variant="primary">High</Badge>
              </div>
            </Card>
            
            <Card className="bg-white p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/request/2')}>
              <h4 className="font-bold text-lg mb-2">Need help making my portfolio responsive before demo day</h4>
              <p className="text-[#5e6b6f] text-sm mb-4">Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.</p>
              <div className="flex gap-2">
                <Badge variant="primary">Web Development</Badge>
                <Badge variant="primary">High</Badge>
              </div>
            </Card>

            <Card className="bg-white p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/request/3')}>
              <h4 className="font-bold text-lg mb-2">Looking for Figma feedback on a volunteer event poster</h4>
              <p className="text-[#5e6b6f] text-sm mb-4">A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.</p>
              <div className="flex gap-2">
                <Badge variant="primary">Design</Badge>
                <Badge variant="gray">Medium</Badge>
              </div>
            </Card>

            <Card className="bg-white p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/request/4')}>
              <h4 className="font-bold text-lg mb-2">Need mock interview support for internship applications</h4>
              <p className="text-[#5e6b6f] text-sm mb-4">Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.</p>
              <div className="flex gap-2">
                <Badge variant="primary">Career</Badge>
                <Badge variant="gray">Low</Badge>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
