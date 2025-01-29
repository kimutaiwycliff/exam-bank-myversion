'use client';
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/actions/Auth';
import { UserContext } from '@/lib/context';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const router = useRouter();
  // const { setUser } = useContext(UserContext);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    const result = await login(null, new FormData(e.target));

    if (result?.errors) {
      setErrors(result.errors);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid username or password',
      });
    } else {
      const user = result;
      // setUser(user);
      setErrors({});
      toast({
        variant: 'success',
        title: 'Login successful',
        description: 'You are now logged in',
      });
      router.push('/staff/grades');
    }

    setPending(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <div className=" mx-auto rounded-xl bg-gradient-to-b from-slate-300 to-slate-100">
          <Logo />
        </div>

        <div>
          <h3 className="font-bold text-xl ">USER LOGIN</h3>
          <label htmlFor="username" className="text-md ">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-2  w-full border-2 border-primary rounded-lg hover:ring-2 focus:ring-1"
          />
        </div>
        {errors?.username && <p className="text-red-500">{errors.username}</p>}
        <div>
          <label htmlFor="password" className="text-md">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2  w-full border-2 border-primary rounded-lg hover:ring-2 focus:ring-1"
          />
        </div>
        {errors?.password && <p className="text-red-500">{errors.password}</p>}
        <SubmitButton pending={pending} />
      </form>
    </div>
  );
}

function SubmitButton({ pending }) {
  return (
    <Button disabled={pending} type="submit" className="  py-2 rounded-xl">
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export default LoginForm;
