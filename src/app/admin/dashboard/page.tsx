'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  ShoppingBag, 
  ClipboardList, 
  MessageSquare, 
  LogOut, 
  Edit, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Package, 
  Inbox, 
  X, 
  RefreshCw,
  Plus,
  Upload,
  Image as ImageIcon,
  Star,
  Trash2,
  ShoppingCart
} from 'lucide-react';

interface Product {
  _id?: string;
  slug: string;
  name: string;
  mgo: number;
  price: number;
  size: string;
  activityLevel: number;
  rating: number;
  tagline: string;
  description: string;
  benefits: string[];
  bestFor: string;
  activity: string;
  taste: string;
  image: string;
  color: string;
  isActive: boolean;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  fullName: string;
  whatsapp: string;
  email: string;
  city: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  orderNote?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);
  
  // Dashboard navigation
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'contacts'>('products');
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  
  // Loading & Action States
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [deletingProductSlug, setDeletingProductSlug] = useState<string | null>(null);
  
  // Fetch Backend Base URL
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Helper to resolve images for display
  const getImageUrl = (path: string | undefined | null) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    if (path.startsWith('/assets/') || path.startsWith('assets/')) {
      return path.startsWith('/') ? path : `/${path}`;
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendUrl}${cleanPath}`;
  };

  // -------------------------------------------------------------
  // Prevent background scrolling when modal is open
  // -------------------------------------------------------------
  useEffect(() => {
    if (editingProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingProduct]);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');
    
    if (!savedToken) {
      router.replace('/admin/login');
      return;
    }
    
    setToken(savedToken);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    fetchData(savedToken);
  }, [router]);

  const fetchData = async (authToken: string) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // 1. Fetch Products
      const prodRes = await fetch(`${backendUrl}/api/products`);
      if (prodRes.status === 401) throw new Error('UNAUTHORIZED');
      const prodData = await prodRes.json();
      if (prodData.success) {
        setProducts(prodData.data);
      }

      // 2. Fetch Orders
      const orderRes = await fetch(`${backendUrl}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (orderRes.status === 401) throw new Error('UNAUTHORIZED');
      const orderData = await orderRes.json();
      if (orderData.success) {
        setOrders(orderData.data.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }

      // 3. Fetch Contacts
      const contactRes = await fetch(`${backendUrl}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (contactRes.status === 401) throw new Error('UNAUTHORIZED');
      const contactData = await contactRes.json();
      if (contactData.success) {
        setContacts(contactData.data.sort((a: ContactMessage, b: ContactMessage) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      
    } catch (error: any) {
      if (error.message === 'UNAUTHORIZED') {
        handleLogout();
      } else {
        setErrorMessage('Failed to fetch data from backend. Make sure your server is online.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.replace('/admin/login');
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-zinc-100 text-zinc-800 border border-zinc-200';
    }
  };

  // -------------------------------------------------------------
  // Order Management Actions
  // -------------------------------------------------------------
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    if (!token) return;
    setIsActionLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${backendUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to update status');
      
      setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
      if (data.emailSent) {
        showSuccess(`Order ${orderId} updated to ${newStatus} (customer notification email sent).`);
      } else {
        const targetOrder = orders.find(o => o.orderId === orderId);
        if (targetOrder && !targetOrder.email) {
          showSuccess(`Order ${orderId} updated to ${newStatus} (no email on file).`);
        } else {
          showSuccess(`Order ${orderId} updated to ${newStatus} (email notification skipped).`);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update order status.');
    } finally {
      setIsActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Contact Inquiry Actions
  // -------------------------------------------------------------
  const handleMarkContactRead = async (id: string) => {
    if (!token) return;
    setIsActionLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${backendUrl}/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to mark as read');
      
      setContacts(prev => prev.map(c => c._id === id ? { ...c, isRead: true } : c));
      showSuccess('Inquiry marked as read');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update message.');
    } finally {
      setIsActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Product Form Management
  // -------------------------------------------------------------
  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      ...product,
      benefits: product.benefits
    });
  };

  const openAddProduct = () => {
    const blankProduct: Product = {
      slug: '',
      name: '',
      mgo: 0,
      price: 0,
      size: '250g',
      activityLevel: 1,
      rating: 5,
      tagline: '',
      description: '',
      benefits: [],
      bestFor: '',
      activity: '',
      taste: '',
      image: '/assets/products/mgo-30.webp',
      color: '#9B6500',
      isActive: true
    };
    setEditingProduct(blankProduct);
    setEditFormData(blankProduct);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setEditFormData({});
  };

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'mgo' || name === 'rating' || name === 'activityLevel') {
      setEditFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProductBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditFormData(prev => ({ ...prev, benefits: value as any }));
  };
  
  const uploadImageFile = async (file: File) => {
    if (!token) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Read file to base64 using a Promise so the uploader flow operates sequentially
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const res = await fetch(`${backendUrl}/api/products/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ image: base64Data })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload image");

      setEditFormData(prev => ({ ...prev, image: data.data.url }));
      showSuccess("Image uploaded successfully!");
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadImageFile(file);
    }
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!token) return;

    setIsActionLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${backendUrl}/api/products/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to delete product');

      setProducts(prev => prev.filter(p => p.slug !== slug));
      showSuccess(`Product "${slug}" deleted successfully.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete product details.');
    } finally {
      setIsActionLoading(false);
      setDeletingProductSlug(null);
    }
  };

  const handleProductFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProduct) return;
    
    setIsActionLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      let parsedBenefits = editFormData.benefits;
      if (typeof parsedBenefits === 'string') {
        parsedBenefits = (parsedBenefits as string)
          .split(',')
          .map(b => b.trim())
          .filter(b => b.length > 0);
      }

      const payload = {
        ...editFormData,
        benefits: parsedBenefits
      };

      const isCreating = !editingProduct._id;
      const url = isCreating 
        ? `${backendUrl}/api/products` 
        : `${backendUrl}/api/products/${editingProduct.slug}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to save product');

      if (isCreating) {
        setProducts(prev => [...prev, data.data]);
        showSuccess(`Product "${payload.name}" created successfully.`);
      } else {
        setProducts(prev => prev.map(p => p.slug === editingProduct.slug ? data.data : p));
        showSuccess(`Product "${payload.name}" updated successfully.`);
      }
      
      closeEditModal();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save product details.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FBF5E9] text-[#111111] flex flex-col md:flex-row relative">
      
      {/* Decorative warm glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      {/* 1. Sidebar Navigation (Cream Surface) */}
      <aside className="w-full md:w-64 shrink-0 bg-[#FAF4E8] border-r border-amber-700/10 p-6 flex flex-col justify-between relative z-10 shadow-sm">
        <div>
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-amber-700/10">
            <div className="w-10 h-10 rounded-full border border-amber-700/30 flex items-center justify-center bg-white shadow-[0_0_10px_rgba(155,101,0,0.05)] animate-logo-pulse">
              <span className="font-display text-lg font-bold text-amber-700">AN</span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg text-[#111111] leading-none">Amazing Natures</h2>
              <span className="text-[9px] font-heading uppercase tracking-wider text-amber-700/80 font-bold">Admin Portal</span>
            </div>
          </div>

          {/* Tab Selection */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full h-11 px-4 rounded-xl flex items-center gap-3 font-heading text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-amber-700/10 text-amber-800 border border-amber-700/20'
                  : 'text-[#3D3D3D] hover:text-[#111111] hover:bg-amber-700/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full h-11 px-4 rounded-xl flex items-center gap-3 font-heading text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-amber-700/10 text-amber-800 border border-amber-700/20'
                  : 'text-[#3D3D3D] hover:text-[#111111] hover:bg-amber-700/5'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <div className="flex-1 flex justify-between items-center">
                <span>Orders Ledger</span>
                {orders.filter(o => o.status === 'pending').length > 0 && (
                  <span className="bg-amber-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {orders.filter(o => o.status === 'pending').length}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full h-11 px-4 rounded-xl flex items-center gap-3 font-heading text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-amber-700/10 text-amber-800 border border-amber-700/20'
                  : 'text-[#3D3D3D] hover:text-[#111111] hover:bg-amber-700/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <div className="flex-1 flex justify-between items-center">
                <span>Customer Inquiries</span>
                {contacts.filter(c => !c.isRead).length > 0 && (
                  <span className="bg-amber-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {contacts.filter(c => !c.isRead).length}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="mt-8 pt-6 border-t border-amber-700/10">
          <div className="flex flex-col gap-3">
            <div className="px-2">
              <p className="text-xs font-semibold text-[#111111] truncate">{user?.fullName || 'Admin User'}</p>
              <p className="text-[10px] text-[#6B6B6B] truncate">{user?.email || 'admin@amazingnatures.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full h-10 px-4 rounded-xl border border-amber-700/20 hover:border-red-500/30 text-[#3D3D3D] hover:text-red-700 hover:bg-red-50 transition-all flex items-center justify-center gap-2 text-xs font-heading font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Board */}
      <main className="flex-1 p-6 md:p-8 flex flex-col relative z-10 overflow-x-hidden">
        
        {/* Title Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-semibold tracking-tight text-[#111111] capitalize">
              {activeTab === 'products' ? 'Products Catalog' : activeTab === 'orders' ? 'Orders Ledger' : 'Customer Messages'}
            </h1>
            <p className="text-xs text-amber-700/80 font-heading uppercase tracking-wider font-semibold mt-1">
              Secure Operations Portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={openAddProduct}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 border border-amber-600/30 shadow-[0_2px_8px_rgba(120,78,0,0.15)] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            )}
            
            <button
              onClick={() => fetchData(token || '')}
              disabled={isLoading}
              className="p-2.5 rounded-xl border border-amber-700/15 bg-[#FAF4E8] hover:bg-white transition-all cursor-pointer text-[#3D3D3D] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Global Alerts */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 flex justify-between items-center">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage('')} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div className="flex-1 flex justify-between items-center">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage('')} className="text-green-500 hover:text-green-700"><X className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* 3. Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-amber-700/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-700/5 flex items-center justify-center text-amber-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] font-heading uppercase tracking-wider font-semibold">Total Products</p>
              <h3 className="text-2xl font-bold text-[#111111] mt-0.5">{products.length}</h3>
            </div>
          </div>

          <div className="bg-white border border-amber-700/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-700/5 flex items-center justify-center text-amber-700">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] font-heading uppercase tracking-wider font-semibold">Unprocessed Orders</p>
              <h3 className="text-2xl font-bold text-[#111111] mt-0.5">
                {orders.filter(o => o.status === 'pending').length}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-amber-700/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-700/5 flex items-center justify-center text-amber-700">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] font-heading uppercase tracking-wider font-semibold">Unread Inquiries</p>
              <h3 className="text-2xl font-bold text-[#111111] mt-0.5">
                {contacts.filter(c => !c.isRead).length}
              </h3>
            </div>
          </div>
        </div>

        {/* 4. Tab Table View */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white border border-amber-700/10 rounded-3xl shadow-sm">
            <Loader2 className="w-10 h-10 animate-spin text-amber-700" />
            <p className="text-[#6B6B6B] mt-4 font-heading text-sm font-semibold tracking-wide">Syncing data ledger...</p>
          </div>
        ) : (
          <div className="flex-1 bg-white border border-amber-700/10 rounded-3xl overflow-hidden shadow-sm p-6">
            
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-amber-700/10 text-xs font-heading text-[#6B6B6B] uppercase tracking-wider">
                        <th className="py-4 px-4 font-bold">Product Info</th>
                        <th className="py-4 px-4 font-bold">MGO</th>
                        <th className="py-4 px-4 font-bold">Price</th>
                        <th className="py-4 px-4 font-bold">Size</th>
                        <th className="py-4 px-4 font-bold">Status</th>
                        <th className="py-4 px-4 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-700/5 text-sm">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-amber-700/[0.01] transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {product.image && (
                                <div className="w-10 h-10 bg-[#FAF4E8] border border-amber-700/10 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0">
                                  <img 
                                    src={getImageUrl(product.image)} 
                                    alt={product.name} 
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => { (e.target as any).src = 'https://placehold.co/100x100?text=Honey' }} 
                                  />
                                </div>
                              )}
                              <div>
                                <span className="font-semibold block text-[#111111]">{product.name}</span>
                                <span className="text-[10px] text-[#6B6B6B] font-mono tracking-tight">{product.slug}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-amber-800">MGO {product.mgo}</td>
                          <td className="py-4 px-4 font-semibold text-[#111111]">${product.price} AUD</td>
                          <td className="py-4 px-4 text-[#3D3D3D]">{product.size}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                              product.isActive 
                                ? 'bg-green-50 text-green-800 border border-green-200 bg-green-50/50' 
                                : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                               <button
                                 onClick={() => openEditProduct(product)}
                                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-700/20 hover:border-amber-700 hover:bg-amber-700/5 text-[#3D3D3D] hover:text-amber-800 text-xs font-semibold transition-all cursor-pointer"
                               >
                                 <Edit className="w-3.5 h-3.5" />
                                 <span>Edit Details</span>
                               </button>
                               <button
                                 onClick={() => setDeletingProductSlug(product.slug)}
                                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-500 hover:bg-red-50 text-[#3D3D3D] hover:text-red-700 text-xs font-semibold transition-all cursor-pointer"
                               >
                                 <Trash2 className="w-3.5 h-3.5" />
                                 <span>Delete</span>
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="py-20 text-center text-[#6B6B6B] font-heading text-sm">
                    No orders registered in the system database yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-amber-700/10 text-xs font-heading text-[#6B6B6B] uppercase tracking-wider">
                          <th className="py-4 px-4 font-bold">Order ID & Date</th>
                          <th className="py-4 px-4 font-bold">Customer Details</th>
                          <th className="py-4 px-4 font-bold">Items Ordered</th>
                          <th className="py-4 px-4 font-bold">Total</th>
                          <th className="py-4 px-4 font-bold">Status Ledger</th>
                          <th className="py-4 px-4 text-right font-bold">Change Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-700/5 text-sm">
                        {orders.map((order) => (
                          <tr key={order._id} className="hover:bg-amber-700/[0.01] transition-colors">
                            <td className="py-4 px-4">
                              <span className="font-mono text-xs block font-semibold text-[#111111]">{order.orderId}</span>
                              <span className="text-[10px] text-[#6B6B6B] font-heading font-medium">
                                {new Date(order.createdAt).toLocaleDateString('en-AU', {
                                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-semibold block text-[#111111]">{order.fullName}</span>
                              <span className="text-[11px] block text-amber-800 font-semibold">{order.whatsapp}</span>
                              <span className="text-[10px] block text-[#6B6B6B]">{order.city}, {order.address}</span>
                              {order.orderNote && (
                                <span className="text-[10px] italic text-amber-800 block mt-1">Note: "{order.orderNote}"</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="text-xs text-[#3D3D3D]">
                                    {item.name} <span className="text-amber-800 font-bold">x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-[#111111]">${order.totalAmount} AUD</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <select
                                value={order.status}
                                disabled={isActionLoading}
                                onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value as any)}
                                className="bg-white border border-amber-700/10 rounded-lg px-2.5 py-1.5 text-xs text-[#111111] font-heading font-semibold focus:outline-none focus:border-amber-700/50 cursor-pointer disabled:opacity-50"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <div className="py-20 text-center text-[#6B6B6B] font-heading text-sm">
                    No customer contact inquiries found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-amber-700/10 text-xs font-heading text-[#6B6B6B] uppercase tracking-wider">
                          <th className="py-4 px-4 font-bold">Date & Customer</th>
                          <th className="py-4 px-4 font-bold">Subject</th>
                          <th className="py-4 px-4 font-bold">Message Details</th>
                          <th className="py-4 px-4 font-bold">Status</th>
                          <th className="py-4 px-4 text-right font-bold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-700/5 text-sm">
                        {contacts.map((contact) => (
                          <tr key={contact._id} className={`hover:bg-amber-700/[0.01] transition-colors ${!contact.isRead ? 'bg-amber-700/[0.02]' : ''}`}>
                            <td className="py-4 px-4">
                              <span className="text-[10px] text-[#6B6B6B] font-heading block font-semibold">
                                {new Date(contact.createdAt).toLocaleDateString('en-AU', {
                                  day: '2-digit', month: 'short', year: 'numeric'
                                })}
                              </span>
                              <span className="font-semibold block text-[#111111]">{contact.name}</span>
                              <span className="text-[10px] text-[#6B6B6B] font-mono block">{contact.email}</span>
                            </td>
                            <td className="py-4 px-4 font-semibold text-amber-800">{contact.subject}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs text-[#3D3D3D] max-w-sm whitespace-pre-wrap leading-relaxed">
                                {contact.message}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                contact.isRead 
                                  ? 'bg-zinc-100 text-zinc-800 border border-zinc-200' 
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}>
                                {contact.isRead ? 'Read' : 'New'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              {!contact.isRead ? (
                                <button
                                  onClick={() => handleMarkContactRead(contact._id)}
                                  disabled={isActionLoading}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-700/30 hover:border-amber-700 bg-amber-700/5 hover:bg-amber-700/10 text-amber-800 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                                >
                                  Mark as Read
                                </button>
                              ) : (
                                <span className="text-xs text-[#6B6B6B] font-heading pr-2">Cleared</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </main>

      {/* 5. Product Create/Edit Modal with Lock Scroll Fix */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          
          {/* Modal Container */}
          <div className="bg-[#FAF4E8] border border-amber-700/15 rounded-[32px] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-amber-700/10 shrink-0">
              <div>
                <h3 className="text-xl font-display font-semibold text-[#111111]">
                  {!editingProduct._id ? 'Add New Honey Product' : 'Edit Product Profile'}
                </h3>
                <p className="text-[10px] text-amber-700/80 font-heading uppercase tracking-wider mt-0.5 font-bold">
                  {!editingProduct._id ? 'Create a brand new database record' : `Update database record for ${editingProduct.slug}`}
                </p>
              </div>
              <button 
                onClick={closeEditModal}
                className="p-2 rounded-full border border-amber-700/10 hover:bg-amber-700/5 transition-all text-[#3D3D3D] hover:text-[#111111] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <form onSubmit={handleProductFormSubmit} className="p-6 flex-1 overflow-y-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Fields Column: 7/12 width */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Field Row 1: Slug (editable only on create) & Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Unique Slug (ID)</label>
                      <input
                        type="text"
                        name="slug"
                        required
                        disabled={!!editingProduct._id}
                        placeholder="e.g. mgo-500"
                        value={editFormData.slug || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50 disabled:opacity-50 disabled:bg-zinc-100 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Manuka Honey MGO 500"
                        value={editFormData.name || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>
                  </div>

                  {/* Field Row 2: Price & Weight */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Price (AUD)</label>
                      <input
                        type="number"
                        name="price"
                        required
                        value={editFormData.price || 0}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50 font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Weight/Size</label>
                      <input
                        type="text"
                        name="size"
                        required
                        placeholder="e.g. 250g, 500g"
                        value={editFormData.size || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>
                  </div>

                  {/* Field Row 3: MGO & Color */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">MGO Level</label>
                      <input
                        type="number"
                        name="mgo"
                        required
                        value={editFormData.mgo || 0}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50 font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Theme Color Hex</label>
                      <input
                        type="text"
                        name="color"
                        required
                        placeholder="e.g. #C8A96E"
                        value={editFormData.color || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50 font-mono"
                      />
                    </div>
                  </div>

                  {/* Field Row 4: Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Product Description</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      placeholder="Detail the bioactive benefits and flavor profile..."
                      value={editFormData.description || ''}
                      onChange={handleProductInputChange}
                      className="w-full rounded-xl bg-white border border-amber-700/10 p-4 text-[#111111] focus:outline-none focus:border-amber-700/50 text-xs leading-relaxed"
                    />
                  </div>

                  {/* Field Row 5: Tagline & Rating */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Short Tagline</label>
                      <input
                        type="text"
                        name="tagline"
                        required
                        placeholder="e.g. Bioactive Targeted Support"
                        value={editFormData.tagline || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Visual Rating (1-5)</label>
                      <input
                        type="number"
                        name="rating"
                        required
                        min={1}
                        max={5}
                        value={editFormData.rating || 5}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>
                  </div>

                  {/* Field Row 6: Profile details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Taste Profile</label>
                      <input
                        type="text"
                        name="taste"
                        required
                        placeholder="e.g. Mild, Strong, Floral"
                        value={editFormData.taste || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Activity Level</label>
                      <input
                        type="number"
                        name="activityLevel"
                        required
                        value={editFormData.activityLevel || 1}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Bioactive State</label>
                      <input
                        type="text"
                        name="activity"
                        required
                        placeholder="e.g. Balanced, High Active"
                        value={editFormData.activity || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Best Suited For</label>
                      <input
                        type="text"
                        name="bestFor"
                        required
                        placeholder="e.g. Daily Use, Targeted Support"
                        value={editFormData.bestFor || ''}
                        onChange={handleProductInputChange}
                        className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                      />
                    </div>
                  </div>

                  {/* Field Row 7: Image & Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-amber-700/10 rounded-2xl p-5 bg-[#FAF4E8]">
                    {/* Image Upload Area */}
                    <div className="space-y-3">
                      <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold block">Product Image</label>
                      
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {/* Image Preview Box */}
                        <div className="w-28 h-28 bg-white border border-amber-700/10 rounded-xl overflow-hidden flex items-center justify-center p-2 relative group shadow-sm shrink-0">
                          {editFormData.image ? (
                            <img 
                              src={getImageUrl(editFormData.image)} 
                              alt="Product preview" 
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => { (e.target as any).src = 'https://placehold.co/100x100?text=No+Image' }}
                            />
                          ) : (
                            <div className="text-center text-zinc-400">
                              <ImageIcon className="w-6 h-6 mx-auto mb-1 text-zinc-300" />
                              <span className="text-[9px] uppercase font-semibold">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Drag and Drop Zone */}
                        <div 
                          className={cn(
                            "relative border-2 border-dashed rounded-xl p-4 transition-all text-center flex flex-col items-center justify-center min-h-[112px] flex-1 w-full",
                            isDragging 
                              ? "border-amber-500 bg-amber-500/10 scale-102 shadow-[0_0_15px_rgba(245,158,11,0.25)] animate-pulse"
                              : "border-amber-700/20 hover:border-amber-700/40 bg-white hover:bg-amber-700/[0.01]"
                          )}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            disabled={isUploading}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10 disabled:cursor-not-allowed"
                          />
                          {isUploading ? (
                            <div className="space-y-1 flex flex-col items-center">
                              <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
                              <p className="text-[10px] font-semibold text-amber-800">Uploading...</p>
                            </div>
                          ) : (
                            <div className="space-y-1 flex flex-col items-center">
                              <Upload className="w-4 h-4 text-amber-700" />
                              <p className="text-[11px] font-semibold text-[#111111] leading-tight">
                                Drop image or <span className="text-amber-700 underline">browse</span>
                              </p>
                              <p className="text-[9px] text-[#6B6B6B]">Max 5MB</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Manual URL input fallback */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Or enter path manually</label>
                        <input
                          type="text"
                          name="image"
                          required
                          placeholder="/assets/products/mgo-30.webp"
                          value={editFormData.image || ''}
                          onChange={handleProductInputChange}
                          className="w-full h-9 rounded-lg bg-white border border-amber-700/10 px-3 text-[#111111] focus:outline-none focus:border-amber-700/50 font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    {/* Status Toggle Box */}
                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-amber-700/10 pt-4 md:pt-0 md:pl-6">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={editFormData.isActive ?? true}
                          onChange={handleProductInputChange}
                          className="w-5 h-5 rounded-lg border border-amber-700/20 bg-white text-amber-700 focus:ring-0 cursor-pointer mt-0.5"
                        />
                        <div>
                          <span className="text-sm font-semibold text-[#111111]">Product is Active</span>
                          <span className="text-[10px] text-[#6B6B6B] block mt-0.5 leading-relaxed">
                            Toggle visibility on the storefront catalog. Inactive products won't show in shop pages.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Field Row 8: Key Benefits */}
                  <div className="space-y-2">
                    <label className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-semibold">Key Benefits (Comma separated)</label>
                    <input
                      type="text"
                      name="benefits"
                      placeholder="e.g. Supports Immune System, Rich Antioxidants, Digestive Balance"
                      value={Array.isArray(editFormData.benefits) ? editFormData.benefits.join(', ') : editFormData.benefits || ''}
                      onChange={handleProductBenefitsChange}
                      className="w-full h-11 rounded-xl bg-white border border-amber-700/10 px-4 text-[#111111] focus:outline-none focus:border-amber-700/50"
                    />
                  </div>
                  
                </div>

                {/* Live Preview Column: 5/12 width */}
                <div className="lg:col-span-5 lg:sticky lg:top-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-heading uppercase tracking-wider text-[#6B6B6B] font-bold">Storefront Live Preview</h4>
                    <span className="text-[10px] text-amber-700/80 font-bold bg-amber-700/10 px-2 py-0.5 rounded-full font-mono uppercase">Real-time</span>
                  </div>

                  {/* Preview background box simulating the store environment */}
                  <div className="border border-amber-700/15 rounded-[2.5rem] bg-[#FBF5E9] p-6 shadow-inner flex justify-center items-center min-h-[460px]">
                    
                    {/* Mock Store Card */}
                    <div className="w-full max-w-[280px] rounded-[2.5rem] overflow-hidden border border-amber-700/15 bg-white/90 shadow-lg flex flex-col h-full transition-all duration-300 relative group">
                      
                      {/* Product Image Section */}
                      <div className="block relative aspect-square overflow-hidden bg-white shrink-0">
                        {/* Image */}
                        <div className={`absolute inset-0 flex items-center justify-center ${(editFormData.mgo || 0) === 30 ? "p-4" : "p-10"}`}>
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className={`relative w-full h-full flex items-center justify-center ${(editFormData.mgo || 0) === 30 ? "max-h-full" : "max-h-[85%]"}`}>
                              {editFormData.image ? (
                                <img
                                  src={getImageUrl(editFormData.image)}
                                  alt={editFormData.name || "Preview Product"}
                                  className="object-contain w-full h-full max-w-full max-h-full"
                                  onError={(e) => { (e.target as any).src = 'https://placehold.co/300x300?text=No+Image' }}
                                />
                              ) : (
                                <div className="text-center text-zinc-300">
                                  <ImageIcon className="w-12 h-12 mx-auto mb-1 text-zinc-200" />
                                  <span className="text-xs uppercase font-semibold">Image Preview</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* MGO Badge */}
                        <div className="absolute top-6 left-6 z-20">
                          <span 
                            className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md text-white"
                            style={{ backgroundColor: editFormData.color || "#9B6500" }}
                          >
                            MGO {editFormData.mgo || 0}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col gap-4 flex-grow bg-white/40 border-t border-amber-700/5">
                        <div className="flex-grow">
                          <span className="text-[10px] text-amber-700/70 uppercase tracking-[0.2em] font-bold block mb-1">
                            {editFormData.tagline || "Wellness Support"}
                          </span>
                          <h3 className="text-lg font-display font-bold text-[#111111] leading-tight min-h-[2.5rem] line-clamp-2">
                            {editFormData.name || "Manuka Honey"}
                          </h3>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < (editFormData.rating || 5) 
                                    ? "fill-amber-700 text-amber-700" 
                                    : "text-zinc-300"
                                }`}
                              />
                            ))}
                            <span className="text-[9px] text-[#6B6B6B] ml-2 uppercase tracking-widest font-semibold">
                              {editFormData.size || "250g"} JAR
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-[#111111] tracking-tight">
                              ${editFormData.price || 0}
                            </span>
                            <span className="text-[9px] text-[#6B6B6B] uppercase tracking-wider font-semibold">
                              AUD / Free Shipping
                            </span>
                          </div>
                          
                          <div 
                            className="rounded-xl h-10 w-10 flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: editFormData.color || "#9B6500" }}
                          >
                            <ShoppingCart className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-amber-700/10 flex justify-end gap-3 shrink-0 mt-8">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isActionLoading}
                  className="h-11 px-6 rounded-xl border border-amber-700/20 hover:bg-amber-700/5 text-[#3D3D3D] hover:text-[#111111] text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isActionLoading}
                  className="h-11 px-8 rounded-xl font-heading font-semibold text-white bg-gradient-to-r from-amber-700 to-amber-900 shadow-[0_4px_15px_rgba(120,78,0,0.15)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs"
                >
                  {isActionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Records...</span>
                    </>
                  ) : (
                    <span>Save Product</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 6. Product Deletion Confirmation Modal */}
      {deletingProductSlug && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#FAF4E8] border border-red-200 rounded-[24px] w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-display font-semibold text-[#111111]">
                  Confirm Product Deletion
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Are you sure you want to delete the product <strong className="font-semibold text-[#111111]">"{deletingProductSlug}"</strong>? 
                  This will immediately hide it from the storefront catalog and remove it from active sync. This action is irreversible.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-amber-700/10 pt-4">
              <button
                type="button"
                onClick={() => setDeletingProductSlug(null)}
                disabled={isActionLoading}
                className="h-10 px-4 rounded-xl border border-amber-700/20 hover:bg-amber-700/5 text-[#3D3D3D] text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(deletingProductSlug)}
                disabled={isActionLoading}
                className="h-10 px-5 rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-[0_2px_8px_rgba(220,38,38,0.15)] text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete Product</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

