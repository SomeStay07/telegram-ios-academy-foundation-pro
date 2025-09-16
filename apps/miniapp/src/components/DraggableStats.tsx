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

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`glass-card p-4 bg-white/3 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 scale-105' : ''
      }`}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => haptics.selection()}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="text-2xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {stat.icon}
        </motion.div>
        <div className="flex-1">
          <div className={`text-lg font-bold text-white mb-0.5 ${
            stat.gradient ? 'text-gradient-ios' : ''
          }`}>
            {stat.value}
          </div>
          <div className="text-xs text-white/60 font-medium uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
        <motion.div 
          className="text-white/30 text-sm"
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          ⋮⋮
        </motion.div>
      </div>
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
        className="mb-4 px-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm text-white/70 font-medium uppercase tracking-wide mb-2">
          📊 Drag to reorder stats
        </h3>
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