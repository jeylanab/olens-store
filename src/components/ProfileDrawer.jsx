import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  X, LogOut, Shield, Phone, MapPin, Check, Loader2, 
  Package, Heart, CreditCard, Settings, ShoppingBag, 
  BarChart3, Users, Receipt, PlusSquare, Box
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import { useNavigate } from "react-router-dom";

export default function ProfileDrawer({ onClose }) {
  const { user, userData, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [editForm, setEditForm] = useState({
    phoneNumber: "",
    subCity: "Bole",
    address: ""
  });

  useEffect(() => {
    if (userData) {
      setEditForm({
        phoneNumber: userData.phoneNumber || "",
        subCity: userData.subCity || "Bole",
        address: userData.address || ""
      });
    }
  }, [userData]);

  if (!user) return null;

  return (
    <motion.aside 
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#fafafa] z-[300] shadow-2xl flex flex-col border-l border-slate-200"
    >
      {/* 1. HEADER & IDENTITY */}
      <div className="p-6 bg-white border-b border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <img src={user?.photoURL} className="h-12 w-12 rounded-full border border-slate-200" alt="Avatar" />
            <div>
              <h2 className="text-sm font-black uppercase tracking-tight">{user?.displayName}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Member ID: {user?.uid.slice(0, 5)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 px-3 py-2 bg-black rounded-lg w-fit">
            <Shield size={12} className="text-[#ccff00]" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Administrative Access</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* 2. ADMIN PANEL: STORE OPERATIONS (Visible only to you) */}
        {isAdmin && (
          <section className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Store Operations</h3>
            <div className="grid grid-cols-2 gap-2">
              <AdminButton icon={<BarChart3 size={16}/>} label="Analytics" />
              <AdminButton icon={<PlusSquare size={16}/>} label="Add Item" onClick={() => navigate('/admin/add')} />
              <AdminButton icon={<Box size={16}/>} label="Inventory" />
              <AdminButton icon={<Receipt size={16}/>} label="Invoices" />
              <AdminButton icon={<Users size={16}/>} label="Customers" className="col-span-2" />
            </div>
          </section>
        )}

        {/* 3. USER PANEL: SHOPPING & ORDERS (Visible to everyone) */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Shopping Activity</h3>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <MenuLink icon={<Package size={18}/>} label="My Orders" badge="2" />
            <MenuLink icon={<Heart size={18}/>} label="Wishlist" />
            <MenuLink icon={<CreditCard size={18}/>} label="Payment Methods" />
            <MenuLink icon={<ShoppingBag size={18}/>} label="Buy Again" />
          </div>
        </section>

        {/* 4. SETTINGS & PROFILE (Dynamic Edit Mode) */}
        <section className="space-y-3">
          <div className="flex justify-between items-center ml-1">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Settings</h3>
            <button onClick={() => setIsEditing(!isEditing)} className="text-[10px] font-bold text-black underline uppercase italic">
              {isEditing ? "Cancel" : "Change"}
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg"><Phone size={14} className="text-slate-400"/></div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Phone</p>
                  {isEditing ? (
                    <input 
                      value={editForm.phoneNumber} 
                      onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                      className="text-xs font-black border-b border-black outline-none w-32"
                    />
                  ) : (
                    <p className="text-xs font-black">{userData?.phoneNumber || "Not Set"}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg"><MapPin size={14} className="text-slate-400"/></div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Dispatch Zone</p>
                  {isEditing ? (
                    <select 
                      value={editForm.subCity} 
                      onChange={(e) => setEditForm({...editForm, subCity: e.target.value})}
                      className="text-xs font-black border-b border-black outline-none"
                    >
                      {["Bole", "Kirkos", "Arada", "Yeka"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <p className="text-xs font-black">{userData?.subCity || "Bole"}</p>
                  )}
                </div>
              </div>
            </div>
            
            {isEditing && (
              <button onClick={handleUpdate} className="w-full py-3 bg-black text-[#ccff00] rounded-xl text-[10px] font-black uppercase tracking-widest">
                Save Profile
              </button>
            )}
          </div>
        </section>
      </div>

      {/* 5. LOGOUT */}
      <div className="p-6">
        <button 
          onClick={() => { logout(); onClose(); }}
          className="w-full flex items-center justify-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest py-4 border border-slate-200 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
        >
          <LogOut size={14} /> End Session
        </button>
      </div>
    </motion.aside>
  );
}

// Sub-components for cleaner code
function MenuLink({ icon, label, badge }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
      <div className="flex items-center gap-4">
        <span className="text-slate-400 group-hover:text-black transition-colors">{icon}</span>
        <span className="text-xs font-bold text-slate-700 uppercase tracking-tight group-hover:translate-x-1 transition-transform">{label}</span>
      </div>
      {badge && <span className="bg-black text-white text-[9px] font-black px-2 py-1 rounded-full">{badge}</span>}
    </button>
  );
}

function AdminButton({ icon, label, onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:border-black transition-all ${className}`}
    >
      <span className="text-slate-900">{icon}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
    </button>
  );
}