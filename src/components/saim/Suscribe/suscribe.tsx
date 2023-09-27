"using client"
import { useUser } from "@auth0/nextjs-auth0/client";
import { notifications } from "@mantine/notifications";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
  } from "@material-tailwind/react";
import axios from "axios";
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
        <Dialog open={open} handler={handleOpen} size="sm">

                <DialogBody>
                <div className="flex flex-col items-center justify-center w-full h-36">
                    <Typography color="black" variant="h2">¡Suscríbete a Nuestras Alertas!</Typography>
                    <Typography color="gray" className="w-10/12 text-lg font-thin text-center" variant="lead">¡Deja que te mantengamos al día con las tendencias más recientes en comercio internacional!</Typography>
                    </div>
                 <div className="flex flex-col items-center justify-center w-full space-y-4 h-82">
                        <div className="w-10/12">
                            <Input label="Correo electrónico"  type="email" crossOrigin={undefined} />
                        </div>
                        <div className="w-10/12">
                            <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Seleccione los productos del SAIM..."
                            options={option}
                        />
                        </div>
                        
                        <div className="w-10/12">
                            <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Seleccione los productos del SAIM..."
                            options={option}
                        />
                        </div>
                    </div>
                    <div className="flex justify-center w-full pt-4">
                        <button className="w-10/12 p-2 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-purple-600 from-[20%] via-purple-400 to-sky-400">Suscribirse</button>
                    </div>
                    <div className="flex justify-center w-full pt-4">
                        <Typography color="black" variant="small">¡Asegúrate de seleccionar los productos y países de tu interés!</Typography>
                    </div>
                    
                </DialogBody>
            </Dialog>
        </>
    
      )
 
}
