import { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import { Upload, X, Plus, Package, DollarSign, Tag, Info } from "lucide-react";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "New",
    description: "",
    sizes: ["M", "L", "XL"], // Default sizes for Addis market
    inStock: true,
    isSale: false,
    salePrice: ""
  });

  // Handle Image Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please add at least one image");
    
    setLoading(true);
    try {
      const imageUrls = [];

      // 1. Upload Images to Firebase Storage
      for (const image of images) {
        const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      // 2. Save Product to Firestore
      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price),
        salePrice: product.isSale ? parseFloat(product.salePrice) : null,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      alert("Product added successfully!");
      // Reset Form
      setProduct({ name: "", price: "", category: "New", description: "", sizes: ["M", "L", "XL"], inStock: true, isSale: false, salePrice: "" });
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-slate-100">
        <header className="mb-10 flex items-center gap-4">
          <div className="bg-black p-3 rounded-2xl text-[#ccff00]">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Inventory Terminal</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Add new premium apparel to Olens Store</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* IMAGE UPLOAD SECTION */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Upload size={14}/> Product Media
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((src, i) => (
                <div key={i} className="aspect-square rounded-3xl overflow-hidden border-2 border-slate-100 relative group">
                  <img src={src} className="h-full w-full object-cover" />
                  <button type="button" className="absolute top-2 right-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                <Plus size={24} className="text-slate-300" />
                <span className="text-[9px] font-black uppercase text-slate-400 mt-2">Upload</span>
                <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <InputGroup label="Product Name" icon={<Tag size={14}/>}>
              <input 
                required
                className="custom-input"
                placeholder="e.g. Vintage Oversized Tee"
                onChange={(e) => setProduct({...product, name: e.target.value})}
              />
            </InputGroup>

            <InputGroup label="Base Price (ETB)" icon={<DollarSign size={14}/>}>
              <input 
                required
                type="number"
                className="custom-input"
                placeholder="2500"
                onChange={(e) => setProduct({...product, price: e.target.value})}
              />
            </InputGroup>
          </div>

          {/* CATEGORY & SALE */}
          <div className="grid md:grid-cols-2 gap-6">
            <InputGroup label="Category" icon={<Info size={14}/>}>
              <select className="custom-input appearance-none" onChange={(e) => setProduct({...product, category: e.target.value})}>
                <option>New</option>
                <option>Men</option>
                <option>Women</option>
                <option>Sale</option>
              </select>
            </InputGroup>

            <div className="flex items-center gap-4 pt-6">
               <label className="text-xs font-bold uppercase cursor-pointer flex items-center gap-2">
                 <input type="checkbox" className="w-5 h-5 accent-black" onChange={(e) => setProduct({...product, isSale: e.target.checked})} />
                 Mark as Sale
               </label>
               {product.isSale && (
                 <input 
                  type="number" 
                  placeholder="Sale Price" 
                  className="flex-1 p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 outline-none"
                  onChange={(e) => setProduct({...product, salePrice: e.target.value})}
                 />
               )}
            </div>
          </div>

          <InputGroup label="Description" icon={<Info size={14}/>}>
            <textarea 
              rows="4" 
              className="custom-input resize-none" 
              placeholder="Describe the material, fit, and origin..."
              onChange={(e) => setProduct({...product, description: e.target.value})}
            />
          </InputGroup>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-black text-[#ccff00] rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.01] transition-all disabled:opacity-50 shadow-2xl shadow-black/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Deploy to Inventory"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputGroup({ label, children, icon }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

// Add these to your CSS/Tailwind config
// .custom-input { @apply w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:border-black transition-all; }