// How It Works section explaining the process for NGOs and volunteers

import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';

export default function HowItWorks() {
  const ngoSteps = [
    {
      title: 'Register your organization',
      description: 'Create an NGO account with your organization details and get verified by our admin team.',
    },
    {
      title: 'Post volunteer opportunities',
      description: 'List specific tasks with requirements, skills needed, and time commitments.',
    },
    {
      title: 'Review applications',
      description: 'Browse volunteer applications and profiles to find the perfect match.',
    },
    {
      title: 'Connect with volunteers',
      description: 'Chat directly with selected volunteers and coordinate your initiatives.',
    },
  ];

  const volunteerSteps = [
    {
      title: 'Create your profile',
      description: 'Sign up and tell us about your skills, interests, and availability.',
    },
    {
      title: 'Browse opportunities',
      description: 'Explore volunteer tasks filtered by location, cause area, and your skills.',
    },
    {
      title: 'Apply to tasks',
      description: 'Submit applications to opportunities that match your passion and availability.',
    },
    {
      title: 'Make an impact',
      description: 'Connect with NGOs and start making a real difference in your community.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-neutral-50 py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600">
            Simple steps to get started and make an impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="for-ngos"
          >
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-primary-600" />
              <h3 className="text-3xl font-bold font-display text-neutral-900">
                For NGOs
              </h3>
            </div>
            <div className="space-y-6">
              {ngoSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white font-bold text-xl flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-neutral-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="for-volunteers"
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-accent-600" />
              <h3 className="text-3xl font-bold font-display text-neutral-900">
                For Volunteers
              </h3>
            </div>
            <div className="space-y-6">
              {volunteerSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white font-bold text-xl flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-neutral-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
