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
                title: "SAIM eliminado",
                message: "El SAIM ha sido eliminado correctamente",
                color: "green",
                autoClose: 5000,
            })
            handleOpen()
            updateSaims()
        })
        
    }
  return (
    <>
        <Dialog open={open} handler={handleOpen} size="xs">
            <DialogHeader>¿Estás seguro de eliminar este SAIM?</DialogHeader>
            <DialogBody>
                <Button color="red" onClick={handleDelete}>Sí</Button>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancelar</span>
                </Button>
            </DialogBody>
        </Dialog>
      </>
  )
}
