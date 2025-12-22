import { Twitter, Linkedin, Discord } from "@deemlol/next-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0f] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              🎙 MicTest
            </Link>
            <p className="mt-4 max-w-md text-gray-400 leading-relaxed">
                    Instantly check if your microphone is working properly.
                    No downloads, no sign-ups, just real-time audio input testing
                    directly in your browser.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Mic Test</Link></li>
              <li><Link href="#" className="hover:text-white">How It Works</Link></li>
              <li><Link href="#" className="hover:text-white">Browser Support</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Docs</Link></li>
              <li><Link href="#" className="hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white">Support</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">
            © 2025 MicTest. All rights reserved.
          </p>

          <div className="flex gap-3">
            {[Twitter, Linkedin, Discord].map((Icon, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <Icon size={18} color="#fff" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
