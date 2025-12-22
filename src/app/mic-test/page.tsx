"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

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
    navigator.permissions
      ?.query({ name: "microphone" as PermissionName })
      .then((result) => {
        if (result.state === "granted") {
          startMicTest();
        }
      })
      .catch(() => {});

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

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
    } catch {
      setError("Microphone access denied");
      setStatus("error");
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

        {status !== "idle" && (
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
              <p className="text-sm text-red-400">{error}</p>
            )}

            {status === "idle" && (
              <button
                onClick={startMicTest}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium"
              >
                Start Mic Test
              </button>
            )}

            {status === "ready" && (
              <button
                onClick={startRecording}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg"
              >
                Start Recording
              </button>
            )}

            {status === "recording" && (
              <button
                onClick={stopRecording}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Stop Recording
              </button>
            )}

            {status === "recorded" && (
              <>
                <audio controls src={audioURL!} className="w-full" />
                <button
                  onClick={retryTest}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg"
                >
                  Retry Test
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}