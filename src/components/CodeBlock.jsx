import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '13px',
      lineHeight: '1.6',
      margin: 0,
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    },
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/5 mt-3">
      {/* Language label + copy */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/3 border-b border-white/5">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={customStyle}
        showLineNumbers={code.split('\n').length > 3}
        wrapLines
        lineNumberStyle={{ color: 'rgba(255,255,255,0.15)', fontSize: '12px' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
