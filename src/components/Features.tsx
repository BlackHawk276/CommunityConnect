// Features section highlighting key platform benefits

import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck, Users } from 'lucide-react';
import Card from './Card';

export default function Features() {
  const features = [
    {
      icon: Users,
      title: 'Easy Matching',
      description: 'Smart algorithm connects NGOs with volunteers who match their requirements perfectly.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Organizations',
      description: 'All NGOs are admin-verified to ensure trust and transparency in the community.',
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Built-in chat system enables seamless communication between NGOs and volunteers.',
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 mb-4">
            Why Choose CommunityConnect?
          </h2>
          <p className="text-xl text-neutral-600">
            Powerful features designed to create meaningful connections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card hover>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
