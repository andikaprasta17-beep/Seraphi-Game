'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { trackRedeemCodeCopy } from '@/lib/analytics';

interface SidebarCopyButtonProps {
  code: string;
  gameName?: string;
}

export default function SidebarCopyButton({ code, gameName }: SidebarCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      trackRedeemCodeCopy(code, gameName);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      trackRedeemCodeCopy(code, gameName);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="sidebar-copy-btn"
      title={copied ? 'Kode Tersalin!' : 'Salin Kode'}
      aria-label="Salin Kode"
    >
      {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
      <span>{copied ? 'Tersalin' : 'Salin'}</span>
    </button>
  );
}
