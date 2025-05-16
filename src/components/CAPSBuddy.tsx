
import React, { useState, useRef, useEffect } from "react";
import { Brain, ChevronRight, ArrowUp, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface CAPSBuddyProps {
  isOpen: boolean;
  onClose: () => void;
}

const CAPSBuddy: React.FC<CAPSBuddyProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { name } = useUser();
  
  // Add initial greeting when the dialog opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: `Hi ${name}! I'm CAPS Buddy, your AI learning assistant. How can I help you with your studies today?`,
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, name, messages.length]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const responseOptions = [
        "I can help explain that! In simple terms, " + inputValue.split(" ").slice(0, 3).join(" ") + " refers to an important concept in learning.",
        "Great question! Let me break this down for you step by step...",
        "That's something many students ask about. The key thing to remember is to approach it systematically.",
        "I'd recommend practicing with some examples to better understand this concept.",
        "Let me provide some study tips that might help you with this topic."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseOptions[Math.floor(Math.random() * responseOptions.length)],
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-quest-blue/20 flex items-center justify-center">
              <Brain size={18} className="text-quest-blue" />
            </div>
            <DialogTitle>CAPS Buddy</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-quest-primary text-white rounded-tr-none"
                    : "bg-gray-100 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 sticky bottom-0 bg-background">
          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="min-h-[44px] resize-none"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || isLoading}
              className="shrink-0"
            >
              <ArrowUp size={18} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CAPSBuddy;
