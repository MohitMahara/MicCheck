"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import Button from "@/components/ui/Button";

const SAMPLE_TEXT = "Hello, this is a microphone test";
const RECORDING_DURATION = 5; // seconds
const NavbarHeight = 96;

type Status = "idle" | "requesting" | "ready" | "recording" | "recorded" | "error";

export default function MicTestPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    checkMicrophonePermission();

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions?.query({ name: "microphone" as PermissionName });
      if (result && result.state === "granted") {
          setStatus("ready");
      } 
    } catch (err) {
      startMicTest();
    }
  };

  const startMicTest = async () => {
    try {
      setStatus("requesting");
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        setStatus("recorded");

        intervalRef.current && clearInterval(intervalRef.current);
        intervalRef.current = null;
      };

      recorderRef.current = recorder;
      setStatus("ready");
    } catch (err: any) {
      console.error("Microphone access error:", err);
      setStatus("error");

      if (err.name === "NotAllowedError") {
        setError("Microphone access denied. Please click the camera/microphone icon in your browser's address bar and allow access.");
      } else if (err.name === "NotFoundError") {
        setError("No microphone found. Please check your microphone connection.");
      } else if (err.name === "NotReadableError") {
        setError("Microphone is already in use by another application.");
      } else {
        setError("Unable to access microphone. Please check your browser settings and try again.");
      }
    }
  };


  const startRecording = () => {
    if (!recorderRef.current) return;

    chunksRef.current = [];

    setAudioURL(null);
    setRecordingTime(0);
    setStatus("recording");

    recorderRef.current.start();

    intervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev + 1 >= RECORDING_DURATION) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (!recorderRef.current || recorderRef.current.state !== "recording") return;

    recorderRef.current.requestData();
    recorderRef.current.stop();

    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const retryTest = () => {
    setStatus("ready");
    setAudioURL(null);
    setError("");
    setRecordingTime(0);
  };

  const formatTime = (sec: number) => `00:${sec.toString().padStart(2, "0")} / 00:${RECORDING_DURATION.toString().padStart(2, "0")}`;

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#0b0b15] to-black text-white px-6"
      style={{ paddingTop: `${NavbarHeight}px` }}
    >
      <div className="max-w-6xl mx-auto py-10">

        {status !== "idle" && status !== "error" && (
          <div className="pb-6 max-w-2xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 mb-6">
              <h3 className="text-lg text-blue-500 text-center font-semibold mb-2">
                Read this text aloud
              </h3>
              <p className="text-white text-lg font-medium text-center">
                {SAMPLE_TEXT}
              </p>
            </div>
          </div>
        )}

        <div className={`min-h-[50vh] grid grid-cols-1 md:grid-cols-2 gap-12 ${status === "idle" ? "pt-2 md:pt-26" : ""}`}>

          <div>
            <h1 className="text-4xl font-bold mb-4">Mic Test</h1>
            <p className="text-gray-400 mb-8 w-full max-w-md text-md font-medium leading-[32px]">
              Instantly check if your microphone is working properly.
              No downloads, no sign-ups, just real-time audio input testing
              directly in your browser.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              {status === "ready" || status === "recording" || status === "recorded" ? (
                <Mic className="w-10 h-10 text-green-400" />
              ) : (
                <MicOff className="w-10 h-10 text-red-400" />
              )}
            </div>

            {status === "requesting" && (
              <p className="text-sm text-gray-400">Requesting microphone access…</p>
            )}
            {status === "ready" && (
              <p className="text-sm text-green-400">Mic is working</p>
            )}
            {status === "recording" && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-yellow-400">
                  Recording
                </span>
                <span className="font-mono text-lg bg-white/10 px-4 py-1 rounded-full">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}
            {status === "recorded" && (
              <p className="text-sm text-green-400">
                Audio captured successfully
              </p>
            )}
            {status === "error" && (
              <div className="text-center">
                <p className="text-sm text-red-400 mb-4">{error}</p>
                {error.includes("blocked") || error.includes("denied") ? (
                  <div className="text-xs text-gray-400 mb-4 space-y-2">
                    <p><strong>In Chrome:</strong> Click the lock/camera icon in the address bar → Allow microphone</p>
                    <p><strong>Or:</strong> Go to Settings → Privacy and security → Site settings → Microphone → Allow</p>
                  </div>
                ) : null}
                <Button onClick={startMicTest} variant="primary">
                  Try Again
                </Button>
              </div>
            )}

            {status === "idle" && (
              <Button onClick={startMicTest} variant="primary">
                Start Mic Test
              </Button>
            )}

            {status === "ready" && (
              <Button onClick={startRecording} variant="success">
                Start Recording
              </Button>
            )}

            {status === "recording" && (
              <Button onClick={stopRecording} variant="danger">
                Stop Recording
              </Button>
            )}

            {status === "recorded" && (
              <>
                <audio controls src={audioURL!} className="w-full" />
                <Button onClick={retryTest} variant="primary">
                  Retry Test
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}