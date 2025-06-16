import { Button } from './ui/button';
import { Map, Activity, Users, Settings, Shield, Radar, Target, Database } from 'lucide-react';
import logoImage from 'figma:asset/df4c149401db4e97b3163066dabf7836e27b00f9.png';

export function SideMenu() {
  const menuItems = [
    { icon: Map, label: 'Tactical Map', active: true },
    { icon: Target, label: 'Targets' },
    { icon: Radar, label: 'Sensors' },
    { icon: Activity, label: 'Analytics' },
    { icon: Users, label: 'Entities' },
    { icon: Database, label: 'Intel' },
    { icon: Shield, label: 'Defense' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-[47px] bg-gray-950 border-r border-gray-800 flex flex-col items-center">
      {/* Logo */}
      <div className="w-[47px] h-[47px] border-b border-gray-800 flex items-center justify-center">
        <img 
          src={logoImage} 
          alt="Anduril Logo" 
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-2 flex flex-col space-y-1">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-10 h-10 p-0 mx-auto ${
              item.active 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
            }`}
            title={item.label}
          >
            <item.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      {/* Status Indicator */}
      <div className="pb-4">
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}