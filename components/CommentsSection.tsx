import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, ExternalLink } from 'lucide-react';
import { useComments } from '../hooks/useComments';
import { Comment } from '../types';

interface CommentsSectionProps {
  channel: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ channel }) => {
  const { comments, addComment } = useComments(channel);
  const [message, setMessage] = useState('');
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addComment(message);
      setMessage('');
    }
  };

  // Auto-scroll to bottom when new comments arrive
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  return (
    <div className="glass-panel h-[500px] flex flex-col">
      <div className="p-4 border-b border-dark-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare size={18} className="text-brand-500" />
          <h2 className="font-medium">Live Comments</h2>
        </div>
        <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-1 rounded-full">
          On-Chain
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {comments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <MessageSquare size={24} className="mb-2 opacity-50" />
            <p className="text-sm">No comments yet</p>
            <p className="text-xs">Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment: Comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
        <div ref={commentsEndRef} />
      </div>

      <div className="p-4 border-t border-dark-100">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a comment..."
            className="flex-1 bg-dark-200 border border-dark-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:hover:bg-brand-500 px-3 py-2 rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-200 rounded-lg p-3"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-monad-500 flex items-center justify-center">
            <span className="text-xs font-bold">{comment.username[0].toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{comment.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(comment.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        {comment.txHash && (
          <a
            href={`https://testnet.monadexplorer.com/tx/${comment.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-500 hover:text-brand-400 flex items-center space-x-1"
          >
            <span>Tx</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
      
      <p className="mt-2 text-sm">{comment.message}</p>
      
      {comment.status === 'pending' && (
        <div className="mt-1 flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-xs text-amber-500">Confirming on-chain...</span>
        </div>
      )}
      
      {comment.status === 'failed' && (
        <div className="mt-1 flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-xs text-red-500">Transaction failed</span>
        </div>
      )}
    </motion.div>
  );
};