import { useEffect, useState } from "react";
import { ChatWidget, NonefinityClient } from "@nonefinity/ai-sdk";
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
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white">
            <div className="glass-panel p-8 max-w-2xl w-full text-center space-y-6">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Nonefinity Chat Demo
                </h1>
                <p className="text-xl text-gray-300">
                    Experience the next generation of AI chat widgets.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 className="font-semibold text-blue-300 mb-2">
                            Premium UI
                        </h3>
                        <p className="text-sm text-gray-400">
                            Built with modern design principles and
                            glassmorphism effects.
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 className="font-semibold text-purple-300 mb-2">
                            Easy Integration
                        </h3>
                        <p className="text-sm text-gray-400">
                            Simple setup with environment variables and SDK.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                {!sessionId && !error && (
                    <div className="flex items-center justify-center space-x-2 text-blue-300 animate-pulse">
                        <div className="w-2 h-2 bg-current rounded-full"></div>
                        <div className="w-2 h-2 bg-current rounded-full animation-delay-200"></div>
                        <div className="w-2 h-2 bg-current rounded-full animation-delay-400"></div>
                        <span>Initializing Session...</span>
                    </div>
                )}
            </div>

            {sessionId && apiKey && (
                <ChatWidget
                    sessionId={sessionId}
                    apiKey={apiKey}
                    title="Demo Assistant"
                    theme={{
                        mode: "dark",
                        primaryColor: "#8b5cf6",
                    }}
                />
            )}
        </div>
    );
}

export default App;
