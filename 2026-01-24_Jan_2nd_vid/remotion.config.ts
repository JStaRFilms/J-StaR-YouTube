import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Allow access to local files if needed (though we might use staticFile with absolute paths if supported,
// usually Remotion wants files in public/. We will try to map the root as a static dir if possible,
// or simply assume we can read absolute paths in Node but for Browser we need a loader.
// For now, let's keep it simple. If we need to serve the '01_Footage' directory,
// we might need a custom webpack config or just put a symlink in a 'public' folder.
// Let's try to set the public dir to the current root for simplicity of access?)

// Actually, best practice for local huge files is seeing if Remotion can serve them.
// We will test if 'absolute path' works in the <Video> src. 
