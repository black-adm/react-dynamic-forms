import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Label } from './components/Label'

export function App() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold tracking-tight">
          Adicionar novos links
        </h1>

        <form className="mt-10 flex flex-col gap-3">
          <div className="flex gap-5 uppercase">
            <div className="flex-1 space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" />
            </div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" />
            </div>
          </div>

          <Button
            className="mt-5 w-full border-dashed inline-flex items-center gap-1.5"
            variant="outline"
          >
            <PlusIcon className="size-4 text-black" />
            Criar link
          </Button>
        </form>
      </div>
    </div>
  )
}
