// Hero section with animated background and call-to-action

import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function Hero() {
  return (
    <div className="relative min-h-[700px] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full shadow-soft mb-8"
        >
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-neutral-700">
            Connecting Communities Across India
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-neutral-900 mb-6 leading-tight"
        >
          Bridge the Gap Between
          <br />
          <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            NGOs & Volunteers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Discover meaningful volunteer opportunities or find passionate volunteers for your NGO's mission. Make an impact, one connection at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/register-volunteer">
            <Button variant="accent" size="lg" icon={Users}>
              I Want to Volunteer
            </Button>
          </Link>
          <Link to="/register-ngo">
            <Button variant="primary" size="lg" icon={Heart}>
              I'm an NGO
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '500+', label: 'NGOs Registered' },
            { number: '2,000+', label: 'Active Volunteers' },
            { number: '10,000+', label: 'Hours Contributed' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-soft p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-4xl font-bold font-display bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-neutral-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
