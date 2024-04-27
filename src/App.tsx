import {
  CheckIcon,
  Link2Icon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Label } from './components/Label'

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

  return (
    <div className="grid px-6 md:grid-cols-2 md:px-0 place-items-center min-h-screen">
      <div className="w-full max-w-xl">
        <h1 className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight">
          <Link2Icon className="size-6" />
          Minha lista de links
        </h1>

        <form className="mt-16 flex flex-col gap-3">
          {links.fields.map((link, index) => (
            <div key={link.id} className="flex gap-5 uppercase">
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
                  <Input id="url" {...form.register(`links.${index}.url`)} />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    title="Salvar link"
                    variant="secondary"
                    tabIndex={-1}
                    onClick={() => {
                      toast.success('O link foi salvo com sucesso na lista.')
                      links.prepend({ title: '', url: '' })
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
          ))}

          <Button
            type="button"
            className="mt-5 max-w-md border-dashed inline-flex items-center gap-1.5"
            variant="outline"
            onClick={() => links.append({ title: '', url: '' })}
          >
            <PlusIcon className="size-4 text-black" />
            Criar um novo link
          </Button>
        </form>
      </div>

      <main className="w-full h-screen bg-marketing bg-cover bg-no-repeat"></main>
      <Toaster richColors position="bottom-left" />
    </div>
  )
}
