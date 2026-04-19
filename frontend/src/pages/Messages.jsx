import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        // Fetch recent conversations
        const { data } = await axios.get('/api/messages/conversations');
        setConversations(data);
        
        // Fetch all potential users to message (from leaderboard for simplicity)
        const userRes = await axios.get('/api/users/leaderboard');
        const otherUsers = userRes.data.filter(u => u._id !== user._id);
        setUsers(otherUsers);

        if (data.length > 0) {
          setSelectedUser(data[0].user._id);
        } else if (otherUsers.length > 0) {
          setSelectedUser(otherUsers[0]._id);
        }
      } catch (err) {
        console.error("Failed fetching messages", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [user]);

  useEffect(() => {
    if (!selectedUser) return;
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(`/api/messages/${selectedUser}`);
        setChatHistory(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [selectedUser]);

  const handleSend = async () => {
    if (!messageContent.trim() || !selectedUser) return;
    try {
      const { data } = await axios.post('/api/messages', {
        receiverId: selectedUser,
        content: messageContent
      });
      setChatHistory([...chatHistory, data]);
      setMessageContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return { time: `${hours}:${minutes}`, ampm };
  };

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

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {loading ? (
                <div className="text-[#5e6b6f] italic">Loading messages...</div>
              ) : chatHistory.length > 0 ? (
                chatHistory.map(msg => {
                  const { time, ampm } = formatTime(msg.createdAt);
                  const isViewer = msg.sender._id === user._id;
                  
                  return (
                    <Card key={msg._id} className={`p-6 shadow-none border ${isViewer ? 'border-primary/50 bg-[#f4fcf9]' : 'border-border'} flex items-start gap-4`}>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#192122] mb-2 text-sm">
                          {isViewer ? 'You' : msg.sender.name} → {isViewer ? msg.receiver.name : 'You'}
                        </h4>
                        <p className="text-[#5e6b6f] text-sm">{msg.content}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#f4f7f6] text-primary flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-bold leading-tight">{time}</span>
                        <span className="text-[10px] font-bold leading-tight">{ampm}</span>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-[#5e6b6f] italic">No messages found for this user. Say hi!</div>
              )}
            </div>
          </Card>

          {/* RIGHT: SEND MESSAGE */}
          <Card className="p-8">
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">Send Message</h3>
            <h2 className="text-3xl font-extrabold text-[#192122] mb-8">Start a<br/>conversation</h2>

            <div className="space-y-6">
              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">To</label>
                 <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                   <option value="" disabled>Select User</option>
                   {users.map(u => (
                     <option key={u._id} value={u._id}>{u.name}</option>
                   ))}
                 </Select>
              </div>

              <div>
                 <label className="block text-sm font-bold text-[#192122] mb-3">Message</label>
                 <Textarea 
                   value={messageContent}
                   onChange={e => setMessageContent(e.target.value)}
                   placeholder="Share support details, ask for files, or suggest next steps."
                   className="min-h-[140px]"
                 />
              </div>

              <div className="pt-2">
                <Button size="lg" className="w-full" onClick={handleSend} disabled={!selectedUser || !messageContent.trim()}>
                  Send Message
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
