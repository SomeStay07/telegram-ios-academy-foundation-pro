import React from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useHaptics } from '../lib/haptics'

interface StatItem {
  id: string
  icon: string
  label: string
  value: string | number
  gradient?: string
}

interface SortableStatProps {
  stat: StatItem
}

const SortableStat: React.FC<SortableStatProps> = ({ stat }) => {
  const haptics = useHaptics()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stat.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Определяем специальную тему для Total XP
  const isSpecialStat = stat.id === 'xp'

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`premium-stat-card ${isSpecialStat ? 'premium-stat-card-special' : ''} ${
        isDragging ? 'opacity-50 scale-105' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => haptics.selection()}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Background particles */}
      <div className="stat-card-particles" />
      
      {/* Glow effect for special stats */}
      {isSpecialStat && <div className="stat-card-glow" />}
      
      <div className="flex items-center gap-4">
        <motion.div 
          className={`stat-icon ${isSpecialStat ? 'stat-icon-special' : ''}`}
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {stat.icon}
        </motion.div>
        
        <div className="flex-1">
          <motion.div 
            className={`stat-value ${isSpecialStat ? 'stat-value-special' : ''}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {stat.value}
          </motion.div>
          <motion.div 
            className="stat-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {stat.label}
          </motion.div>
        </div>
        
        <motion.div 
          className="stat-drag-handle"
          whileHover={{ scale: 1.3, opacity: 0.8 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className="drag-dots">
            <div className="drag-dot"></div>
            <div className="drag-dot"></div>
            <div className="drag-dot"></div>
            <div className="drag-dot"></div>
            <div className="drag-dot"></div>
            <div className="drag-dot"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Hover shimmer effect */}
      <div className="stat-card-shimmer" />
    </motion.div>
  )
}

interface DraggableStatsProps {
  initialStats?: StatItem[]
}

export const DraggableStats: React.FC<DraggableStatsProps> = ({ 
  initialStats = [
    { id: 'xp', icon: '⚡', label: 'Total XP', value: '15,750', gradient: true },
    { id: 'streak', icon: '🔥', label: 'Day Streak', value: 7 },
    { id: 'challenges', icon: '🎯', label: 'Challenges', value: 23 },
    { id: 'battles', icon: '⚔️', label: 'Battles Won', value: 12 },
    { id: 'rank', icon: '🏆', label: 'Global Rank', value: '#1,247' },
    { id: 'achievements', icon: '🌟', label: 'Achievements', value: 8 },
  ]
}) => {
  const [stats, setStats] = React.useState(initialStats)
  const haptics = useHaptics()
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      haptics.impact('medium')
      
      setStats((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.div 
        className="mb-6 px-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="premium-stats-header">
          <motion.div 
            className="stats-header-icon"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            📊
          </motion.div>
          <h3 className="stats-header-text">
            Drag to reorder stats
          </h3>
        </div>
      </motion.div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={stats} strategy={verticalListSortingStrategy}>
          <div className="px-4 space-y-3">
            {stats.map((stat) => (
              <SortableStat key={stat.id} stat={stat} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </motion.div>
  )
}