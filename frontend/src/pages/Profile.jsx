import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', location: '', skills: '', interests: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/me');
        setProfile(data);
        setFormData({
          name: data.name || '',
          location: data.location || '',
          skills: data.skills ? data.skills.join(', ') : '',
          interests: data.interests ? data.interests.join(', ') : ''
        });
      } catch (err) {
        console.error("Failed fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        location: formData.location,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean)
      };
      const { data } = await axios.put('/api/users/me', payload);
      setProfile(data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error("Failed updating profile", err);
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading profile...</div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center text-white">Profile not found</div>;
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Profile
          </h3>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            {profile.name}
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            {profile.role} {profile.location ? `• ${profile.location}` : ''}
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
                <span className="font-bold text-[#192122]">{profile.trustScore}%</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-[#5e6b6f]">Contributions</span>
                <span className="font-bold text-[#192122]">{profile.contributions || 0}</span>
              </div>

              <div>
                <h4 className="font-bold text-[#192122] mb-3">Skills</h4>
                <div className="flex gap-2 flex-wrap">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, i) => <Badge key={i} variant="primary">{skill}</Badge>)
                  ) : <span className="text-sm text-[#5e6b6f]">No skills added yet</span>}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#192122] mb-3">Interests</h4>
                <div className="flex gap-2 flex-wrap">
                  {profile.interests && profile.interests.length > 0 ? (
                    profile.interests.map((interest, i) => <Badge key={i} variant="gray">{interest}</Badge>)
                  ) : <span className="text-sm text-[#5e6b6f]">No interests added</span>}
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
                   <Input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                   <label className="block text-sm font-bold text-[#192122] mb-3">Location</label>
                   <Input name="location" value={formData.location} onChange={handleChange} placeholder="City or Country" />
                </div>
              </div>
              
              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">Skills</label>
                 <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Design..." />
              </div>

              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">Interests</label>
                 <Input name="interests" value={formData.interests} onChange={handleChange} placeholder="Hackathons, AI, Open Source..." />
              </div>

              <div className="pt-2">
                <Button size="lg" className="w-full" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
