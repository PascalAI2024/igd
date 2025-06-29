import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Clock, 
  MapPin, 
  CreditCard,
  Check,
  Star,
  UtensilsCrossed,
  Truck,
  Phone,
  User,
  DollarSign
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  prepTime: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface OrderStats {
  totalOrders: number;
  avgOrderValue: number;
  deliveryTime: string;
  customerSatisfaction: number;
}

const LiveOrderingDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'checkout'>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [orderStats, setOrderStats] = useState<OrderStats>({
    totalOrders: 1247,
    avgOrderValue: 42.50,
    deliveryTime: '28 min',
    customerSatisfaction: 4.8
  });

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with truffle oil and parmesan',
      price: 14.99,
      category: 'appetizers',
      image: '/api/placeholder/200/150',
      rating: 4.9,
      prepTime: '12 min'
    },
    {
      id: '2',
      name: 'Burrata Caprese',
      description: 'Fresh burrata with heirloom tomatoes and basil',
      price: 16.99,
      category: 'appetizers',
      image: '/api/placeholder/200/150',
      rating: 4.8,
      prepTime: '8 min'
    },
    {
      id: '3',
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon herb butter and vegetables',
      price: 28.99,
      category: 'mains',
      image: '/api/placeholder/200/150',
      rating: 4.9,
      prepTime: '18 min'
    },
    {
      id: '4',
      name: 'Ribeye Steak',
      description: '12oz ribeye with garlic mashed potatoes',
      price: 34.99,
      category: 'mains',
      image: '/api/placeholder/200/150',
      rating: 4.7,
      prepTime: '22 min'
    },
    {
      id: '5',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with espresso and mascarpone',
      price: 8.99,
      category: 'desserts',
      image: '/api/placeholder/200/150',
      rating: 4.8,
      prepTime: '5 min'
    }
  ];

  const categories = [
    { id: 'appetizers', name: 'Appetizers', count: 8 },
    { id: 'mains', name: 'Main Courses', count: 12 },
    { id: 'desserts', name: 'Desserts', count: 6 }
  ];

  // Simulate live order stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStats(prev => ({
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 3),
        avgOrderValue: Math.max(35, Math.min(50, prev.avgOrderValue + (Math.random() - 0.5) * 2)),
        deliveryTime: `${Math.floor(Math.random() * 10 + 25)} min`,
        customerSatisfaction: Math.max(4.5, Math.min(5.0, prev.customerSatisfaction + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🍽️ Live Restaurant Ordering System Demo</h3>
        <p className="text-gray-400">Interactive ordering system - see how customers experience your digital menu!</p>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Orders Today', value: orderStats.totalOrders.toString(), icon: ShoppingBag, color: 'text-green-400' },
          { label: 'Avg Order Value', value: `$${orderStats.avgOrderValue.toFixed(2)}`, icon: DollarSign, color: 'text-blue-400' },
          { label: 'Delivery Time', value: orderStats.deliveryTime, icon: Clock, color: 'text-purple-400' },
          { label: 'Rating', value: orderStats.customerSatisfaction.toFixed(1), icon: Star, color: 'text-yellow-400' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 p-3 rounded-lg border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Interface */}
        <div className="lg:col-span-2">
          <div className="bg-black/30 border border-white/10 rounded-lg">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold">Bella Vista Restaurant</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Open</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Italian Cuisine • 4.8 ⭐ • 25-35 min delivery</p>
            </div>

            {/* Category Tabs */}
            <div className="flex border-b border-white/10">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-1 p-3 text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'text-red-400 border-b-2 border-red-400 bg-red-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-white font-medium">{item.name}</h5>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 text-xs">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold">${item.price}</span>
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.prepTime}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Cart/Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg h-full">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold">Your Order</h4>
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {getCartItemCount()} items
                </div>
              </div>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Your cart is empty</p>
                  <p className="text-gray-500 text-sm">Add items from the menu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <div className="flex-1">
                        <h6 className="text-white text-sm font-medium">{item.name}</h6>
                        <p className="text-gray-400 text-xs">${item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 bg-gray-600 hover:bg-gray-700 rounded text-white flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-3 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="text-white font-bold">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Delivery:</span>
                      <span className="text-white">$3.99</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-red-400">${(getCartTotal() + 3.99).toFixed(2)}</span>
                    </div>

                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🍽️ Ordering System:</strong> This interactive demo shows how customers 
          experience your online ordering system. Try adding items to cart and see the seamless flow!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveOrderingDemo;
