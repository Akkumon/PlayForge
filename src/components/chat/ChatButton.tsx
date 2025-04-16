import { MessageCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 p-4 rounded-full transition-all duration-200 z-50",
        "bg-purple-600 hover:bg-purple-700 text-white shadow-lg",
        "flex items-center justify-center",
        isOpen ? "scale-90" : "scale-100"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </button>
  );
} 