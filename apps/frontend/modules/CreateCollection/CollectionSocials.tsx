import SectionHeader from "@/components/CreateCollection/SectionHeader";
import { Box, InputAdornment, TextField } from "@mui/material";
import {TbWorldWww} from "react-icons/tb"
import {
    BsMedium, 
    BsTelegram, 
    BsDiscord, 
    BsInstagram,
    BsTwitter
} from "react-icons/bs"
import { useContext, useState } from "react";
import { CreateCollectionContext } from "@/contexts/create_collection_context";

interface CollectionSocials {}

export default function CollectionSocials(props: CollectionSocials) {

    const createCollectionContext = useContext(CreateCollectionContext)
    const [socials, setSocials] = useState(createCollectionContext.socials)

    const handleOnNextClick = () => {}

    return <Box>
                <SectionHeader
                    heading="Socials"
                    onNexClick={handleOnNextClick}
                    buttonName="Create collection"
                />
                <Box sx={{
                    marginTop: '3rem',
                    width: '50%'
                }}>

                    <TextField
                        placeholder="yoursite.io"
                        fullWidth
                        error={
                            socials.website !== undefined && socials.website.length > 0 &&
                            socials.website.indexOf("https") !== 0
                        }
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <TbWorldWww />
                            </InputAdornment>
                        }}
                        value={socials.website || ""}
                        onChange={(e) => {
                            socials["website"] = e.target.value
                            setSocials({...socials})
                        }}
                    />

                    <TextField
                        placeholder="YourMediumHandle"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BsMedium style={{
                                    marginRight: '1rem'
                                }}/>
                                https://www.medium.com/
                            </InputAdornment>
                        }}
                        sx={{marginTop: '1rem'}}
                        value={socials.medium || ""}
                        onChange={(e) => {
                            socials["medium"] = e.target.value
                            setSocials({...socials})
                        }}
                    />

                    <TextField
                        placeholder="YourTwitterHandle"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BsTwitter style={{
                                    marginRight: '1rem'
                                }}/>
                                twitter.com/
                            </InputAdornment>
                        }}
                        sx={{marginTop: '1rem'}}
                        value={socials.twitter || ""}
                        onChange={(e) => {
                            socials["twitter"] = e.target.value
                            setSocials({...socials})
                        }}
                    />
                    <TextField
                        placeholder="abcdef"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BsTelegram style={{
                                    marginRight: '1rem'
                                }}/>
                                https://t.me/
                            </InputAdornment>
                        }}
                        sx={{marginTop: '1rem'}}
                        value={socials.telegram || ""}
                        onChange={(e) => {
                            socials["telegram"] = e.target.value
                            setSocials({...socials})
                        }}
                    />

                    <TextField
                        placeholder="discord server invite link"
                        fullWidth
                        error={
                            socials.discord !== undefined && socials.discord.length > 0 &&
                            socials.discord.indexOf("https") !== 0
                        }
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BsDiscord style={{
                                    marginRight: '1rem'
                                }}/>
                            </InputAdornment>
                        }}
                        sx={{marginTop: '1rem'}}
                        value={socials.discord || ""}
                        onChange={(e) => {
                            socials["discord"] = e.target.value
                            setSocials({...socials})
                        }}
                    />
                    <TextField
                        placeholder="YourInstagramHandle"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BsInstagram style={{
                                    marginRight: '1rem'
                                }}/>
                                instagram.com/
                            </InputAdornment>
                        }}
                        sx={{marginTop: '1rem'}}
                        value={socials.instagram || ""}
                        onChange={(e) => {
                            socials["instagram"] = e.target.value
                            setSocials({...socials})
                        }}
                    />

                </Box>


        </Box>
}