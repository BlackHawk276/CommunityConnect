// Call-to-action section encouraging users to join the platform

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Join thousands of change-makers today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register-volunteer">
              <Button variant="accent" size="lg">
                Join as Volunteer
              </Button>
            </Link>
            <Link to="/register-ngo">
              <Button variant="primary" size="lg">
                Register NGO
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
