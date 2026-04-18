import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Profile() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Profile
          </h3>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Ayesha Khan
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            Both • Karachi
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PUBLIC PROFILE */}
          <Card className="p-8 pb-16">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Public Profile</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Skills and reputation</h2>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-[#5e6b6f]">Trust score</span>
                <span className="font-bold text-[#192122]">100%</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-[#5e6b6f]">Contributions</span>
                <span className="font-bold text-[#192122]">35</span>
              </div>

              <div>
                <h4 className="font-bold text-[#192122] mb-3">Skills</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="primary">Figma</Badge>
                  <Badge variant="primary">UI/UX</Badge>
                  <Badge variant="primary">HTML/CSS</Badge>
                  <Badge variant="primary">Career Guidance</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#192122] mb-3">Badges</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="primary">Design Ally</Badge>
                  <Badge variant="primary">Fast Responder</Badge>
                  <Badge variant="primary">Top Mentor</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* EDIT PROFILE */}
          <Card className="p-8">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Edit Profile</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Update your<br/>identity</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-[#192122] mb-3">Name</label>
                   <Input defaultValue="Ayesha Khan" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-[#192122] mb-3">Location</label>
                   <Input defaultValue="Karachi" />
                </div>
              </div>
              
              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">Skills</label>
                 <Input defaultValue="Figma, UI/UX, HTML/CSS, Career Guidance" />
              </div>

              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">Interests</label>
                 <Input defaultValue="Hackathons, UI/UX, Community Building" />
              </div>

              <div className="pt-2">
                <Button size="lg" className="w-full">Save profile</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
