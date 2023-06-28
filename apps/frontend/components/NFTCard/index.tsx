import { Card, Box, Typography, useTheme, Button } from "@mui/material";
import ImageMediaRenderer, { ImageMediaSources } from "../MediaRenderer/ImageMediaRenderer";
import { NFTHttpFile, NFTIpfsFile, NFTMetadataViewsDisplay, NFTMetadataViewsEditions } from "@/utility/types";
import {Plus} from 'react-iconly'


type NFTCardProps = ImageMediaSources & {
    id: number
    display: NFTMetadataViewsDisplay,
    editions: NFTMetadataViewsEditions
    price?:  string
    highestBid?: string
    currency?: string,
    showBuyNow?: boolean
}

export default function NFTCard(props: NFTCardProps) {
    const theme = useTheme()

    const displayName = () => {
        if (props.editions && props.editions.infoList.length > 0) {
            return props.editions.infoList[0].name
        }

        return props.display.name
    }

    const displayFlowQuantity = (quantity?: string) => {
        if (quantity) return `${quantity} FLOW`
        return '-'
    }

    return <Card
            variant="outlined" 
            sx={{
                width: {
                    xs: 150,
                    md: 235,
                    lg: 265,

                },
                height: 'auto',
                border: `1px solid ${theme.palette.primary.light}`,
                padding: '0.5rem',
                borderRadius: '1rem'
            }}
    >   
        <Box sx={{
            marginBottom: {
                xs: '0.5rem',
                md: '0.625rem',
                lg: '0.75rem'
            }
        }}>
            <ImageMediaRenderer
                alt={props.display.name}
                width={233.66}
                height={235.66}
                desktopWidth={265}
                desktopHeight={267.19}
                mobileWidth={150}
                mobileHeight={152}
                style={{
                    borderRadius: '0.5rem'
                }}
                src={(props.display.thumbnail as NFTHttpFile).url}
                cid={(props.display.thumbnail as NFTIpfsFile).cid}
                path={(props.display.thumbnail as NFTIpfsFile).path}
            />
        </Box>


        <Typography sx={{
            fontSize: {
                xs: 13,
                md: 16
            },
            fontWeight: 700,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: {
                xs: '90%',
                md: '100%'
            },
            whiteSpace: 'nowrap'
        }}>{displayName()}</Typography>

        <Box sx={{
            width: '90%',
            marginTop: {
                xs: '0.5rem',
                md: '0.625rem',
                lg: '0.75rem'
            },
            padding: '0.75rem',
            bgcolor: 'secondary.light',
            
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            
        }}>
            <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',

                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'row',
                        md: 'column'
                    },

                }}>
                    <Typography sx={{
                        marginBottom: '0.25rem'
                    }} variant="subtitle2" color="primary.light">Price</Typography>
                    <Typography sx={{
                        fontSize: {
                            xs: 13
                        },
                        display: {
                            xs: 'block',
                            md: 'none'
                        }
                    }} variant="subtitle2" color="primary.light">:</Typography>
                    <Typography  variant="body2"
                        fontWeight={"semibold"}>{displayFlowQuantity(props.price)}</Typography>

                </Box>
                <Box sx={{
                    display: {
                        xs: 'none',
                        md: 'flex'
                    },
                    flexDirection: {
                        xs: 'row',
                        md: 'column'
                    },
                    
                }}>
                    <Typography variant="subtitle2" sx={{
                        marginBottom: '0.25rem',
                    }} color="primary.light">Highest Bid</Typography>
                    <Typography variant="body2" fontWeight={"semibold"}>{displayFlowQuantity(props.highestBid)}</Typography>

                </Box>
            </Box>
            
            {
                
                props.showBuyNow !== true? <></>:
                <Box
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex'
                    },
                    width: '100%',
                    marginTop: '0.725rem'
                }}
            >

                <Button variant="contained" fullWidth ><Typography>Buy Now</Typography></Button>
                <Button sx={{marginLeft: '0.25rem'}}><Plus set="light" primaryColor="blueviolet"/></Button>
            </Box>}
        </Box>
    </Card>
}