import { Box, Button, FormControl, Typography } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import {Image2} from "react-iconly"

interface MediaSelectorProps {
    uploadedImage?: string
    setUploadedImage: (img: string) => void
    heading: string
    subheader: ReactNode
}

export default function MediaSelector(props: MediaSelectorProps) {

    const imageInputRef = useRef<HTMLInputElement | null>(null)

    const handleUploadImageClick = () => {
        imageInputRef.current?.click()
    }

    const handleOnImageInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const file = e.target.files[0]
            const fileReader = new FileReader();

            fileReader.onloadend = (e) => {
                props.setUploadedImage(e.target?.result as string)
            }

            fileReader.readAsDataURL(file);
  
        }
        
        

    }

    return <Box
                sx={{
                    display: 'flex',
                    marginTop: '3rem'
                }}
            >   
                <Box sx={{
                    width: '8rem',
                    height: '8rem',
                    borderRadius: '0.5rem',
                    bgcolor: 'secondary.light',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '2rem',
                }}>
                    {
                        props.uploadedImage?
                        <Image 
                            width={128} 
                            height={128} 
                            src={props.uploadedImage} 
                            alt="uploaded image"
                            style={{
                                borderRadius: '0.5rem'
                            }}
                        />:
                        <Image2 size="xlarge" set="broken" primaryColor="blueviolet"/>
                    }
                </Box>
                <FormControl>
                    <Typography sx={{
                                marginBottom: '0.2rem'
                            }}  variant="h6">{props.heading}
                    </Typography>
                    <Typography color="primary.light" variant="body2">
                        {props.subheader}
                    </Typography>
                    <input 
                        ref={imageInputRef} 
                        type="file" 
                        accept="image/*" 
                        style={{display: 'none'}} 
                        onChange={handleOnImageInput}
                    />
                    <Button
                        onClick={() => {handleUploadImageClick()}}
                        sx={{
                            marginTop: '1rem',
                            border: '0.5px solid',
                            paddingY: '0.5rem'
                        }}
                    >{props.uploadedImage ? 'Replace': 'Upload'} Image</Button>
                </FormControl>
            </Box>
}