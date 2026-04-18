import React from 'react';
import { PortfolioData } from '../types';

// Compact metrics strip displayed near the top of the page.
// Maps over the `stats` collection from PortfolioData and emphasizes highlighted values.
export const StatsSection = ({ statsData }: { statsData: PortfolioData['stats'] }) => {
  return (
    <section className="pb-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((stat, idx) => (
          <div key={idx} className="space-y-1">
            <div className="font-label text-[9px] text-neutral-600 uppercase tracking-widest">{stat.label}</div>
            <div className={`font-label text-lg ${stat.highlight ? 'text-primary' : 'text-neutral-300'}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
