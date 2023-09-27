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
import { useAtom } from "jotai";
import { countryAtom, countrySelect, productAtom, productSelect } from "@/src/state/states";
import { useEffect, useState } from "react";


const animatedComponents = makeAnimated();

interface SuscribeProps {
    open: boolean, handleOpen: () => void, email?: string
}

export default function Suscribe({open, handleOpen, email} : SuscribeProps) {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const option = ['SAIM', 'SAIM 2', 'SAIM 3']
    const [countries,] = useAtom(countryAtom);
    const [products,] = useAtom(productAtom);
    const [sCountries, setSCountries] = useState<any>([]);
    const [sProducts, setSProducts] = useState<any>([]);
    const [selectedCountries, setSelectedCountries] = useState<any>([]);
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    
    useEffect(() => {
    if(countries){
        const country = countries
        .map((country) => ({
            value: country.id.toString(),
            label: country.name,
        }));
        setSCountries(country);
    }
    if(products){
        const product = products
        .map((product) => ({
            value: product.id.toString(),
            label: `${product.name} - ${product.code}`,
        }));
        setSProducts(product);
    }
    
    }, [countries, products]);

    useEffect(() => {
        const getData = async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/suscriber/${user?.email}/saim`);
            if(data){
                const countries = data.suscriber_countries.map((c : any) => ({
                    value: c.country.id.toString(),
                    label: c.country.name,
                }));
                setSelectedCountries(countries);

                const products = data.suscriber_products.map((p : any) => ({
                    value: p.product.id.toString(),
                    label: `${p.product.name} - ${p.product.code}`,
                }));
                setSelectedProducts(products);
            }
        }
        getData();
    }, [])

    if(!isLoading && !user){
        return router.push("/api/auth/login");
    }

    const handleProductOnChange = (value : any) => {
        setSelectedProducts(value);
    }

    const handleCountryOnChange = (value : any) => {
        setSelectedCountries(value);
    }

    const handleSuscribe = async () => {
        const productsId = selectedProducts.map((product : any) => Number(product.value))
        const countriesId = selectedCountries.map((country : any) => Number(country.value))
        const data = {
            email: email,
            countries: countriesId,
            products: productsId,
            name: user?.name,
            platform: "saim"
        }
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/suscriber`, data).then((res) => {
            if(res.status === 200){
                notifications.show({
                    title: "¡Suscripción Exitosa!",
                    message: "¡Te has suscrito a nuestras alertas!",
                    color: "green",
                    autoClose: 5000,
                    withCloseButton: false, 
                });
                handleOpen();
                setSelectedCountries([]);
                setSelectedProducts([]);
            }
        })
    }

    return (
        <>
        <Dialog open={open} handler={handleOpen} size="md">

                <DialogBody>
                <div className="flex flex-col items-center justify-center w-full space-y-4 h-36">
                    <Typography className="w-11/12 text-xl font-bold text-center text-black sm:w-10/12 sm:text-2xl md:text-4xl">¡Suscríbete a Nuestras Alertas!</Typography>
                    <Typography className="w-11/12 text-xs font-thin text-center text-gray-500 sm:w-10/12 sm:text-sm" variant="lead">¡Deja que te mantengamos al día con las tendencias más recientes en comercio internacional!</Typography>
                    </div>
                 <div className="flex flex-col items-center justify-center w-full space-y-4 h-82">
                        <div className="w-10/12">
                            <Input label="Correo electrónico" disabled value={email}  type="email" crossOrigin={undefined} />
                        </div>
                        <div className="w-10/12">
                            <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Seleccione los países de interés.."
                            onChange={handleCountryOnChange}
                            value={selectedCountries}
                            options={sCountries}
                        />
                        </div>
                        
                        <div className="w-10/12">
                            <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Seleccione los productos de interés.."
                            onChange={handleProductOnChange}
                            value={selectedProducts}
                            options={sProducts}
                        />
                        </div>
                    </div>
                    <div className="flex justify-center w-full pt-4">
                        <button onClick={handleSuscribe}
                        className="w-10/12 p-2 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-purple-600 hover:from-purple-700  hover:via-purple-500 hover:to-sky-500 duration-700 from-[20%] via-purple-400 to-sky-400">Suscribirse</button>
                    </div>
                    <div className="flex justify-center w-full pt-4">
                        <Typography className="w-11/12 text-[10px] text-center sm:text-xs text-gray-500">¡Asegúrate de seleccionar los productos y países de tu interés!</Typography>
                    </div>
                    
                </DialogBody>
            </Dialog>
        </>
    
      )
 
}
