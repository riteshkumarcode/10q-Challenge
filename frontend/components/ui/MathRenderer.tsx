'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

/**
 * Safely parses and renders strings containing LaTeX math notations ($...$ inline or $$...$$ block)
 * alongside normal HTML text.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // Regex to detect $$...$$ (block) and $...$ (inline)
    const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
    const inlineMathRegex = /\$([^\$\n]+?)\$/g;

    let processed = content;

    // Process block math
    processed = processed.replace(blockMathRegex, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        });
      } catch (e) {
        return `<span class="katex-error text-red-500 font-mono text-sm">[Math Error: ${math}]</span>`;
      }
    });

    // Process inline math
    processed = processed.replace(inlineMathRegex, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
      } catch (e) {
        return `<span class="katex-error text-red-500 font-mono text-sm">[Math Error: ${math}]</span>`;
      }
    });

    return processed;
  }, [content]);

  return (
    <div
      className={`math-content inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
