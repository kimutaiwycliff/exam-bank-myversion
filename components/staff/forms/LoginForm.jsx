'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/actions/Auth';
import dynamic from 'next/dynamic';
const Logo = dynamic(() => import('@/components/layout/Logo'), { ssr: false });
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    const result = await login(null, new FormData(e.target));

    if (result?.errors) {
      setErrors(result.errors);
      toast({ variant: 'destructive', title: 'Login failed', description: 'Invalid credentials' });
    } else {
      toast({ variant: 'success', title: 'Login successful', description: 'Redirecting...' });
      router.replace('/staff/grades'); // Use replace to prevent back-navigation
    }
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="mx-auto">
        <Logo />
      </div>

      {/* <h3 className="text-xl font-bold text-center">USER LOGIN</h3> */}

      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
          className="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <Button type="submit" disabled={pending} className="py-2 rounded-lg">
        {pending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
