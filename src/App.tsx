import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Code2, 
  Smartphone, 
  Download, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  FileCode2, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  FolderTree,
  Terminal
} from 'lucide-react';
import { ANDROID_FILES } from './data/androidProjectData';
import { AndroidFile } from './types';
import { CodeViewer } from './components/CodeViewer';
import { AndroidEmulator } from './components/AndroidEmulator';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ProjectTree } from './components/ProjectTree';
import { generateAndroidProjectZip, downloadBlob } from './utils/zipGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'code' | 'emulator' | 'architecture'>('code');
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_FILES[0]);
  const [deviceDarkMode, setDeviceDarkMode] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copyAllToast, setCopyAllToast] = useState<boolean>(false);

  // Key requested files shortcuts
  const keyFiles = [
    { label: 'DriveSyncService.kt', path: 'app/src/main/java/com/auragallery/app/sync/DriveSyncService.kt' },
    { label: 'MediaSyncWorker.kt', path: 'app/src/main/java/com/auragallery/app/sync/MediaSyncWorker.kt' },
    { label: 'GoogleDriveApi.kt', path: 'app/src/main/java/com/auragallery/app/sync/GoogleDriveApi.kt' },
    { label: 'LocalMediaRepository.kt', path: 'app/src/main/java/com/auragallery/app/data/LocalMediaRepository.kt' },
    { label: 'GalleryViewModel.kt', path: 'app/src/main/java/com/auragallery/app/ui/viewmodel/GalleryViewModel.kt' },
    { label: 'GalleryScreen.kt', path: 'app/src/main/java/com/auragallery/app/ui/GalleryScreen.kt' },
    { label: 'MainActivity.kt', path: 'app/src/main/java/com/auragallery/app/MainActivity.kt' },
    { label: 'app/build.gradle.kts', path: 'app/build.gradle.kts' }
  ];

  const handleExportZip = async () => {
    try {
      setIsExporting(true);
      const zipBlob = await generateAndroidProjectZip();
      downloadBlob(zipBlob, 'AuraGallery_Android_Project.zip');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (err) {
      console.error('Failed to export zip:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCurrentFile = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopyAllToast(true);
    setTimeout(() => setCopyAllToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Header Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/30 ring-1 ring-white/20">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Aura Gallery</h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Senior Android Architect
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">com.auragallery.app &bull; Kotlin &bull; Jetpack Compose &bull; Gradle 8.x</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code & Gradle</span>
          </button>

          <button
            onClick={() => setActiveTab('emulator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'emulator'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Compose Live Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Specs</span>
          </button>
        </div>

        {/* Export Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportZip}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating ZIP...' : 'Export Project (.zip)'}</span>
          </button>
        </div>
      </header>

      {/* Quick Navigation Pills for the 5 Requested Files */}
      <div className="bg-slate-900/40 border-b border-slate-800/60 px-4 sm:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>Requested Files:</span>
        </span>
        {keyFiles.map((item, index) => {
          const target = ANDROID_FILES.find(f => f.path === item.path);
          const isSelected = selectedFile.path === item.path;
          return (
            <button
              key={index}
              onClick={() => {
                if (target) {
                  setSelectedFile(target);
                  setActiveTab('code');
                }
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
            {/* Left Column: Project Tree */}
            <div className="lg:col-span-4 h-full">
              <ProjectTree
                files={ANDROID_FILES}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
              />
            </div>

            {/* Right Column: Code Viewer */}
            <div className="lg:col-span-8 h-full">
              <CodeViewer
                files={ANDROID_FILES}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
              />
            </div>
          </div>
        )}

        {activeTab === 'emulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Device Simulator */}
            <div className="lg:col-span-6 flex justify-center">
              <AndroidEmulator
                darkMode={deviceDarkMode}
                onToggleDarkMode={() => setDeviceDarkMode(!deviceDarkMode)}
              />
            </div>

            {/* Right: Jetpack Compose Specs & Interactive Guidance */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                <div className="flex items-center gap-2.5 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-base font-bold text-white">Jetpack Compose UI Simulation</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Simulator ini mendemonstrasikan perilaku <code className="text-purple-300 bg-slate-800 px-1 py-0.5 rounded font-mono">GalleryScreen.kt</code>:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">LazyVerticalGrid:</strong>
                      <p className="text-slate-400 mt-0.5">
                        Menggunakan <code className="text-purple-300">GridCells.Adaptive(minSize = 110.dp)</code> untuk adaptasi otomatis layar smartphone, foldable, hingga tablet.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Coil AsyncImage Rendering:</strong>
                      <p className="text-slate-400 mt-0.5">
                        Memanfaatkan <code className="text-purple-300">AsyncImage</code> dengan disk cache dan crossfade transitions untuk performa 60+ FPS saat scrolling.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">State Handling:</strong>
                      <p className="text-slate-400 mt-0.5">
                        Menangani status izin ditolak (Permission Denied UI), status loading progress bar, dan status galeri kosong (Empty State).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Code Reference Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Lihat kode Jetpack Compose</p>
                  <p className="text-[11px] text-slate-400">Buka langsung file GalleryScreen.kt di editor</p>
                </div>
                <button
                  onClick={() => {
                    const file = ANDROID_FILES.find(f => f.path.includes('GalleryScreen.kt'));
                    if (file) {
                      setSelectedFile(file);
                      setActiveTab('code');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Inspect GalleryScreen.kt</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <ArchitectureDiagram />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <p>Aura Gallery &bull; Native Android Clean Architecture Kotlin Stack</p>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono">Package: com.auragallery.app</span>
          <span>&bull;</span>
          <span className="text-purple-400 font-mono">Gradle 8.5.2 &bull; Kotlin 2.0.0</span>
        </div>
      </footer>
    </div>
  );
}
