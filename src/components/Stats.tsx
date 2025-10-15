// Statistics section showcasing platform impact

import { motion } from 'framer-motion';

export default function Stats() {
  const stats = [
    { number: '500+', label: 'NGOs Registered' },
    { number: '2,000+', label: 'Active Volunteers' },
    { number: '10,000+', label: 'Hours Contributed' },
    { number: '12+', label: 'Cities Connected' },
  ];

  return (
    <section className="bg-neutral-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold font-display mb-2 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-neutral-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
