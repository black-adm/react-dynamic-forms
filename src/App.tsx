import { Reorder } from 'framer-motion'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Label } from './components/Label'
import { cn } from './lib/utils'

import {
  CheckIcon,
  Link2Icon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons'

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        {
          title: 'Shorts do instagram',
          url: 'https://instagram.com',
        },
        {
          title: 'Anúncio do facebook',
          url: 'https://facebook.com',
        },
      ],
    },
  })

  const links = useFieldArray({
    name: 'links',
    control: form.control,
  })

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null)

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData)
  })

  function handleReorder(newOrder: typeof links.fields) {
    if (!draggingIndex) return

    const draggingLink = links.fields[draggingIndex]

    newOrder.forEach((link, index) => {
      if (link === draggingLink) {
        links.move(draggingIndex, index)
        setDraggingIndex(index)
      }
    })
  }

  function handleDragStart(index: number) {
    setDraggingIndex(index)
  }

  function handleDragEnd() {
    setDraggingIndex(null)
  }

  return (
    <div className="grid px-6 md:grid-cols-2 md:px-0 place-items-center min-h-screen">
      <div className="w-full max-w-xl">
        <h1 className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight">
          <Link2Icon className="size-6" />
          Minha lista de links
        </h1>
        <p className="font-medium text-sm text-muted-foreground pt-2">
          Adicione e organize seus links copiados na web de forma simples.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <Button
            type="button"
            className="mb-8 max-w-xs inline-flex items-center gap-1.5 text-sky-400 border-sky-300 border-dashed hover:text-sky-500 hover:bg-sky-50"
            variant="outline"
            onClick={() => links.prepend({ title: '', url: '' })}
          >
            <PlusIcon className="size-4 text-sky-500" />
            Criar um novo link
          </Button>

          <Reorder.Group
            axis="y"
            values={links.fields}
            onReorder={handleReorder}
          >
            {links.fields.map((link, index) => (
              <Reorder.Item
                key={link.id}
                value={link}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                className="relative"
              >
                <div
                  className={cn(
                    'flex pt-4 gap-5 uppercase transition-opacity',
                    draggingIndex != null &&
                      draggingIndex !== index &&
                      'opacity-50',
                  )}
                >
                  <div className="flex-1 flex items-end gap-5">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        {...form.register(`links.${index}.title`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        {...form.register(`links.${index}.url`)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        title="Salvar link"
                        variant="secondary"
                        className="bg-green-100"
                        tabIndex={-1}
                        onClick={() => {
                          toast.success(
                            'O link foi salvo com sucesso na lista.',
                          )
                        }}
                      >
                        <CheckIcon className="size-4.5 text-green-600" />
                      </Button>

                      <Button
                        type="button"
                        title="Remover link"
                        variant="destructive"
                        tabIndex={-1}
                        onClick={() => {
                          toast.error('O link foi removido da sua lista.')
                          links.remove(index)
                        }}
                      >
                        <TrashIcon className="size-4.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </form>
      </div>

      <main className="w-full h-screen bg-marketing bg-cover bg-no-repeat"></main>
      <Toaster richColors position="bottom-left" />
    </div>
  )
}
