

// import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';


// export const makeFastStart = async (videoUri) => {
//   try {
//     console.log('🎬 Starting fast-start processing...');
//     console.log('📥 Input URI:', videoUri);

 
//     let normalizedUri = videoUri;
//     if (videoUri.startsWith('content://')) {
//       const newPath = `${FileSystem.cacheDirectory}input_${Date.now()}.mp4`;
//       await FileSystem.copyAsync({ from: videoUri, to: newPath });
//       normalizedUri = newPath;
//       console.log('📁 Copied content URI to:', normalizedUri);
//     }

  
//     const inputInfo = await FileSystem.getInfoAsync(normalizedUri);
//     if (!inputInfo.exists) {
//       throw new Error('❌ Input video file does not exist.');
//     }

//     const outputUri = `${FileSystem.cacheDirectory}fast_${Date.now()}.mp4`;

//     const inputPath = normalizedUri.replace('file://', '');
//     const outputPath = outputUri.replace('file://', '');

//     // Fast-start command (no re-encoding)
//     const command = `-y -i "${inputPath}" -c copy -movflags +faststart "${outputPath}"`;
//     console.log('⚙️ FFmpeg command:', command);

//     const session = await FFmpegKit.execute(command);
//     const returnCode = await session.getReturnCode();

//     if (!ReturnCode.isSuccess(returnCode)) {
//       const logs = await session.getAllLogsAsString();
//       console.error('❌ FFmpeg failed:', logs);
//       throw new Error('FFmpeg fast-start conversion failed.');
//     }

//     const outputInfo = await FileSystem.getInfoAsync(outputUri);
//     if (!outputInfo.exists) {
//       throw new Error('❌ Output video file was not created.');
//     }

//     console.log('✅ Fast-start processing completed:', outputUri);
//     return outputUri;
//   } catch (error) {
//     console.error('🚨 makeFastStart error:', error);
//     throw error; 
//   }
// };

// export const testFFmpeg = async () => {
//   console.log('Testing FFmpeg...');
//   const session = await FFmpegKit.execute('-version');
//   const returnCode = await session.getReturnCode();
//   console.log('FFmpeg return code:', returnCode?.getValue());
// };
           


import * as FileSystem from 'expo-file-system/legacy';

/**
 * Detects if an MP4 video is fast-start by checking
 * whether the 'moov' atom appears before the 'mdat' atom.
 */
export const isFastStartVideo = async (videoUri) => {
  try {
    if (!videoUri) {
      throw new Error('Invalid video URI');
    }

    // Ensure the URI has the correct scheme
    const normalizedUri = videoUri.startsWith('file://')
      ? videoUri
      : `file://${videoUri}`;

    // Read the first 1 MB of the file in Base64
    const base64Chunk = await FileSystem.readAsStringAsync(normalizedUri, {
      encoding: FileSystem.EncodingType.Base64,
      position: 0,
      length: 1024 * 1024, // 1 MB
    });

    // Decode Base64 to ASCII
    const binaryString = global.atob(base64Chunk);

    const moovIndex = binaryString.indexOf('moov');
    const mdatIndex = binaryString.indexOf('mdat');

    const isFastStart =
      moovIndex !== -1 &&
      (mdatIndex === -1 || moovIndex < mdatIndex);

    console.log(
      `Fast-start check → moov: ${moovIndex}, mdat: ${mdatIndex}, result: ${isFastStart}`
    );

    return isFastStart;
  } catch (error) {
    console.error('Error detecting fast-start:', error);
    return false;
  }
};


export const checkIfStreamable = async (cdnUrl) => {
  try {
    const response = await fetch(cdnUrl, {
      method: 'GET',
      headers: {
        Range: 'bytes=0-1023', // Request first 1 KB
      },
    });

    const isPartialContent = response.status === 206;
    const acceptRanges = response.headers.get('accept-ranges');

    return isPartialContent && acceptRanges === 'bytes';
  } catch (error) {
    console.error('Error checking streamability:', error);
    return false;
  }
};


export const normalizePath = (uri) => {
  if (uri.startsWith("file://")) return uri;
  return "file://" + uri;
};

