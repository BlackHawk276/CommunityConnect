// Filter sidebar for advanced task browsing

import React from 'react';
import { Search } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import { INDIAN_CITIES, CAUSE_AREAS, SKILLS } from '../data/constants';

interface FilterSidebarProps {
  filters: {
    search: string;
    city: string;
    causeArea: string;
    skills: string[];
  };
  onFilterChange: (filters: any) => void;
  taskCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, taskCount }) => {
  const hasActiveFilters = filters.search || filters.city || filters.causeArea || filters.skills.length > 0;

  const handleSkillToggle = (skill: string) => {
    const updated = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ ...filters, skills: updated });
  };

  const clearAll = () => {
    onFilterChange({ search: '', city: '', causeArea: '', skills: [] });
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
            Clear All
          </button>
        )}
      </div>

      <p className="text-sm text-neutral-600 mb-6">
        <span className="font-semibold text-neutral-900">{taskCount}</span> opportunities found
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">Search</label>
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search tasks..."
            icon={Search}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">Location</label>
          <Select
            value={filters.city}
            onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
          >
            <option value="">All Locations</option>
            {INDIAN_CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">Cause Area</label>
          <Select
            value={filters.causeArea}
            onChange={(e) => onFilterChange({ ...filters, causeArea: e.target.value })}
          >
            <option value="">All Causes</option>
            {CAUSE_AREAS.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">Required Skills</label>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {SKILLS.map(skill => (
              <label
                key={skill}
                className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-200"
                />
                <span className="text-sm text-neutral-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
