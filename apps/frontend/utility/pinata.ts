import axios from "axios"


function dataURLtoFile(dataurl: string, filename: string): File {
    let arr = dataurl.split(',')
    let mime = (arr[0].match(/:(.*?);/) as RegExpMatchArray)[1];
    let bstr = atob(arr[arr.length - 1]); 
    let n = bstr.length;
    var u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export async function pinFileToIPFS(file: string, metadata: Record<string, unknown> & {name: string}): Promise<string | null> {
    const formData = new FormData()
    formData.append('file', dataURLtoFile(file, metadata.name))
    formData.append('pinataMetadata', JSON.stringify(metadata))
    try {
        const res = axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            headers: {
                'Content-Type': `multipart/form-data;`,
                Authorization: `Bearer ${process.env['NEXT_PUBLIC_PINATA_JWT']}`
              }

        });
        return (await res).data.IpfsHash
    }catch (e) {
        console.error((e as any).message)
        return null
    }
}