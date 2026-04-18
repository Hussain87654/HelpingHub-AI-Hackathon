import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardFeed() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', urgency: '' });

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let query = '';
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All categories') params.append('category', filters.category);
      if (filters.urgency && filters.urgency !== 'All urgency levels') params.append('urgency', filters.urgency);
      
      const { data } = await axios.get(`/api/requests?${params.toString()}`);
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HERO HEADER */}
        <Card variant="dark" className="p-12 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-4">
            Explore / Feed
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Browse help requests with filterable<br/>community context.
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            Filter by category, urgency, skills, and location to surface the best matches.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
          {/* SIDEBAR FILTERS */}
          <div className="md:col-span-1 sticky top-32">
            <Card className="p-8">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Filters</h3>
              <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Refine the feed</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#192122] mb-3">Category</label>
                  <Select name="category" aria-label="Category" onChange={handleFilterChange} value={filters.category}>
                    <option>All categories</option>
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>Career</option>
                    <option>General</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#192122] mb-3">Urgency</label>
                  <Select name="urgency" aria-label="Urgency" onChange={handleFilterChange} value={filters.urgency}>
                    <option>All urgency levels</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* MAIN FEED */}
          <div className="md:col-span-2 space-y-6">
            {loading ? (
              <div className="text-center py-12">Loading requests...</div>
            ) : requests.length === 0 ? (
              <Card className="p-8 text-center text-[#5e6b6f]">
                No requests found matching your filters.
              </Card>
            ) : (
              requests.map((req) => (
                <Card key={req._id}>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="primary">{req.category}</Badge>
                    <Badge variant={req.urgency === 'High' ? 'danger' : 'gray'}>{req.urgency}</Badge>
                    <Badge variant="primary">{req.status}</Badge>
                  </div>
                  <h4 className="font-bold text-xl mb-3">{req.title}</h4>
                  <p className="text-[#5e6b6f] mb-4">{req.description}</p>
                  
                  {req.tags && req.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-6">
                      {req.tags.map((tag, i) => (
                        <Badge key={i} variant="gray">{tag}</Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <div className="font-bold text-sm">{req.creator ? req.creator.name : 'Unknown User'}</div>
                      <div className="text-xs text-[#5e6b6f]">
                        {req.helpers ? req.helpers.length : 0} helpers interested
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => navigate(`/request/${req._id}`)}>Open details</Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
