import { Link2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
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

  const links = form.watch('links')

  return (
    <div className="grid grid-cols-2 place-items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight">
          <Link2Icon className="size-6" />
          Adicionar novos links
        </h1>

        <form className="mt-16 flex flex-col gap-3">
          {links.map((_, index) => (
            <div key={index} className="flex gap-5 uppercase">
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

                <Button variant="destructive">
                  <TrashIcon className="size-4.5" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            className="mt-5 max-w-md border-dashed inline-flex items-center gap-1.5"
            variant="outline"
          >
            <PlusIcon className="size-4 text-black" />
            Criar link
          </Button>
        </form>
      </div>

      <main className="w-full h-screen bg-marketing bg-cover bg-no-repeat"></main>
    </div>
  )
}
