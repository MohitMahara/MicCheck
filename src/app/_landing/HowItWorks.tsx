
import { Mic, ShieldCheck, FileText, PlayCircle, Icon } from "lucide-react";

const steps = [
  {
    step: "1",
    icon : Mic,
    title: "Start the Mic Test",
    description:
      "Click the Start Mic Test button to begin checking your microphone.",
  },
  {
    step: "2",
    icon : ShieldCheck,
    title: "Grant Microphone Access",
    description:
      "Allow microphone permission when prompted by your browser.",
  },
  {
    step: "3",
    icon : FileText,
    title: "Read the Sample Text",
    description:
      "A short text will appear on the screen. Read it aloud to record your voice.",
  },
  {
    step: "4",
    icon : PlayCircle,
    title: "Listen to Your Recording",
    description:
      "Play back your recording to confirm your microphone is working properly.",
  },
];


const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-[#0b0b0f] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Test your microphone in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.step}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
            >
              <div className="text-blue-400  text-md font-semibold mb-6">
                Step {item.step}
              </div>

              <item.icon className="w-15 h-15 mx-auto mb-4 text-blue-400" />

              <h3 className="text-lg text-center font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-center text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;