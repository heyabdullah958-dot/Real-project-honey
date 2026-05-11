"use client";

import { motion } from "framer-motion";

const MGOEducationBar = () => {
  const mgoLevels = [
    { level: 30, color: "bg-amber-100", label: "Daily Wellness" },
    { level: 100, color: "bg-amber-300", label: "General Health" },
    { level: 263, color: "bg-amber-500", label: "Immunity Boost" },
    { level: 400, color: "bg-amber-700", label: "Therapeutic" },
    { level: 800, color: "bg-amber-900", label: "Clinical Grade" },
  ];

  return (
    <div className="py-12 border-y border-amber-900/10 bg-night/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center text-[10px] tracking-[0.3em] uppercase font-bold text-text-muted">
            <span>Potency Scale</span>
            <span>MGO Levels Explained</span>
          </div>

          <div className="relative h-2 bg-earth rounded-full flex items-center">
            {mgoLevels.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="absolute flex flex-col items-center gap-3"
                style={{ left: `${(index / (mgoLevels.length - 1)) * 100}%` }}
              >
                <div className={`w-4 h-4 rounded-full border-2 border-void ${item.color} shadow-[0_0_15px_rgba(212,147,10,0.3)]`} />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-text-primary">MGO {item.level}</span>
                  <span className="text-[9px] text-text-muted uppercase tracking-wider whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/10 via-amber-500/10 to-amber-900/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MGOEducationBar;
