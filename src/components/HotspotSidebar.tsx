import React from 'react';
import { motion } from 'motion/react';
import { Plus, Edit3, Trash2 } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  url: string;
  x: number;
  y: number;
  phi?: number;
  theta?: number;
  isPlaced: boolean;
}

interface HotspotSidebarProps {
  hotspots: Hotspot[];
  onDragStart: () => void;
  onDragEnd: (id: string, info: any) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (hotspot: Hotspot) => void;
  className?: string;
}

const HotspotSidebar: React.FC<HotspotSidebarProps> = ({
  hotspots,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
  onSelect,
  className = ""
}) => {
  return (
    <aside className={`bg-white border-r border-black/5 flex flex-col overflow-hidden transition-all duration-300 group/sidebar shrink-0 ${className}`}>
      <div className="p-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <h2 className="text-[10px] font-bold text-black/60 uppercase tracking-widest hidden md:block group-hover/sidebar:block">Điểm 360°</h2>
        <span className="px-2 py-0.5 bg-black/5 rounded-full text-[10px] font-bold mx-auto md:mx-0">{hotspots.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {hotspots.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
            <Plus size={24} className="mb-2" />
            <p className="text-[8px] font-medium uppercase tracking-tighter hidden md:block group-hover/sidebar:block">Trống</p>
          </div>
        ) : (
          hotspots.map((h) => (
            <motion.div
              key={h.id}
              drag
              dragSnapToOrigin
              onDragStart={onDragStart}
              onDragEnd={(_, info) => onDragEnd(h.id, info)}
              whileDrag={{ scale: 1.02, zIndex: 50 }}
              className={`group p-2 rounded-xl transition-all cursor-grab active:cursor-grabbing border flex flex-col items-center md:items-start group-hover/sidebar:items-start select-none ${
                h.isPlaced 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-900' 
                  : 'bg-white border-black/5 hover:border-black/20 shadow-sm'
              }`}
              onClick={() => h.isPlaced && onSelect(h)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-black/10 border border-black/5 relative pointer-events-none">
                  <img 
                    src={h.url} 
                    className="w-full h-full object-cover" 
                    alt="" 
                    draggable="false"
                  />
                  {h.isPlaced && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 border border-white" />}
                </div>
                <div className="flex-1 min-w-0 hidden md:block group-hover/sidebar:block text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold truncate">{h.name}</p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(h.id); }}
                        className="p-1 hover:bg-black/5 rounded text-black/40 hover:text-black"
                      >
                        <Edit3 size={10} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(h.id); }}
                        className="p-1 hover:bg-red-50 text-red-400 hover:text-red-600 rounded"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[8px] opacity-40 font-mono">#{h.id.slice(0, 4)}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </aside>
  );
};

export default HotspotSidebar;
