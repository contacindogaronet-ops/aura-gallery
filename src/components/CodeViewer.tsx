import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  FileCode2, 
  FileText, 
  Layers, 
  Sparkles,
  ExternalLink,
  Code2
} from 'lucide-react';
import { AndroidFile } from '../types';

interface CodeViewerProps {
  files: AndroidFile[];
  selectedFile: AndroidFile;
  onSelectFile: (file: AndroidFile) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  files,
  selectedFile,
  onSelectFile
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageBadgeColor = (lang: string) => {
    switch (lang) {
      case 'kotlin':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'xml':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'toml':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const lines = selectedFile.content.split('\n');

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* File Tab Bar */}
      <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {files.map(file => {
            const isSelected = selectedFile.path === file.path;
            return (
              <button
                key={file.path}
                onClick={() => onSelectFile(file)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-800 text-purple-300 border border-purple-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <FileCode2 className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                <span>{file.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Header Bar with Details and Copy */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-purple-400">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white font-mono">{selectedFile.path}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase ${getLanguageBadgeColor(selectedFile.language)}`}>
                {selectedFile.language}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{selectedFile.description}</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            copied
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-purple-600/90 hover:bg-purple-600 text-white shadow-xs active:scale-95'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200 select-text">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                <td className="pr-4 text-right select-none text-slate-600 font-mono w-10 text-[11px] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono align-top">
                  {renderHighlightedLine(line, selectedFile.language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Compatible with Gradle 8.x, AGP 8.5+, Kotlin 2.0, Jetpack Compose 2024</span>
        </span>
        <span>{lines.length} lines</span>
      </div>
    </div>
  );
};

// Syntax highlighing helper for Kotlin / XML / TOML
function renderHighlightedLine(line: string, language: string) {
  if (language === 'kotlin') {
    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }
    // Imports and Package
    if (line.trim().startsWith('package ') || line.trim().startsWith('import ')) {
      return (
        <span>
          <span className="text-purple-400 font-bold">{line.substring(0, line.indexOf(' '))}</span>
          <span className="text-slate-300">{line.substring(line.indexOf(' '))}</span>
        </span>
      );
    }
    // Annotations
    if (line.includes('@Composable') || line.includes('@OptIn') || line.includes('@Override')) {
      return <span className="text-amber-300 font-semibold">{line}</span>;
    }
  }

  if (language === 'xml') {
    if (line.trim().startsWith('<!--')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }
    if (line.includes('android:name=') || line.includes('xmlns:')) {
      return <span className="text-sky-300">{line}</span>;
    }
  }

  if (language === 'toml') {
    if (line.startsWith('[')) {
      return <span className="text-amber-400 font-bold">{line}</span>;
    }
    if (line.includes('=')) {
      const [key, ...val] = line.split('=');
      return (
        <span>
          <span className="text-sky-300 font-semibold">{key}</span>
          <span className="text-purple-400">=</span>
          <span className="text-emerald-300">{val.join('=')}</span>
        </span>
      );
    }
  }

  return <span>{line}</span>;
}
