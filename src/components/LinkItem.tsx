import { cn } from '@/lib/utils'
import {
  CheckIcon,
  DragHandleDots2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'

import { Reorder, useDragControls } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from './Button'
import { Input } from './Input'

interface LinkItemProps {
  index: number
  isDraggingActive: boolean | null
  link: {
    title: string
    url: string
  }
  onDragStart: () => void
  onDragEnd: () => void
  onRemove: () => void
}

export function LinkItem({
  index,
  isDraggingActive,
  link,
  onDragStart,
  onDragEnd,
  onRemove,
}: LinkItemProps) {
  const controls = useDragControls()
  const form = useFormContext()

  return (
    <Reorder.Item
      value={link}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragListener={false}
      dragControls={controls}
      className="relative"
    >
      <div
        className={cn(
          'flex pt-4 gap-5 uppercase transition-opacity',
          isDraggingActive === false && 'opacity-50',
        )}
      >
        <div className="flex-1 flex items-end gap-3">
          <Button
            type="button"
            title="Mover"
            variant="ghost"
            className="cursor-grab hover:bg-gray-50"
            onPointerDown={(e) => controls.start(e)}
          >
            <DragHandleDots2Icon className="size-5" />
          </Button>
          <div className="flex-1 flex items-end gap-5">
            <div className="flex-1 space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" {...form.register(`links.${index}.title`)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...form.register(`links.${index}.url`)} />
          </div>

          <div className="flex gap-3">
            <Button
              title="Salvar link"
              variant="secondary"
              className="bg-green-100"
              tabIndex={-1}
              onClick={() => {
                toast.success('O link foi salvo com sucesso na lista.')
              }}
            >
              <CheckIcon className="size-4.5 text-green-600" />
            </Button>

            <Button
              type="button"
              title="Remover link"
              variant="destructive"
              tabIndex={-1}
              onClick={onRemove}
            >
              <TrashIcon className="size-4.5" />
            </Button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}
