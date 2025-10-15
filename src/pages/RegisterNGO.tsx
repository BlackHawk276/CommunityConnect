// NGO registration page with comprehensive form validation

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Phone, MapPin, FileText, Globe, Heart, Building } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { INDIAN_CITIES, CAUSE_AREAS } from '../data/constants';

const registerSchema = z.object({
  organizationName: z.string().min(3, 'Organization name must be at least 3 characters'),
  contactPerson: z.string().min(1, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  city: z.string().min(1, 'Please select a city'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  causeAreas: z.array(z.string()).min(1, 'Please select at least one cause area'),
  website: z.string().url('Invalid URL').optional().or(z.literal(''))
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterNGO: React.FC = () => {
  const [selectedCauseAreas, setSelectedCauseAreas] = useState<string[]>([]);
  const { registerNGO, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      causeAreas: []
    }
  });

  const handleCauseAreaToggle = (area: string) => {
    const updated = selectedCauseAreas.includes(area)
      ? selectedCauseAreas.filter(a => a !== area)
      : [...selectedCauseAreas, area];
    setSelectedCauseAreas(updated);
    setValue('causeAreas', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...ngoData } = data;
    await registerNGO(ngoData);
    navigate('/ngo/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary-600" />
            <span className="font-display font-bold text-2xl text-neutral-900">CommunityConnect</span>
          </Link>
          <h1 className="text-3xl font-bold font-display text-neutral-900 mb-2">Register Your NGO</h1>
          <p className="text-neutral-600">Join our platform and connect with dedicated volunteers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  {...register('organizationName')}
                  placeholder="Organization Name"
                  icon={Building}
                  error={errors.organizationName?.message}
                />
              </div>

              <div>
                <Input
                  {...register('contactPerson')}
                  placeholder="Contact Person Name"
                  icon={User}
                  error={errors.contactPerson?.message}
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
                  {...register('website')}
                  type="url"
                  placeholder="Website (optional)"
                  icon={Globe}
                  error={errors.website?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Organization Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Tell us about your organization, mission, and impact..."
                className={`w-full px-4 py-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-200'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Cause Areas (Select at least one)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {CAUSE_AREAS.map(area => (
                  <label
                    key={area}
                    className="flex items-center gap-3 p-3 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCauseAreas.includes(area)}
                      onChange={() => handleCauseAreaToggle(area)}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-200"
                    />
                    <span className="text-sm text-neutral-700">{area}</span>
                  </label>
                ))}
              </div>
              {errors.causeAreas && (
                <p className="mt-2 text-sm text-red-600">{errors.causeAreas.message}</p>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Register Organization'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Already registered?{' '}
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
