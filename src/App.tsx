import { Reorder } from 'framer-motion'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { Button } from './components/Button'

import { Link2Icon, PlusIcon } from '@radix-ui/react-icons'
import { LinkItem } from './components/LinkItem'

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
    if (draggingIndex === null) return

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
      <div className="w-full max-w-xl pb-16">
        <h1 className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight">
          <Link2Icon className="size-6" />
          Minha lista de links
        </h1>
        <p className="font-medium text-sm text-muted-foreground pt-2">
          Adicione e organize seus links copiados na web de forma simples.
        </p>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
            <Button
              type="button"
              className="mb-8 max-w-xs inline-flex items-center gap-1.5 text-sky-400 border-sky-300 border-dashed hover:text-sky-500 hover:bg-sky-50"
              variant="outline"
              onClick={() => links.prepend({ title: '', url: 'https://' })}
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
                <LinkItem
                  key={link.id}
                  link={link}
                  index={index}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  isDraggingActive={
                    draggingIndex === null ? null : draggingIndex === index
                  }
                  onRemove={() => {
                    toast.error('O link foi removido da sua lista.')
                    links.remove(index)
                  }}
                />
              ))}
            </Reorder.Group>
          </form>
        </FormProvider>
      </div>

      <main className="w-full h-screen bg-marketing bg-cover bg-no-repeat"></main>
      <Toaster richColors position="bottom-left" />
    </div>
  )
}
