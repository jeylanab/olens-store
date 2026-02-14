import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// Standardized Icons
import { Phone, MapPin, ChevronRight, Loader2, Apple, ShieldCheck, Zap, Shield } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Auth() {
  const { loginWithGoogle, loginWithApple, user, userData } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    phoneNumber: "", 
    subCity: "Bole",
    address: "" 
  });

  // Safety Check: Redirect if already logged in and profile is complete
  useEffect(() => {
    if (user && userData) {
      if (userData.phoneNumber) {
        navigate("/");
      } else {
        setStep(2);
      }
    }
  }, [user, userData, navigate]);

  const handleCompleteProfile = async () => {
    if (!formData.phoneNumber) return alert("Please enter your phone number");
    if (!user) return; // Prevent crash if user session drops

    setIsSubmitting(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        phoneNumber: formData.phoneNumber,
        subCity: formData.subCity,
        address: formData.address,
        hasCompletedProfile: true 
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // THE TAKEOVER: fixed, inset-0, and high z-index hides Navbar and Footer
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* BACKGROUND GRID DECOR */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* TOP SYSTEM STATUS BAR */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center border-b border-slate-50">
        <div className="flex gap-1">
           <div className="w-2 h-2 bg-[#009739] rounded-full animate-pulse" />
           <div className="w-2 h-2 bg-[#FEDD00] rounded-full animate-pulse delay-75" />
           <div className="w-2 h-2 bg-[#EF3340] rounded-full animate-pulse delay-150" />
        </div>
        <div className="flex items-center gap-2">
            <Shield size={12} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 font-mono">Encrypted_Session_v2.6</span>
        </div>
      </div>

      <div className="w-full max-w-[400px] px-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="mb-12">
                <div className="inline-block bg-black text-[#ccff00] px-3 py-1 text-[9px] font-black uppercase tracking-tighter italic mb-4">
                    Security_Gateway
                </div>
                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic">
                    Identity<br />Check<span className="text-[#ccff00]">.</span>
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-4">Authorized Personnel Only</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={loginWithApple}
                  className="w-full flex items-center justify-center gap-4 py-5 bg-black text-white rounded-xl font-bold hover:bg-zinc-900 transition-all active:scale-95"
                >
                  <Apple size={20} fill="white" stroke="white" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Continue with Apple</span>
                </button>

                <button 
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center gap-4 py-5 bg-white text-black border-2 border-slate-100 rounded-xl font-bold hover:border-black transition-all active:scale-95"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" alt="G" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Continue with Google</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-left">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-tight">Logistics<br />Onboarding_</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Connecting to Addis_Node</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Contact_Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#ccff00] transition-colors" size={16} />
                    <input 
                      type="tel" 
                      placeholder="+251 9..." 
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-black transition-all"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Delivery_Zone</label>
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#ccff00] transition-colors" size={16} />
                    <select 
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-xl text-sm font-bold outline-none appearance-none cursor-pointer focus:bg-white focus:border-black transition-all"
                      value={formData.subCity}
                      onChange={(e) => setFormData({...formData, subCity: e.target.value})}
                    >
                      {["Bole", "Kirkos", "Arada", "Yeka", "Nifas Silk", "Lideta", "Akaki-Kality", "Gullele", "Kolfe Keranio", "Lemi Kura"].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleCompleteProfile}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-black text-[#ccff00] py-6 rounded-xl font-black mt-4 uppercase text-[11px] tracking-widest disabled:opacity-50 hover:shadow-xl transition-all active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : <>Initialize Account <ChevronRight size={18} /></>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER LABEL */}
      <div className="absolute bottom-10 text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em] text-center">
        Olens System Terminal // Ethiopia Node
      </div>
    </div>
  );
}