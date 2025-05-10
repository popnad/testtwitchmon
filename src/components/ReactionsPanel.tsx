import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ThumbsUp, Flame, DivideIcon as LucideIcon, Star, Zap } from 'lucide-react';
import { useReactions } from '../hooks/useReactions';
import { useStreamChannel } from '../hooks/useStreamChannel';
import { Reaction } from '../types';

export const ReactionsPanel: React.FC = () => {
  const { channel } = useStreamChannel();
  const { reactions, addReaction } = useReactions(channel);
  const containerRef = useRef<HTMLDivElement>(null);

  // Color mapping for reactions
  const reactionConfig: Record<string, { icon: LucideIcon, color: string }> = {
    'heart': { icon: Heart, color: 'text-red-500' },
    'like': { icon: ThumbsUp, color: 'text-blue-500' },
    'fire': { icon: Flame, color: 'text-orange-500' },
    'wow': { icon: Star, color: 'text-yellow-500' },
    'energy': { icon: Zap, color: 'text-purple-500' },
  };

  return (
    <div className="glass-panel h-[180px]">
      <div className="p-4 border-b border-dark-100 flex justify-between items-center">
        <h2 className="font-medium">Reactions</h2>
        <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-1 rounded-full">
          On-Chain
        </span>
      </div>
      
      <div className="p-4 flex flex-col">
        <div className="flex justify-center space-x-3 mb-4">
          {Object.entries(reactionConfig).map(([key, { icon: Icon, color }]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addReaction(key)}
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-dark-200 hover:bg-dark-100 ${color} transition-colors`}
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>
        
        <div ref={containerRef} className="flex-1 relative overflow-hidden">
          <AnimatePresence>
            {reactions.map((reaction: Reaction) => (
              <ReactionAnimation 
                key={reaction.id} 
                reaction={reaction} 
                config={reactionConfig}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface ReactionAnimationProps {
  reaction: Reaction;
  config: Record<string, { icon: LucideIcon, color: string }>;
}

const ReactionAnimation: React.FC<ReactionAnimationProps> = ({ reaction, config }) => {
  const { icon: Icon, color } = config[reaction.type] || { icon: Heart, color: 'text-red-500' };
  
  // Calculate random position and animation settings
  const randomX = Math.random() * 80 + 10; // 10-90% of container width
  const randomDuration = 2 + Math.random() * 2; // 2-4 seconds
  const randomScale = 0.8 + Math.random() * 0.4; // 0.8-1.2 scale
  
  return (
    <motion.div
      initial={{ 
        opacity: 1, 
        y: '100%', 
        x: `${randomX}%`, 
        scale: randomScale 
      }}
      animate={{ 
        opacity: [1, 1, 0], 
        y: '-100%', 
        transition: { duration: randomDuration, ease: 'easeOut' } 
      }}
      exit={{ opacity: 0 }}
      className={`absolute ${color}`}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0, -5, 0], 
          x: [0, 5, 0, -5, 0] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: 'mirror' 
        }}
      >
        <Icon size={24} fill="currentColor" />
      </motion.div>
    </motion.div>
  );
};