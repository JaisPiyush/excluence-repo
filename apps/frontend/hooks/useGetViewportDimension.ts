import {useState, useEffect} from 'react'

export default function useGetViewportDimension(
    args: {width?: number, height?: number}
) {

    const hasWindow = typeof window !== 'undefined'

    function getViewportDimension() {
       const width = hasWindow ? window.innerWidth: (args.width || 0)
       const height = hasWindow ? window.innerHeight: (args.height || 0)
       return {
        width,
        height
       }
    }

    const [viewportDimension, setViewportDimension] = useState(getViewportDimension());

    function handleResize() {
        setViewportDimension(getViewportDimension())
    }

    useEffect(() => {
        if(hasWindow) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow])

    return viewportDimension

}