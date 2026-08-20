import React, { useState } from 'react';
import { 
  Lock, 
  RefreshCw, 
  Image as ImageIcon, 
  Play, 
  Film, 
  Sun, 
  Moon, 
  Grid3X3, 
  Grid2X2, 
  LayoutGrid, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  X,
  Share2,
  Heart,
  Calendar,
  HardDrive,
  CloudUpload,
  Upload,
  CheckCircle
} from 'lucide-react';
import { MOCK_GALLERY_PHOTOS } from '../data/androidProjectData';
import { MediaPhoto } from '../types';

interface AndroidEmulatorProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const AndroidEmulator: React.FC<AndroidEmulatorProps> = ({
  darkMode,
  onToggleDarkMode
}) => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(true);
  const [mediaList, setMediaList] = useState<MediaPhoto[]>(MOCK_GALLERY_PHOTOS);
  const [filterType, setFilterType] = useState<'all' | 'photos' | 'videos'>('all');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [selectedPhoto, setSelectedPhoto] = useState<MediaPhoto | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'photos' | 'albums' | 'favorites'>('photos');

  // Google Drive Live Sync State Simulation
  const [isSyncingDrive, setIsSyncingDrive] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);
  const [syncedCount, setSyncedCount] = useState<number>(3);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const filteredMedia = mediaList.filter(item => {
    if (filterType === 'photos') return !item.isVideo;
    if (filterType === 'videos') return item.isVideo;
    if (selectedTab === 'favorites') return item.isFavorite;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleTriggerDriveSync = (item?: MediaPhoto) => {
    if (isSyncingDrive) return;
    setIsSyncingDrive(true);
    setSyncProgress(0);

    const title = item ? item.title : 'All Pending Media';
    setSyncToast(`Starting WorkManager sync: ${title}`);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setSyncProgress(100);
        setTimeout(() => {
          setIsSyncingDrive(false);
          setSyncedCount(prev => prev + 1);
          setSyncToast(`Successfully synced to Google Drive (REST v3)!`);
          setTimeout(() => setSyncToast(null), 3000);
        }, 400);
      } else {
        setSyncProgress(current);
      }
    }, 180);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto(prev => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Controls Bar */}
      <div className="w-full max-w-sm mb-4 bg-slate-900/90 text-white rounded-xl p-3 shadow-lg border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Permission:</span>
          <button
            onClick={() => setPermissionGranted(!permissionGranted)}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              permissionGranted
                ? 'bg-emerald-600/90 text-white hover:bg-emerald-500'
                : 'bg-rose-600/90 text-white hover:bg-rose-500'
            }`}
          >
            {permissionGranted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Granted (Android 13+)
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" /> Denied
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Toggle Material 3 Dark/Light Theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
          </button>

          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setGridColumns(2)}
              className={`p-1 rounded ${gridColumns === 2 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="2 Columns"
            >
              <Grid2X2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1 rounded ${gridColumns === 3 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="3 Columns (Default Adaptive)"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1 rounded ${gridColumns === 4 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="4 Columns"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Android Device Mockup Frame (Google Pixel 8 Pro style) */}
      <div className="relative w-[340px] sm:w-[360px] h-[680px] bg-slate-950 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800 shadow-indigo-950/40 select-none overflow-hidden flex flex-col border-4 border-slate-700/80">
        
        {/* Device Camera Cutout Hole Punch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full z-50 border border-slate-800 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-blue-900/50" />
        </div>

        {/* Screen Area */}
        <div 
          className={`relative w-full h-full rounded-[34px] overflow-hidden flex flex-col transition-colors duration-300 ${
            darkMode ? 'bg-[#141218] text-[#e6e0e9]' : 'bg-[#FEF7FF] text-[#1d1b20]'
          }`}
        >
          {/* Status Bar */}
          <div className="pt-2 px-5 pb-1 flex justify-between items-center text-[11px] font-medium opacity-85 z-40">
            <span className="font-semibold tracking-tight">09:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">5G</span>
              <div className="w-3.5 h-2 border border-current rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Jetpack Compose TopAppBar (Material 3) */}
          <header 
            className={`px-4 py-2.5 flex items-center justify-between border-b transition-colors ${
              darkMode ? 'bg-[#1e1a22] border-slate-800/80' : 'bg-[#f4ecf8] border-purple-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-sm">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">Aura Gallery</h1>
                <p className="text-[10px] opacity-60">com.auragallery.app</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleTriggerDriveSync()}
                disabled={isSyncingDrive}
                className={`p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-transform active:scale-95 ${
                  isSyncingDrive ? 'text-indigo-400 animate-pulse' : 'text-slate-300 hover:text-white'
                }`}
                title="Sync to Google Drive via WorkManager"
              >
                <CloudUpload className="w-4 h-4" />
              </button>

              <button
                onClick={handleRefresh}
                className={`p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-transform active:scale-95 ${
                  isRefreshing ? 'animate-spin text-purple-500' : ''
                }`}
                title="Refresh (ViewModel.loadMedia)"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Active Google Drive WorkManager Background Notification Banner */}
          {isSyncingDrive && (
            <div className="px-3 py-2 bg-indigo-950/90 border-b border-indigo-500/30 text-[10px] text-indigo-200 flex flex-col gap-1 animate-in fade-in duration-200">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1">
                  <CloudUpload className="w-3 h-3 text-indigo-400 animate-bounce" />
                  <span>Google Drive Sync (WorkManager)</span>
                </span>
                <span className="font-mono text-indigo-300">{syncProgress}%</span>
              </div>
              {/* Progress Track */}
              <div className="w-full h-1 bg-indigo-900/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-200"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
              <span className="text-[9px] text-indigo-300/80">Streaming multipart chunks (CountingRequestBody)</span>
            </div>
          )}

          {syncToast && !isSyncingDrive && (
            <div className="px-3 py-1.5 bg-emerald-950/80 border-b border-emerald-500/30 text-[10px] text-emerald-300 flex items-center gap-1.5 animate-in fade-in duration-200">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{syncToast}</span>
            </div>
          )}

          {/* Filter Chips Bar (Compose AssistChip style) */}
          {permissionGranted && (
            <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-black/5 dark:border-white/5 text-[11px]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  filterType === 'all'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-purple-50 text-purple-900 border border-purple-200/60'
                }`}
              >
                All ({mediaList.length})
              </button>
              <button
                onClick={() => setFilterType('photos')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  filterType === 'photos'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-purple-50 text-purple-900 border border-purple-200/60'
                }`}
              >
                Photos ({mediaList.filter(m => !m.isVideo).length})
              </button>
              <button
                onClick={() => setFilterType('videos')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  filterType === 'videos'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-purple-50 text-purple-900 border border-purple-200/60'
                }`}
              >
                Videos ({mediaList.filter(m => m.isVideo).length})
              </button>
            </div>
          )}

          {/* Main Content Area - Jetpack Compose LazyVerticalGrid Simulation */}
          <main className="flex-1 overflow-y-auto p-1.5">
            {!permissionGranted ? (
              /* State 1: Permission Denied */
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-sm font-bold mb-1">Media Access Required</h2>
                <p className="text-xs opacity-70 mb-4 leading-relaxed">
                  Aura Gallery requires <code className="text-[10px] bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">READ_MEDIA_IMAGES</code> and <code className="text-[10px] bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">READ_MEDIA_VIDEO</code> permissions to load your photos.
                </p>
                <button
                  onClick={() => setPermissionGranted(true)}
                  className="w-full py-2.5 px-4 rounded-full bg-purple-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-all hover:bg-purple-500"
                >
                  Grant Permission
                </button>
              </div>
            ) : filteredMedia.length === 0 ? (
              /* State 2: Empty Grid */
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
                  <ImageIcon className="w-8 h-8 opacity-70" />
                </div>
                <h2 className="text-sm font-bold mb-1">No Media Found</h2>
                <p className="text-xs opacity-70 mb-4">
                  The MediaStore query returned 0 items in this category.
                </p>
                <button
                  onClick={() => {
                    setFilterType('all');
                    setMediaList(MOCK_GALLERY_PHOTOS);
                  }}
                  className="text-xs text-purple-500 hover:underline font-medium"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              /* State 3: LazyVerticalGrid with Coil AsyncImage rendering */
              <div
                className={`grid gap-1 ${
                  gridColumns === 2
                    ? 'grid-cols-2'
                    : gridColumns === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-4'
                }`}
              >
                {filteredMedia.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhoto(item)}
                    className="group relative aspect-square rounded-md overflow-hidden bg-slate-800/20 cursor-pointer shadow-2xs hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    <img
                      src={item.uri}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Video Duration Badge */}
                    {item.isVideo && (
                      <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center gap-1 text-[9px] text-white font-medium">
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>{item.duration || '0:45'}</span>
                      </div>
                    )}

                    {/* Favorite indicator */}
                    {item.isFavorite && (
                      <div className="absolute top-1 right-1 p-0.5 rounded-full bg-black/40 text-rose-400">
                        <Heart className="w-2.5 h-2.5 fill-rose-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* Bottom Navigation Bar (Material 3 NavigationBar) */}
          <footer 
            className={`px-3 py-2 border-t flex justify-around items-center transition-colors text-[10px] ${
              darkMode ? 'bg-[#1e1a22] border-slate-800' : 'bg-[#f4ecf8] border-purple-100'
            }`}
          >
            <button 
              onClick={() => setSelectedTab('photos')}
              className={`flex flex-col items-center gap-0.5 ${
                selectedTab === 'photos' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'opacity-60'
              }`}
            >
              <div className={`p-1 rounded-full ${selectedTab === 'photos' ? 'bg-purple-600/10' : ''}`}>
                <ImageIcon className="w-4 h-4" />
              </div>
              <span>Photos</span>
            </button>
            <button 
              onClick={() => setSelectedTab('albums')}
              className={`flex flex-col items-center gap-0.5 ${
                selectedTab === 'albums' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'opacity-60'
              }`}
            >
              <div className={`p-1 rounded-full ${selectedTab === 'albums' ? 'bg-purple-600/10' : ''}`}>
                <Film className="w-4 h-4" />
              </div>
              <span>Albums</span>
            </button>
            <button 
              onClick={() => setSelectedTab('favorites')}
              className={`flex flex-col items-center gap-0.5 ${
                selectedTab === 'favorites' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'opacity-60'
              }`}
            >
              <div className={`p-1 rounded-full ${selectedTab === 'favorites' ? 'bg-purple-600/10' : ''}`}>
                <Heart className="w-4 h-4" />
              </div>
              <span>Favorites</span>
            </button>
          </footer>

          {/* Fullscreen Photo Lightbox / Detail Modal */}
          {selectedPhoto && (
            <div className="absolute inset-0 bg-black/95 z-50 flex flex-col text-white animate-in fade-in duration-200">
              {/* Modal Top Bar */}
              <div className="px-3 py-3 flex items-center justify-between bg-black/40 backdrop-blur-xs">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <p className="text-xs font-semibold truncate max-w-[180px]">{selectedPhoto.title}</p>
                  <p className="text-[10px] text-slate-400">{selectedPhoto.dateAdded}</p>
                </div>
                <button
                  onClick={(e) => toggleFavorite(selectedPhoto.id, e)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95"
                >
                  <Heart className={`w-4 h-4 ${selectedPhoto.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                </button>
              </div>

              {/* Main Photo View */}
              <div className="flex-1 flex items-center justify-center p-2 relative">
                <img
                  src={selectedPhoto.uri}
                  alt={selectedPhoto.title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-xl"
                />
                {selectedPhoto.isVideo && (
                  <div className="absolute w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center ring-2 ring-white/80">
                    <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                  </div>
                )}
              </div>

              {/* Photo EXIF / Coil Metadata Drawer */}
              <div className="bg-slate-900/90 border-t border-slate-800 p-3 text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-purple-400" />
                    <span>Resolution & Size</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-200">{selectedPhoto.resolution} • {selectedPhoto.size}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    <span>Album / Path</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-200">{selectedPhoto.album}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleTriggerDriveSync(selectedPhoto)}
                    disabled={isSyncingDrive}
                    className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all disabled:opacity-50"
                  >
                    <CloudUpload className="w-3.5 h-3.5" />
                    <span>{isSyncingDrive ? 'Syncing to Drive...' : 'Upload to Google Drive'}</span>
                  </button>
                </div>

                <div className="pt-1 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800/60">
                  <span>Loader: Coil 2.7.0 (MemoryCache + DiskCache)</span>
                  <span className="text-emerald-400">Cached: Yes</span>
                </div>
              </div>
            </div>
          )}

          {/* Android Navigation Bar Pill Indicator */}
          <div className="py-1 flex justify-center bg-transparent z-40">
            <div className="w-24 h-1 bg-current opacity-40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
