import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'Web Development',
    urgency: 'Medium',
  });
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({
    category: 'Waiting for input...',
    urgency: 'Waiting for input...',
    tags: 'Start typing to get suggestions...',
    rewrite: 'Describe your problem clearly.'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyAi = () => {
    // Simple local AI mock for hackathon purposes
    let detectedCategory = 'General';
    let detectedUrgency = 'Medium';
    const text = (formData.title + ' ' + formData.description).toLowerCase();
    
    if (text.includes('react') || text.includes('js') || text.includes('frontend')) detectedCategory = 'Web Development';
    if (text.includes('design') || text.includes('figma') || text.includes('ui')) detectedCategory = 'Design';
    if (text.includes('urgent') || text.includes('asap') || text.includes('deadline')) detectedUrgency = 'High';

    setFormData(prev => ({
      ...prev,
      category: detectedCategory,
      urgency: detectedUrgency,
      tags: detectedCategory === 'Web Development' ? 'JavaScript, React, Frontend' : 'Design, UI/UX',
    }));

    setAiAnalysis({
      category: detectedCategory,
      urgency: detectedUrgency,
      tags: 'Extracted key terms from your description.',
      rewrite: 'Your request looks clear and actionable now.'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await axios.post('/api/requests', payload);
      navigate('/feed');
    } catch (err) {
      console.error("Failed to create request", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Create Request
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Turn a rough problem into a clear help<br/>request.
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
          </p>
        </Card>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* LEFT FORM */}
          <div className="md:col-span-3">
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#192122] mb-3">Title</label>
                  <Input 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="E.g., Need review on my JavaScript quiz app" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#192122] mb-3">Description</label>
                  <Textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                    className="min-h-[160px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#192122] mb-3">Tags (Comma separated)</label>
                    <Input 
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="JavaScript, Debugging" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#192122] mb-3">Category</label>
                    <Select name="category" value={formData.category} onChange={handleChange}>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Career">Career</option>
                      <option value="General">General</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#192122] mb-3">Urgency</label>
                  <Select name="urgency" value={formData.urgency} onChange={handleChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="secondary" onClick={handleApplyAi}>Apply AI suggestions</Button>
                  <Button type="submit" disabled={loading}>{loading ? 'Publishing...' : 'Publish request'}</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT AI ASSISTANT */}
          <div className="md:col-span-2">
            <Card className="p-8 h-full bg-[#fcfbf7]">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">AI Assistant</h3>
              <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Smart request<br/>guidance</h2>

              <div className="space-y-8 divide-y divide-border">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[#5e6b6f]">Suggested category</span>
                  <span className="font-bold text-[#192122]">{aiAnalysis.category}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-[#5e6b6f]">Detected urgency</span>
                  <span className="font-bold text-[#192122]">{aiAnalysis.urgency}</span>
                </div>
                <div className="flex flex-col py-4 gap-2">
                  <div className="flex gap-4">
                    <span className="text-[#5e6b6f] w-32 shrink-0">Suggested tags</span>
                    <span className="font-bold text-[#192122] leading-tight">{aiAnalysis.tags}</span>
                  </div>
                </div>
                <div className="flex flex-col pt-4 gap-2">
                  <div className="flex gap-4">
                    <span className="text-[#5e6b6f] w-32 shrink-0">Rewrite suggestion</span>
                    <span className="font-bold text-[#192122] leading-tight">{aiAnalysis.rewrite}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
