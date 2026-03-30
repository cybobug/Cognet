import { motion } from 'framer-motion';

import { Code2, Sun } from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

import { cn } from '../lib/utils';



export function ThemeToggle() {

  const { mode, setMode } = useTheme();



  return (

    <div className="relative flex items-center p-1 rounded-full bg-surface/50 border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden"

      style={{ width: '260px', height: '44px' }}>

      <motion.div

        className="absolute inset-y-1 rounded-full bg-white dark:bg-white/10 border border-black/5 dark:border-white/20 shadow-sm"

        initial={false}

        animate={{

          x: mode === 'non-technical' ? 4 : 128,

          width: 124,

        }}

        transition={{ type: 'spring', stiffness: 450, damping: 35 }}

      />



      <div className="relative z-10 flex w-full text-[13px] font-semibold">

        <button

          onClick={() => setMode('non-technical')}

          className={cn(

            "flex-1 flex items-center justify-center gap-2.5 transition-colors duration-200 outline-none",

            mode === 'non-technical' ? "text-primary dark:text-amber-400" : "text-text-secondary hover:text-text-primary"

          )}

        >

          <Sun className={cn("w-4 h-4", mode === 'non-technical' ? "fill-current" : "")} />

          <span>Non-Technical</span>

        </button>

        <button

          onClick={() => setMode('technical')}

          className={cn(

            "flex-1 flex items-center justify-center gap-2.5 transition-colors duration-200 outline-none",

            mode === 'technical' ? "text-primary dark:text-indigo-400" : "text-text-secondary hover:text-text-primary"

          )}

        >

          <Code2 className="w-4 h-4" />

          <span>Technical</span>

        </button>

      </div>

    </div>

  );

}