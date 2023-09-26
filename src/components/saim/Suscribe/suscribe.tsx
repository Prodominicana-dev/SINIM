"using client"
import { notifications } from "@mantine/notifications";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
  } from "@material-tailwind/react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();


export default function Suscribe({open, handleOpen} : {open: boolean, handleOpen: () => void}) {
    const option = ['SAIM', 'SAIM 2', 'SAIM 3']
  return (
    <>
    <Dialog open={open} handler={handleOpen} size="md">
            <DialogHeader>
                <div className="w-full h-36 bg-gradient-to-tr from-purple-500 from-[15%] via-sky-600 to-sky-400 flex flex-col justify-center text-white text-4xl items-center rounded-lg">Suscribirse</div>
            </DialogHeader>
            <DialogBody>
             <div className="flex flex-col w-full space-y-4 h-82">
                <div className="w-full px-8 text-2xl font-bold text-black">Registro</div>
                <div className="flex flex-row justify-start w-full px-8 space-x-16">
                    <div className="w-96">
                        <Input label="Nombre" crossOrigin={undefined} />
                    </div>
                    <div className="w-96">
                        <Input label="Apellido" crossOrigin={undefined} />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full px-8">
                    <Input label="Correo electrónico"  type="email" crossOrigin={undefined} />
                </div>
                <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los productos del SAIM..."
                options={option}
              />
               <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los productos del SAIM..."
                options={option}
              />
                </div> 
            </DialogBody>
            <DialogFooter>
            <Button color="red">Sí</Button>
                <Button
                    variant="text"
                    
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancelar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </>

  )
}
