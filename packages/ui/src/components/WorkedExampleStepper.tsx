import React, { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { CodeBlock } from './CodeBlock'

export interface WorkedExampleStep {
  id: string
  code: string
  explanation: string
}

export interface WorkedExampleStepperProps {
  title: string
  steps: WorkedExampleStep[]
}

export const WorkedExampleStepper: React.FC<WorkedExampleStepperProps> = ({ 
  title, 
  steps 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentStep = steps[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex(Math.min(steps.length - 1, currentIndex + 1))
  }

  if (!currentStep) {
    return null
  }

  return (
    <Card title={title}>
      <div role="region" aria-live="polite" aria-label={`Шаг ${currentIndex + 1} из ${steps.length}`}>
        <CodeBlock code={currentStep.code} />
        <p>{currentStep.explanation}</p>
      </div>
      
      <div 
        role="group" 
        aria-label="Навигация по шагам"
        style={{ display: 'flex', gap: 8, marginTop: 16 }}
      >
        <Button 
          onClick={goToPrevious} 
          disabled={currentIndex === 0}
          aria-label={`Предыдущий шаг (${currentIndex} из ${steps.length})`}
        >
          Назад
        </Button>
        <Button 
          onClick={goToNext} 
          disabled={currentIndex === steps.length - 1}
          aria-label={`Следующий шаг (${currentIndex + 2} из ${steps.length})`}
        >
          Далее
        </Button>
      </div>
      
      <div 
        aria-label={`Текущий прогресс: шаг ${currentIndex + 1} из ${steps.length}`}
        style={{ 
          marginTop: 8, 
          fontSize: '0.875rem', 
          color: 'var(--color-fg-muted)',
          textAlign: 'center'
        }}
      >
        {currentIndex + 1} / {steps.length}
      </div>
    </Card>
  )
}