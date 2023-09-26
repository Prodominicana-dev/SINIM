"using client"
import { useUser } from "@auth0/nextjs-auth0/client";
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
import Link from "next/link";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/navigation";

const animatedComponents = makeAnimated();

interface SuscribeProps {
    open: boolean, handleOpen: () => void
}

export default function Suscribe({open, handleOpen} : SuscribeProps) {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const option = ['SAIM', 'SAIM 2', 'SAIM 3']
    
    

    if(!isLoading && !user){
        return router.push("/api/auth/login");
    }

    return (
        <>
        <Dialog open={open} handler={handleOpen} size="md">
                <DialogHeader>
                    <div className="flex items-center justify-center w-full h-36">
                        <div className="text-5xl font-black text-black">Suscríbete</div>
                    </div>
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
