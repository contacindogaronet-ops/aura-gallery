import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileCode2, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Box,
  Layers,
  Settings
} from 'lucide-react';
import { AndroidFile } from '../types';

interface ProjectTreeProps {
  files: AndroidFile[];
  selectedFile: AndroidFile;
  onSelectFile: (file: AndroidFile) => void;
}

interface TreeNode {
  name: string;
  fullPath: string;
  file?: AndroidFile;
  children?: { [key: string]: TreeNode };
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({
  files,
  selectedFile,
  onSelectFile
}) => {
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({
    'app': true,
    'app/src': true,
    'app/src/main': true,
    'app/src/main/java': true,
    'app/src/main/java/com': true,
    'app/src/main/java/com/auragallery': true,
    'app/src/main/java/com/auragallery/app': true,
    'app/src/main/java/com/auragallery/app/ui': true,
    'app/src/main/java/com/auragallery/app/domain': true,
    'app/src/main/java/com/auragallery/app/data': true,
    'gradle': true
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 shadow-md h-full flex flex-col">
      <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Box className="w-4 h-4 text-purple-400" />
          <span>Android Project Hierarchy</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">com.auragallery.app</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-0.5 text-xs font-mono select-none">
        {files.map(file => {
          const isSelected = selectedFile.path === file.path;
          const isKeyFile = [
            'build.gradle.kts',
            'app/build.gradle.kts',
            'app/src/main/AndroidManifest.xml',
            'app/src/main/java/com/auragallery/app/MainActivity.kt',
            'app/src/main/java/com/auragallery/app/ui/GalleryScreen.kt'
          ].includes(file.path);

          return (
            <div
              key={file.path}
              onClick={() => onSelectFile(file)}
              className={`px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                isSelected
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                <span className="truncate">{file.path}</span>
              </div>
              {isKeyFile && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-sans font-medium shrink-0 ml-1">
                  Requested
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between px-2">
        <span>Total: {files.length} project files</span>
        <span className="text-emerald-400">Clean Architecture</span>
      </div>
    </div>
  );
};
