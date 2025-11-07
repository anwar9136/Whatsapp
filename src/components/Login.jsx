import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = { status: "success", user: { username } };

      if (result.status === "success") {
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-[#0b141a] bg-[url('/bg-chat-room.png')] bg-cover bg-center px-4 py-4 md:px-6 md:py-10">
      {/* Dim Overlay */}
      <div className="absolute inset-0 bg-[#0b141a]/70" />

      {/* Login Card */}
      <div
        className="relative w-full max-w-[92%] md:max-w-md flex flex-col items-center justify-center gap-3 md:gap-4 bg-[#111b21] border border-[#2a2f32] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] px-6 md:px-12 py-6 md:py-16 z-10 box-border max-h-[95vh] overflow-y-auto"
        style={{padding: "20px"}}
      >
        {/* WhatsApp Logo */}
        <div className="flex justify-center mb-4 md:mb-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#25d366] flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 32 32" className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor">
              <path d="M16 0C7.164 0 0 7.164 0 16c0 2.826.738 5.577 2.137 7.965L.512 30.98c-.15.446.218.814.664.664l7.015-1.625A15.937 15.937 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.646 0-5.207-.787-7.393-2.275l-.415-.283-4.302 1.003 1.003-4.302-.283-.415A13.267 13.267 0 0 1 2.667 16C2.667 8.648 8.648 2.667 16 2.667S29.333 8.648 29.333 16 23.352 29.333 16 29.333z" />
              <path d="M23.097 19.46c-.365-.183-2.16-1.066-2.494-1.188-.334-.122-.577-.183-.82.183-.243.365-.94 1.188-1.154 1.431-.213.243-.426.274-.79.091-.365-.183-1.543-.569-2.938-1.813-1.086-.97-1.82-2.168-2.033-2.533-.213-.365-.023-.562.16-.744.165-.165.365-.426.548-.64.183-.213.243-.365.365-.608.122-.243.061-.456-.03-.64-.091-.183-.82-1.975-1.123-2.706-.295-.711-.595-.615-.82-.626-.213-.01-.456-.012-.699-.012s-.64.091-.974.456c-.334.365-1.274 1.245-1.274 3.037s1.305 3.523 1.488 3.766c.183.243 2.58 3.94 6.25 5.526.873.377 1.555.602 2.086.771.876.278 1.673.239 2.304.145.703-.105 2.16-.884 2.464-1.737.304-.853.304-1.584.213-1.737-.091-.152-.334-.243-.699-.426z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-[22px] md:text-[32px] font-semibold text-white mb-2 tracking-tight"
          style={{fontSize: "30px", fontWeight: "bold"}}
          >WhatsApp Web</h1>
          <p className="text-[11px] md:text-[15px] text-[#8696a0]">Sign in to continue</p>
        </div>

        {/* Form area */}
        <div className="flex flex-col gap-4 md:gap-6 w-full px-2 md:px-3">
          {/* Username */}
          <div>
            <label className="block text-xs text-[#8696a0] mb-2 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your number"
              className="w-full h-12 md:h-16 px-5 py-3 md:py-4 bg-[#1f2c33] text-white text-xs md:text-base rounded-xl border border-[#24323a] hover:border-[#3b4a54] focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/50 outline-none transition-all duration-200"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-[#8696a0] mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 md:h-16 pl-5 pr-10 md:pr-12 py-3 md:py-4 bg-[#1f2c33] text-white text-xs md:text-base rounded-xl border border-[#24323a] hover:border-[#3b4a54] focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/50 outline-none transition-all duration-200"
                style={{ fontSize: '16px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8696a0] hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Button */}
          <div className="flex justify-center">
  <button
    onClick={handleSubmit}
    disabled={loading}
    className={`w-[55%] md:w-[40%] h-12 md:h-14 bg-linear-to-r from-[#00a884] to-[#019974] hover:from-[#00b493] hover:to-[#018d6f] text-white text-xs md:text-base font-bold rounded-xl shadow-[0_6px_18px_rgba(0,168,132,0.25)] md:shadow-[0_10px_28px_rgba(0,168,132,0.35)] focus:outline-none focus:ring-2 focus:ring-[#00a884]/60 transition-all duration-200 cursor-pointer ${
      loading ? "opacity-70 cursor-not-allowed" : ""
    }`}
    style={{borderRadius: "10px", fontSize: '16px', fontWeight: 'bold'}}
  >
    {loading ? "Signing in..." : "Sign in"}
  </button>
</div>
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-8 flex items-center justify-center text-[10px] md:text-sm text-[#8696a0] px-2" style={{ fontSize: '11px' }}>
          <svg
            className="w-3.5 h-3.5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Your personal messages are end-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
