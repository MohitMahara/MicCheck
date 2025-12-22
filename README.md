# ATG Task 2

Instantly check if your microphone is working properly. No downloads, no sign-ups, just real-time audio input testing directly in your browser.

## How Mic Testing Works

### Request Microphone Access
When the user clicks "Start Mic Test", the application requests microphone permission using the browser’s `navigator.mediaDevices.getUserMedia` API.

### Permission Handling
- If permission is granted, the app displays “Mic is working”.
- If permission is denied or unavailable, an error message is shown.

### Read Sample Text
After permission is granted, a fixed sentence is displayed on the screen for the user to read aloud.

### Record Audio
The user clicks "Start Recording" to begin recording audio using the browser’s MediaRecorder API.
- Recording automatically stops after 5 seconds.
- The user can also stop the recording manually before the time limit.

### Playback & Retry
After recording:
- A confirmation message “Audio captured successfully” is shown.
- The recorded audio can be replayed.
- The user can retry the test.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MohitMahara/MicCheck.git
   cd MicCheck
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS