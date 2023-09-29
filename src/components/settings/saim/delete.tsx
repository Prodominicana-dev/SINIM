import { notifications } from "@mantine/notifications";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import axios from "axios";

export default function DeleteSaim({id, open, handleOpen, updateSaims}: {id: number, open: boolean, handleOpen: () => void, updateSaims: () => void}) {

    const handleDelete = async () => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/saim/${id}`).then(() => {
            notifications.show({
                title: "SAIM desactivado",
                message: "El SAIM ha sido desactivado correctamente",
                color: "green",
                autoClose: 5000,
            })
            handleOpen()
            updateSaims()
        })
        
    }
  return (
    <>
        <Dialog open={open} handler={handleOpen} size="md">
            <DialogHeader>¿Estás seguro de desactivar el SAIM?</DialogHeader>
            <DialogBody divider>
             <p>El SAIM será desactivado, no eliminado.</p>   
            </DialogBody>
            <DialogFooter>
            <Button color="red" onClick={handleDelete}>Sí</Button>
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
