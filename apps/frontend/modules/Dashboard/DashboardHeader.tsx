import BannerImage from "@/components/BannerImage";
import SquareImage from "@/components/SquareImage";
import { Box, Typography } from "@mui/material";
import { profileURLs } from "@/utility/profileURLs";
import PexelMoImag from "../../public/img/pexels-mo-eid-11643390.jpg"
import { useAppSelector } from "@/redux-store/index";

interface DashboardHeaderProps {

}

// TODO: Make this module responsive, currently only works on md <-> lg
//TODO: Add setup to change banner, square image and add profile data
export default function DashboardHeader(props: DashboardHeaderProps) {
    const [user] = useAppSelector(state => [state.account.user])
    return <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
               marginBottom: '2rem'
            }}>
                <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            height: 380
                }}>
                    <Box sx={{
                                position: 'relative',
                                
                    }}>
                        <BannerImage src={PexelMoImag} />
                        <SquareImage cid={profileURLs[5]} style={{
                                position: 'absolute',
                                zIndex: 10,
                                left: 35,
                                bottom: -30
                        }}/>
                    </Box>
                </Box>

                <Box sx={{
                    marginTop: '64px'
                }}>
                        <Typography variant="h4" >{user.addr}</Typography>
                </Box>
            </Box>
}