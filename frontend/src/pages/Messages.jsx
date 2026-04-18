import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';

export default function Messages() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Interaction / Messaging
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Keep support moving through direct<br/>communication.
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: CONVERSATION STREAM */}
          <Card className="p-8">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Conversation Stream</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Recent messages</h2>

            <div className="space-y-4">
              <Card className="p-6 shadow-none border border-border flex items-start gap-4">
                 <div className="flex-1">
                   <h4 className="font-bold text-[#192122] mb-2 text-sm">Ayesha Khan → Sara Noor</h4>
                   <p className="text-[#5e6b6f] text-sm">I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-[#f4f7f6] text-primary flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold leading-tight">09:45</span>
                    <span className="text-[10px] font-bold leading-tight">AM</span>
                 </div>
              </Card>

              <Card className="p-6 shadow-none border border-border flex items-start gap-4">
                 <div className="flex-1">
                   <h4 className="font-bold text-[#192122] mb-2 text-sm">Hassan Ali → Ayesha Khan</h4>
                   <p className="text-[#5e6b6f] text-sm">Your event poster concept is solid. I would tighten the CTA and reduce the background texture.</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-[#f4f7f6] text-primary flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold leading-tight">11:10</span>
                    <span className="text-[10px] font-bold leading-tight">AM</span>
                 </div>
              </Card>
            </div>
          </Card>

          {/* RIGHT: SEND MESSAGE */}
          <Card className="p-8">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Send Message</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Start a<br/>conversation</h2>

            <div className="space-y-6">
              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">To</label>
                 <Select>
                   <option>Ayesha Khan</option>
                   <option>Hassan Ali</option>
                   <option>Sara Noor</option>
                 </Select>
              </div>

              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">Message</label>
                 <Textarea 
                   placeholder="Share support details, ask for files, or suggest next steps."
                   className="min-h-[140px]"
                 />
              </div>

              <div className="pt-2">
                <Button size="lg" className="w-full">Send</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
