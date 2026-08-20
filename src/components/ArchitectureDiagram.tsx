import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Smartphone, 
  Database, 
  ArrowDown, 
  CheckCircle2, 
  Zap, 
  FolderTree,
  FileCode
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Overview Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Clean Architecture & Modern Android Stack</h3>
            <p className="text-xs text-slate-400">Prinsip arsitektur untuk aplikasi Aura Gallery (com.auragallery.app)</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Proyek ini dirancang menggunakan <strong>Clean Architecture</strong> berlapis (Presentation, Domain, Data) dengan pemisahan dependensi searah (Uni-directional Data Flow). Menggunakan <strong>Gradle 8.x</strong>, <strong>Kotlin 2.0</strong> dengan Compose Compiler baru, dan <strong>Material 3</strong>.
        </p>
      </div>

      {/* 3 Architecture Layers Visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Presentation Layer */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 font-mono">Layer 1</span>
              <Smartphone className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">Presentation Layer</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              UI deklaratif murni menggunakan Jetpack Compose dengan Material 3 Tokens.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>MainActivity.kt</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GalleryScreen.kt (LazyVerticalGrid)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GalleryViewModel (StateFlow)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AuraGalleryTheme (Dynamic Color)</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 font-medium">
            StateFlow &bull; Edge-to-Edge &bull; Coil Compose
          </div>
        </div>

        {/* Domain Layer */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 font-mono">Layer 2</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">Domain Layer</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Inti bisnis (Pure Kotlin / Android independent) tanpa ketergantungan pada UI framework.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>MediaItem.kt (Data Class)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>MediaRepository.kt (Interface)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GetMediaUseCase.kt (Optional)</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-300 font-medium">
            Kotlin Flow &bull; Coroutines &bull; Entities
          </div>
        </div>

        {/* Data Layer */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono">Layer 3</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">Data Layer</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Implementasi sumber data (MediaStore API, Caching, ContentResolver).
            </p>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>LocalMediaRepository.kt</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>DriveSyncService.kt (Streaming Retrofit)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>MediaSyncWorker.kt (WorkManager)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GoogleDriveApi.kt (REST v3)</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AuraGalleryApp.kt (Coil Config)</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
            Dispatchers.IO &bull; WorkManager &bull; CountingStreamBody
          </div>
        </div>
      </div>

      {/* Google Drive & WorkManager Architecture Highlight */}
      <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">Google Drive REST API & Background WorkManager Sync</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Arsitektur sinkronisasi dirancang tanpa kebocoran memori (<em>Zero Memory Spike / OOM-proof</em>) untuk file berukuran multi-gigabyte dan video 4K:
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-semibold block">1. CountingStreamRequestBody</span>
            <p className="text-slate-400 text-[10px]">Streaming langsung dari ContentResolver InputStream ke OkHttp Sink dalam chunk 8KB. Mencegah OOM.</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-blue-400 font-semibold block">2. Flow-based Progress</span>
            <p className="text-slate-400 text-[10px]">Emisi reaktif <code className="text-purple-300">UploadProgress.Uploading(percentage)</code> pada Dispatchers.IO.</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-semibold block">3. MediaSyncWorker (WorkManager)</span>
            <p className="text-slate-400 text-[10px]">Menjalankan upload di background saat app ditutup, dengan Exponential Backoff & Unmetered Network constraint.</p>
          </div>
        </div>
      </div>

      {/* Key Architectural Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Permission Strategy */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Android 13+ Granular Permissions</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sejak API level 33 (Tiramisu), permission lama <code className="text-purple-300 bg-slate-800 px-1 py-0.5 rounded">READ_EXTERNAL_STORAGE</code> digantikan dengan permission spesifik:
          </p>
          <div className="mt-2 p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 space-y-1">
            <p className="text-emerald-400">&bull; android.permission.READ_MEDIA_IMAGES</p>
            <p className="text-emerald-400">&bull; android.permission.READ_MEDIA_VIDEO</p>
            <p className="text-slate-500">&bull; maxSdkVersion=32 untuk perangkat Android 12 ke bawah</p>
          </div>
        </div>

        {/* Gradle 8 & Compose Compiler */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Gradle 8.x + Kotlin 2.0</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mulai Kotlin 2.0.0, Compose Compiler terintegrasi langsung ke dalam repo Kotlin melalui plugin <code className="text-purple-300 bg-slate-800 px-1 py-0.5 rounded">org.jetbrains.kotlin.plugin.compose</code>, mengeliminasi ketidakcocokan versi compiler antar release.
          </p>
          <div className="mt-2 p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 space-y-1">
            <p className="text-purple-300">alias(libs.plugins.compose.compiler)</p>
            <p className="text-slate-400">JavaVersion.VERSION_17 &bull; jvmTarget = "17"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
