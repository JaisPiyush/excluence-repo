import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    typography: {
        fontFamily: ['Euclid Circular A', 'sans-serif'].join(','),
        h1: {
            fontSize: '5.5rem',
            lineHeight: 90,
            fontWeight: 'bold'
        },
        h3: {
            fontSize: '3rem',
            fontWeight: 600
        },
        h4: {
            fontSize: '2rem',
            fontWeight: 600
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 500
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 300
        },
        button: {
            fontSize: '1rem',
            fontWeight: 500,
            textTransform: 'none'
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#696CFE', // Purple
            light: '#A6A8A8' // Light purple
            // dark: '#0F0F24' // Purple dark
        },
        secondary: {
            main: '#69FEB6', // Highlight
            // light: '#FFFFFF', // White
            dark: '#030111' // Purple strong
            // contrastText: '#8B8B93'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 375,
            md: 834,
            lg: 1280,
            xl: 1440
        }
    },
    spacing: 8,
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true
            }
        }
    }
});

const { breakpoints, palette } = darkTheme;

const theme = {
    ...darkTheme,
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: '5.5rem',
                lineHeight: 1,
                fontWeight: 'bold',
                color: palette.secondary.light,
                [breakpoints.down('xs')]: {
                    fontSize: '1.75rem',
                    // lineHeight: 40,
                    fontWeight: 'bold',
                    color: palette.secondary.light
                },
                [breakpoints.down('sm')]: {
                    fontSize: '2rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '6.5rem'
                    // lineHeight: 90
                },
                [breakpoints.down('lg')]: {
                    fontSize: '7.5rem'
                }
            },
            h3: {
                fontSize: '2.75rem',
                fontWeight: 600,
                color: palette.secondary.light,
                [breakpoints.down('xs')]: {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: palette.secondary.light
                },
                [breakpoints.down('sm')]: {
                    fontSize: '1.75rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '2.75rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '3rem'
                }
            },
            h4: {
                fontSize: '2rem',
                fontWeight: 600,
                color: palette.secondary.light,
                [breakpoints.down('xs')]: {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: palette.secondary.light
                },
                [breakpoints.down('sm')]: {
                    fontSize: '1.75rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '2rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '2.25rem'
                }
            },
            h5: {
                fontSize: '1.5rem',
                fontWeight: 500,
                color: palette.primary.contrastText,
                [breakpoints.down('xs')]: {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: palette.primary.contrastText
                },
                [breakpoints.down('sm')]: {
                    fontSize: '1.125rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '1.5rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '1.75rem'
                }
            },
            body1: {
                fontSize: '1rem',
                fontWeight: 300,
                color: palette.primary.contrastText,
                [breakpoints.down('xs')]: {
                    fontSize: '0.5rem',
                    fontWeight: 300,
                    color: palette.primary.contrastText
                },
                [breakpoints.down('sm')]: {
                    fontSize: '0.75rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '1rem'
                }
            },
            body2: {
                fontSize: '1rem',
                fontWeight: 600,
                color: palette.primary.contrastText,
                [breakpoints.down('xs')]: {
                    fontSize: '0.125rem',
                    fontWeight: 600,
                    color: palette.primary.contrastText
                },
                [breakpoints.down('sm')]: {
                    fontSize: '0.25rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '1rem'
                },
                ':hover': {
                    color: palette.primary.main
                }
            },
            button: {
                fontSize: '1rem',
                fontWeight: 500,
                [breakpoints.down('xs')]: {
                    fontSize: '0.5rem',
                    fontWeight: 500
                },
                [breakpoints.down('sm')]: {
                    fontSize: '0.75rem'
                },
                [breakpoints.down('lg')]: {
                    fontSize: '1rem'
                }
            }
        }
    }
};

export default theme;
