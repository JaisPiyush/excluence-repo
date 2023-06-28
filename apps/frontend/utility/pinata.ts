import axios from "axios"

export async function pinFileToIPFS(file: string, metadata: Record<string, unknown>): Promise<string | null> {
    const formData = new FormData()
    formData.append('file', new Blob([file], {type: 'application/image'}))
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