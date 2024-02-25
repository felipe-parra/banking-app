import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InstitutionType } from "@/types/belvo.types"

export function ConnectForm({ institution }: { institution: InstitutionType }) {

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>Connect</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create connection</DialogTitle>
            <DialogDescription>
              Make a link to connect with your bank.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {
              institution.form_fields.map((field, index) => (
                <div key={index} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.name} className="text-right capitalize">
                    {field.name}
                  </Label>
                  <Input name={field.name} onChange={handleInputChange} pattern={field.validation} id={field.name} type={field.type} placeholder={field.placeholder} required={!field.optional} className="col-span-3" />
                </div>
              ))
            }
          </div>
          <DialogFooter>
            <Button variant={"default"} className="w-full" type="submit">Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
