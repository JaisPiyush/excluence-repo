import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { connectMongo, disconnectMongo } from '@excluence-repo/db'

export function middleware(req: NextRequest) {
    // Connect with mongoose
    connectMongo()

    //Get response from next views
    const response = NextResponse.next()
    
    // disconnect the mongo instance
    disconnectMongo()
    return response
}

export const config = {
    matcher: ['/api/:path*']
}