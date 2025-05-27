import React, { useEffect, useRef } from "react";

interface MathDisplayProps {
  content: string;
  className?: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ content, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMath = async () => {
      if (containerRef.current && window.MathJax) {
        try {
          // Wait for MathJax to be ready
          if (window.MathJax.startup && window.MathJax.startup.promise) {
            await window.MathJax.startup.promise;
          }
          
          // Typeset the math
          await window.MathJax.typesetPromise([containerRef.current]);
        } catch (err) {
          console.error("MathJax error:", err);
        }
      }
    };

    renderMath();
  }, [content]);

  // Process content to ensure proper line breaks
  const processedContent = content
    .split('\n')
    .map(line => line.trim())
    .join('\n');

  return (
    <div 
      ref={containerRef} 
      className={`math-content ${className} tex2jax_process`}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {processedContent}
    </div>
  );
};

// Add MathJax type to window object
declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
      startup: {
        promise: Promise<void>;
        defaultReady: () => void;
      };
    };
  }
}

export default MathDisplay;

