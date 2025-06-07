import React from 'react';
import { 
  User, 
  UserCircle2, 
  Briefcase, 
  Building2, 
  HeartPulse, 
  ShoppingBag, 
  Home, 
  Factory, 
  UtensilsCrossed,
  Gavel,
  Trees,
  Wrench,
  ShoppingCart,
  Cpu,
  Shield,
  GraduationCap,
  Wifi,
  TrendingUp,
  Store,
  Cake,
  Sparkles
} from 'lucide-react';

interface TestimonialIconProps {
  name: string;
  industry?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const industryIcons: Record<string, React.ReactNode> = {
  'Healthcare': <HeartPulse className="w-6 h-6" />,
  'Retail': <ShoppingBag className="w-6 h-6" />,
  'Real Estate': <Home className="w-6 h-6" />,
  'Food & Beverage': <UtensilsCrossed className="w-6 h-6" />,
  'Restaurant': <UtensilsCrossed className="w-6 h-6" />,
  'Insurance': <Shield className="w-6 h-6" />,
  'FinTech': <TrendingUp className="w-6 h-6" />,
  'Manufacturing': <Factory className="w-6 h-6" />,
  'E-commerce': <ShoppingCart className="w-6 h-6" />,
  'Ecommerce': <ShoppingCart className="w-6 h-6" />,
  'Automotive': <Wrench className="w-6 h-6" />,
  'Education': <GraduationCap className="w-6 h-6" />,
  'Legal': <Gavel className="w-6 h-6" />,
  'Law': <Gavel className="w-6 h-6" />,
  'Landscaping': <Trees className="w-6 h-6" />,
  'HVAC': <Wrench className="w-6 h-6" />,
  'Boutique': <Store className="w-6 h-6" />,
  'Bakery': <Cake className="w-6 h-6" />,
  'Technology': <Cpu className="w-6 h-6" />,
  'Cybersecurity': <Shield className="w-6 h-6" />,
  'IoT': <Wifi className="w-6 h-6" />,
  'SaaS': <Sparkles className="w-6 h-6" />,
  'Data Analytics': <TrendingUp className="w-6 h-6" />,
  'default': <Briefcase className="w-6 h-6" />
};

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-20 h-20'
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

const TestimonialIcon: React.FC<TestimonialIconProps> = ({ 
  name, 
  industry = 'default', 
  size = 'md',
  className = '' 
}) => {
  // Get initials from name
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const initials = getInitials(name);
  
  // Get industry icon or default
  const Icon = industryIcons[industry] || industryIcons.default;
  
  // Generate a consistent color based on the name
  const getColorClass = (name: string) => {
    const colors = [
      'from-red-500/20 to-red-600/20 border-red-500/30',
      'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      'from-green-500/20 to-green-600/20 border-green-500/30',
      'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      'from-pink-500/20 to-pink-600/20 border-pink-500/30',
      'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
      'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash = hash & hash;
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const colorClass = getColorClass(name);

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main icon container */}
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colorClass} border-2 flex items-center justify-center backdrop-blur-sm`}>
        <span className="text-white font-bold text-lg">{initials}</span>
      </div>
      
      {/* Industry icon badge */}
      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-black rounded-full border-2 border-black flex items-center justify-center">
        <div className="text-red-500 scale-75">
          {React.cloneElement(Icon as React.ReactElement, { className: iconSizeClasses.sm })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialIcon;