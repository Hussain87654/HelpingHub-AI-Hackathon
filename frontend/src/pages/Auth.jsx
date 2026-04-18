import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Both'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let res;
    if (isLogin) {
      res = await login(formData.email, formData.password);
    } else {
      res = await signup(formData.name, formData.email, formData.password, formData.role);
    }

    setLoading(false);

    if (res.success) {
      navigate('/feed');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <Card variant="dark" className="p-12 flex flex-col justify-center h-full min-h-[500px]">
          <h3 className="text-xs font-bold tracking-widest text-[#a8b7bc] uppercase mb-6">
            Community Access
          </h3>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Enter the support network.
          </h1>
          <p className="text-[#a8b7bc] text-lg mb-8 leading-relaxed max-w-md">
            Jump into a real platform designed for asking, offering, and tracking help with a premium interface. Connect with others securely.
          </p>
          <ul className="space-y-4 text-[#a8b7bc]">
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0e9f85] shrink-0" />
              <span>Role-based entry for Need Help, Can Help, or Both</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0e9f85] shrink-0" />
              <span>Direct path into dashboard, requests, AI Center, and community feed</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0e9f85] shrink-0" />
              <span>Real authentication powered by Express and MongoDB</span>
            </li>
          </ul>
        </Card>

        {/* Right Side */}
        <Card variant="light" className="p-12 flex flex-col justify-center h-full">
          <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </h3>
          <h2 className="text-4xl font-extrabold text-[#192122] mb-8 leading-tight">
            Authenticate your <br className="hidden md:block"/> community profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#5e6b6f] mb-2">Full Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe" 
                    required={!isLogin} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5e6b6f] mb-2">Role selection</label>
                  <Select name="role" value={formData.role} onChange={handleInputChange}>
                    <option value="Both">Both</option>
                    <option value="Need Help">Need Help</option>
                    <option value="Can Help">Can Help</option>
                  </Select>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5e6b6f] mb-2">Email</label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="community@helphub.ai" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5e6b6f] mb-2">Password</label>
                <Input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}

            <Button size="lg" className="w-full mt-4" type="submit" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login to continue' : 'Create Account')}
            </Button>
            
            <div className="text-center mt-4 border-t border-border pt-4">
              <span className="text-sm text-[#5e6b6f]">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-sm font-bold text-primary hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
