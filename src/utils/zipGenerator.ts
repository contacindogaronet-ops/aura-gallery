import JSZip from 'jszip';
import { ANDROID_FILES } from '../data/androidProjectData';

export async function generateAndroidProjectZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root folder structure
  const root = zip.folder('AuraGallery');
  if (!root) throw new Error('Could not create root folder in ZIP');

  // Add all project files
  for (const file of ANDROID_FILES) {
    root.file(file.path, file.content);
  }

  // Add standard .gitignore
  root.file(
    '.gitignore',
    `*.iml
.gradle
/local.properties
/.idea/caches
/.idea/libraries
/.idea/modules.xml
/.idea/workspace.xml
/.idea/navEditor.xml
/.idea/assetWizardSettings.xml
.DS_Store
/build
/captures
.externalNativeBuild
.cxx
local.properties
`
  );

  // Add gradle.properties
  root.file(
    'gradle.properties',
    `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
org.gradle.configuration-cache=true
`
  );

  // Add proguard-rules.pro
  root.file(
    'app/proguard-rules.pro',
    `# Proguard rules for Aura Gallery
-keepattributes *Annotation*
-dontwarn coil.**
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}
`
  );

  // Add strings.xml
  root.file(
    'app/src/main/res/values/strings.xml',
    `<resources>
    <string name="app_name">Aura Gallery</string>
</resources>`
  );

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
