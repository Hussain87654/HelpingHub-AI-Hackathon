import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="flex flex-col justify-center pr-8">
            <h3 className="text-xs font-bold tracking-widest text-[#5e6b6f] uppercase mb-4">
              SMIT Grand Coding Night 2026
            </h3>
            <h1 className="text-5xl md:text-[56px] font-extrabold text-[#192122] mb-6 leading-[1.1]">
              Find help faster.<br/>Become help that<br/>matters.
            </h1>
            <p className="text-lg text-[#5e6b6f] mb-8 leading-relaxed">
              HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
            </p>
            <div className="flex items-center gap-4 mb-16">
              <Button size="lg" onClick={() => navigate('/login')}>Open product demo</Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/create-request')}>Post a request</Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="text-xs font-bold text-primary mb-2 uppercase">Members</div>
                <div className="text-3xl font-extrabold text-[#192122] mb-2">384+</div>
                <div className="text-sm text-[#5e6b6f]">Students, mentors, and helpers in the loop.</div>
              </Card>
              <Card className="p-6">
                <div className="text-xs font-bold text-primary mb-2 uppercase">Requests</div>
                <div className="text-3xl font-extrabold text-[#192122] mb-2">72+</div>
                <div className="text-sm text-[#5e6b6f]">Support posts shared across learning journeys.</div>
              </Card>
              <Card className="p-6">
                <div className="text-xs font-bold text-primary mb-2 uppercase">Solved</div>
                <div className="text-3xl font-extrabold text-[#192122] mb-2">69+</div>
                <div className="text-sm text-[#5e6b6f]">Problems resolved through fast community action.</div>
              </Card>
            </div>
          </div>

          <div>
            <Card variant="dark" className="h-full p-10 flex flex-col relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-linear-to-br from-[#f8d07e] to-[#d69f37] rounded-full opacity-90 blur-sm shadow-[0_0_80px_rgba(248,208,126,0.4)]" />
              <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4 relative z-10">
                Live Product Feel
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight relative z-10">
                More than a form.<br/>More like an<br/>ecosystem.
              </h2>
              <p className="text-[#a8b7bc] text-lg mb-8 leading-relaxed relative z-10">
                A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
              </p>

              <div className="space-y-4 relative z-10 mt-auto">
                <div className="bg-[#fcfbf7] rounded-2xl p-5 text-[#192122]">
                  <h4 className="font-bold mb-1">AI request intelligence</h4>
                  <p className="text-sm text-[#5e6b6f]">Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
                </div>
                <div className="bg-[#fcfbf7] rounded-2xl p-5 text-[#192122]">
                  <h4 className="font-bold mb-1">Community trust graph</h4>
                  <p className="text-sm text-[#5e6b6f]">Badges, helper rankings, trust score boosts, and visible contribution history.</p>
                </div>
                <div className="bg-[#fcfbf7] rounded-2xl p-5 text-[#192122]">
                  <h4 className="font-bold mb-1">100%</h4>
                  <p className="text-sm text-[#5e6b6f]">Top trust score currently active across the sample mentor network.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CORE FLOW */}
        <div className="mb-24">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Core Flow</h3>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-4xl font-extrabold text-[#192122]">From struggling alone to solving together</h2>
            <Button variant="secondary">Try onboarding AI</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h4 className="font-bold text-lg mb-3">Ask for help clearly</h4>
              <p className="text-[#5e6b6f]">Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.</p>
            </Card>
            <Card>
              <h4 className="font-bold text-lg mb-3">Discover the right people</h4>
              <p className="text-[#5e6b6f]">Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.</p>
            </Card>
            <Card>
              <h4 className="font-bold text-lg mb-3">Track real contribution</h4>
              <p className="text-[#5e6b6f]">Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.</p>
            </Card>
          </div>
        </div>

        {/* FEATURED REQUESTS */}
        <div>
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-4">Featured Requests</h3>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-4xl font-extrabold text-[#192122]">Community problems currently in motion</h2>
            <Button variant="secondary" onClick={() => navigate('/feed')}>View full feed</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col">
              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="primary">Web Development</Badge>
                <Badge variant="danger">High</Badge>
                <Badge variant="primary">Solved</Badge>
              </div>
              <h4 className="font-bold text-lg mb-3">Need help</h4>
              <p className="text-[#5e6b6f] text-sm flex-1 mb-6">helpn needed</p>
              <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <div>
                  <div className="font-bold text-sm">Ayesha Khan</div>
                  <div className="text-xs text-[#5e6b6f]">Karachi • 1 helper interested</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate('/request/1')}>Open details</Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="primary">Web Development</Badge>
                <Badge variant="danger">High</Badge>
                <Badge variant="primary">Solved</Badge>
              </div>
              <h4 className="font-bold text-lg mb-3">Need help making my portfolio responsive before demo day</h4>
              <p className="text-[#5e6b6f] text-sm mb-4 line-clamp-3">My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.</p>
              <div className="flex gap-2 flex-wrap mb-6 flex-1">
                <Badge variant="gray">HTML/CSS</Badge>
                <Badge variant="primary">Responsive</Badge>
                <Badge variant="primary">Portfolio</Badge>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <div>
                  <div className="font-bold text-sm">Sara Noor</div>
                  <div className="text-xs text-[#5e6b6f]">Karachi • 1 helper interested</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate('/request/2')}>Open details</Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="primary">Design</Badge>
                <Badge variant="gray">Medium</Badge>
                <Badge variant="primary">Open</Badge>
              </div>
              <h4 className="font-bold text-lg mb-3">Looking for Figma feedback on a volunteer event poster</h4>
              <p className="text-[#5e6b6f] text-sm mb-4 line-clamp-3">I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.</p>
              <div className="flex gap-2 flex-wrap mb-6 flex-1">
                <Badge variant="primary">Figma</Badge>
                <Badge variant="primary">Poster</Badge>
                <Badge variant="primary">Design Review</Badge>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <div>
                  <div className="font-bold text-sm">Ayesha Khan</div>
                  <div className="text-xs text-[#5e6b6f]">Lahore • 1 helper interested</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate('/request/3')}>Open details</Button>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 text-center text-sm text-[#5e6b6f]">
          HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
        </div>
      </div>
    </div>
  );
}
