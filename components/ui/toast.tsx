'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export function Toast({ open, onClose, message }: ToastProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-border/50 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
            <Check className="w-4 h-4 text-green-500" />
          </motion.div>
          <p className="text-sm font-medium pr-8">{message}</p>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
