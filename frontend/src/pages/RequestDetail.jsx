import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await axios.get(`/api/requests/${id}`);
        setRequest(data);
      } catch (err) {
        console.error("Failed fetching request details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleOfferHelp = async () => {
    try {
      await axios.put(`/api/requests/${id}/offer`);
      const { data } = await axios.get(`/api/requests/${id}`);
      setRequest(data);
    } catch (err) {
      console.error("Failed to offer help", err);
      alert(err.response?.data?.msg || "Error offering help");
    }
  };

  const handleMarkSolved = async (helperId) => {
    try {
      // The markAsSolved requires a helperId. For now, assuming the first helper for simplicity, 
      // or pass it explicitly.
      await axios.put(`/api/requests/${id}/solve`, { helperId });
      const { data } = await axios.get(`/api/requests/${id}`);
      setRequest(data);
    } catch (err) {
      console.error("Failed to solve request", err);
    }
  };

  if (loading) return <div className="min-h-screen pt-32 pb-24 text-center text-white">Loading...</div>;
  if (!request) return <div className="min-h-screen pt-32 pb-24 text-center text-white">Request not found</div>;

  const isCreator = user && request.creator && user._id === request.creator._id;
  const isHelper = user && request.helpers && request.helpers.some(h => h._id === user._id);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* HEADER */}
        <Card variant="dark" className="p-12 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-6">
            Request Detail
          </h3>
          <div className="flex gap-2 mb-6 flex-wrap">
            <Badge variant="primary">{request.category}</Badge>
            <Badge variant={request.urgency === 'High' ? 'danger' : 'primary'}>{request.urgency}</Badge>
            <Badge variant="primary">{request.status}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {request.title}
          </h1>
          <p className="text-[#a8b7bc] text-lg">
            {request.description}
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            <Card className="p-8 pb-12">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">AI Summary</h3>
              <p className="text-[#5e6b6f] mb-6 leading-relaxed">
                {request.aiSummary || 'No AI summary generated for this request.'}
              </p>
              <div className="flex gap-2 flex-wrap">
                {request.tags && request.tags.map((tag, i) => (
                  <Badge key={i} variant="primary">{tag}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Actions</h3>
              <div className="flex gap-4">
                {!isCreator && request.status !== 'Solved' && (
                  <Button onClick={handleOfferHelp} disabled={isHelper}>
                    {isHelper ? 'Help Offered' : 'I can help'}
                  </Button>
                )}
                {isCreator && request.status === 'In-Progress' && request.helpers.length > 0 && (
                  <Button variant="secondary" onClick={() => handleMarkSolved(request.helpers[0]._id)}>
                    Mark as solved (with {request.helpers[0].name})
                  </Button>
                )}
                {isCreator && request.status === 'Open' && (
                  <div className="text-[#5e6b6f] text-sm">Waiting for helpers...</div>
                )}
                {request.status === 'Solved' && (
                  <div className="text-[#0e9f85] font-bold text-sm">This request has been solved!</div>
                )}
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            <Card className="p-8 pb-32 relative overflow-hidden">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Requester</h3>
              <div className="absolute top-[80px] left-0 w-full h-[60px] bg-white/50 backdrop-blur-md z-10 flex items-center justify-center opacity-0">
                {/* Simulated navbar blur overlay from design */}
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f8d07e] flex items-center justify-center font-bold text-[#b47a25]">
                  {request.creator ? request.creator.name.substring(0, 2).toUpperCase() : '??'}
                </div>
                <div>
                  <h4 className="font-bold text-[#192122] text-lg">{request.creator ? request.creator.name : 'Unknown'}</h4>
                  <p className="text-sm text-[#5e6b6f]">Trust Score: {request.creator ? request.creator.trustScore : 0}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Helpers</h3>
              <h4 className="font-bold text-xl mb-6 text-[#192122]">People ready to support</h4>
              
              <div className="space-y-4">
                {request.helpers && request.helpers.length > 0 ? (
                  request.helpers.map(helper => (
                    <Card key={helper._id} className="p-4 flex items-center justify-between border border-border shadow-none">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#fa865d] flex items-center justify-center text-white font-bold">
                          {helper.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#192122]">{helper.name}</div>
                          <div className="text-xs text-[#5e6b6f]">{helper.skills ? helper.skills.join(', ') : 'Ready to help'}</div>
                        </div>
                      </div>
                      <Badge variant="primary">Trust {helper.trustScore || 0}%</Badge>
                    </Card>
                  ))
                ) : (
                  <div className="text-sm text-[#5e6b6f] italic">No helpers yet. Be the first to offer help!</div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
