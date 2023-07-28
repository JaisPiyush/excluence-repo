import PaddedBox from '@/component/PaddedBox';
import {
    Box,
    Divider,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

const titles = ['Build faster', 'Complex Queries', 'Spend less'];
const descs = [
    `Create innovative dApps
without running your own 
indexing infrastructure. 
Superior speeds, and
advanced query allows 
you to focus on app and UX.`,
    `Query any type of data from 
blockchain events using our
innovative JsonSQL. No need
to use multiple APIs for extrac
-ting different types of data 
and events.`,
    `Cut down on costs and time
spent running expensive
infrastructure. Ensure your
application’s uptime and 
keep its data updated 24/7
without manual labor.`
];

function featureBox(title: string, desc: string) {
    return (
        <Box
            key={title}
            sx={{
                width: {
                    xl: '350px',
                    md: '267px',
                    xs: '100%'
                },
                display: 'flex',
                flexDirection: 'column',
                mt: '4rem'
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h5" sx={{ mt: '2rem' }}>
                {desc}
            </Typography>
        </Box>
    );
}

export default function IndexFeaturesSection() {
    const theme = useTheme();
    const isServer = typeof window === 'undefined';
    const isMd = useMediaQuery(theme.breakpoints.up('md')) || isServer;
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                pb: isMd ? '0px' : '5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <PaddedBox>
                <Box
                    sx={{
                        width: '95%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: isMd ? 'row' : 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        {titles.map((title, index) =>
                            featureBox(title, descs[index])
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: {
                                md: '120px',
                                xs: '80px'
                            }
                        }}
                    ></Box>
                    <Divider sx={{ width: '100%', bgcolor: 'primary.main' }} />
                </Box>
            </PaddedBox>
        </Box>
    );
}
