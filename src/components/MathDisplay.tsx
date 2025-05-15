
import React, { useEffect, useRef } from "react";

interface MathDisplayProps {
  content: string;
  className?: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ content, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger MathJax to process the new content
    if (containerRef.current && window.MathJax) {
      window.MathJax.typesetPromise([containerRef.current]).catch((err: Error) =>
        console.error("MathJax error:", err)
      );
    }
  }, [content]);

  return (
    <div ref={containerRef} className={`math-content ${className}`}>
      {content}
    </div>
  );
};

// Add MathJax type to window object
declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
    };
  }
}

export default MathDisplay;
