import { ChatWidget, NonefinityClient } from "@nonefinity/ai-sdk";
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chatId = import.meta.env.VITE_CHAT_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const initSession = async () => {
      if (!chatId || !apiKey) {
        setError("Missing VITE_CHAT_ID or VITE_API_KEY in .env");
        return;
      }

      try {
        const client = new NonefinityClient({ apiKey });
        const result = await client.createSession({
          chat_config_id: chatId,
          name: `Demo Session ${new Date().toISOString()}`,
        });

        if (result.success && result.data?.id) {
          setSessionId(result.data.id);
        } else {
          setError(result.error || "Failed to create session");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    initSession();
  }, [chatId, apiKey]);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-white/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-gray-400">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Nonefinity SDK Demo
          </div>

          {/* Hero Text */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient">
              Build AI Chat <br className="hidden md:block" />
              in minutes.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Experience the future of conversational interfaces. Seamlessly
              integrated, fully customizable, and designed for performance.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <a
              href="https://docs.nonefinity.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center"
            >
              Read API Documentation
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <div className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors duration-200 cursor-copy">
              npm install @nonefinity/ai-sdk
            </div>
          </div>

          {/* Status/Error Display */}
          <div className="mt-12 w-full max-w-md">
            {error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            ) : !sessionId ? (
              <div className="flex items-center justify-center space-x-3 text-gray-500 text-sm font-mono">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
                <span>Initializing session...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-green-500/80 text-sm font-mono bg-green-500/5 px-4 py-2 rounded-full border border-green-500/10">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Session Active: {sessionId.slice(0, 8)}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full text-left">
          {[
            {
              title: "Modern Stack",
              desc: "Built with React and Tailwind for improved DX.",
            },
            {
              title: "Type Safe",
              desc: "Full TypeScript support out of the box.",
            },
            {
              title: "Customizable",
              desc: "Themable widget matching your brand.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Widget Integration */}
      {sessionId && apiKey && (
        <ChatWidget
          sessionId={sessionId}
          apiKey={apiKey}
          title="Nonefinity Assistant"
          placeholder="Ask me anything..."
          position="bottom-right"
          theme={{
            mode: "dark",
            primaryColor: "#10b981",
            backgroundColor: "#0f172a",
            textColor: "#f1f5f9",
            fontSize: "14px",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "16px",
            width: "420px",
            height: "650px",
          }}
          onError={(error) => {
            console.error("Chat widget error:", error);
            setError(error.message);
          }}
        />
      )}
    </div>
  );
}

export default App;
