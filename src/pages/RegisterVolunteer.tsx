// Volunteer registration page with comprehensive form validation

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Phone, MapPin, FileText, Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { INDIAN_CITIES, SKILLS } from '../data/constants';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  city: z.string().min(1, 'Please select a city'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  availability: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterVolunteer: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { registerVolunteer, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      skills: []
    }
  });

  const bio = watch('bio') || '';

  const handleSkillToggle = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
    setValue('skills', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...volunteerData } = data;
    await registerVolunteer(volunteerData);
    navigate('/volunteer/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary-600" />
            <span className="font-display font-bold text-2xl text-neutral-900">CommunityConnect</span>
          </Link>
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">Join as a Volunteer</h1>
          <p className="text-neutral-600">Start making a difference in your community today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  {...register('firstName')}
                  placeholder="First Name"
                  icon={User}
                  error={errors.firstName?.message}
                />
              </div>

              <div>
                <Input
                  {...register('lastName')}
                  placeholder="Last Name"
                  icon={User}
                  error={errors.lastName?.message}
                />
              </div>

              <div>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Email Address"
                  icon={Mail}
                  error={errors.email?.message}
                />
              </div>

              <div>
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="Phone Number"
                  icon={Phone}
                  error={errors.phone?.message}
                />
              </div>

              <div>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  icon={Lock}
                  error={errors.password?.message}
                />
              </div>

              <div>
                <Input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="Confirm Password"
                  icon={Lock}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <div>
                <Select
                  {...register('city')}
                  icon={MapPin}
                  error={errors.city?.message}
                >
                  <option value="">Select City</option>
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Input
                  {...register('availability')}
                  placeholder="Availability (e.g., Weekends, 10 hours/week)"
                  icon={FileText}
                  error={errors.availability?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Bio (Optional, max 200 characters)
              </label>
              <textarea
                {...register('bio')}
                rows={3}
                placeholder="Tell us a bit about yourself and what motivates you to volunteer..."
                className={`w-full px-4 py-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${
                  errors.bio
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-200'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio.message}</p>
                )}
                <p className={`text-sm ml-auto ${bio.length > 200 ? 'text-red-600' : 'text-neutral-500'}`}>
                  {bio.length}/200
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Skills (Select at least one)
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {SKILLS.map(skill => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 p-3 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-200"
                    />
                    <span className="text-sm text-neutral-700">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && (
                <p className="mt-2 text-sm text-red-600">{errors.skills.message}</p>
              )}
            </div>

            <Button type="submit" variant="accent" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-neutral-600 hover:text-primary-600 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
