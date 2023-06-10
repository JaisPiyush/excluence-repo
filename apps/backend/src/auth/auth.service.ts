import { Injectable } from '@nestjs/common';
import * as jose from 'jose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async authenticateWeb3AuthIdToken(idToken: string): Promise<string> {
    // Get the JWK set used to sign the JWT issued by Web3Auth
    // For wallet authentication, for social providers the url
    // will be different. Check Web3Auth Docs.
    const jwks = jose.createRemoteJWKSet(
      new URL('https://authjs.web3auth.io/jwks'),
    );
    // Verify the JWT using Web3Auth's JWKS
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ['ES256'],
    });
    return (jwtDecoded.payload as any).wallets[0].address as string;
  }

  async loginWeb3Auth(publicKey: string): Promise<{ access_token: string }> {
    const payload = { sub: publicKey };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
