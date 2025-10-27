// // lib/services/flutterwave-secure.ts
// import CryptoJS from 'crypto-js';

// interface TokenResponse {
//   access_token: string;
//   expires_in: number;
//   token_type: string;
//   scope?: string;
// }

// interface EncryptedPayload {
//   client: string;
//   [key: string]: any;
// }

// interface PaymentRequest {
//   amount: number;
//   currency: string;
//   email: string;
//   tx_ref: string;
//   phone_number?: string;
//   fullname?: string;
//   redirect_url?: string;
//   meta?: Record<string, any>;
// }

// export class FlutterwaveSecureService {
//   private accessToken: string | null = null;
//   private tokenExpiry: number | null = null;
//   private baseURL = 'https://api.flutterwave.com/v3';
//   private authURL = 'https://idp.flutterwave.com/realms/flutterwave/protocol/openid-connect/token';


//   private getCredentials() {
//     return {
//       clientId: process.env.FLUTTERWAVE_CLIENT_ID!,
//       clientSecret: process.env.FLUTTERWAVE_CLIENT_SECRET!,
//       encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_SECRET!,
//     };
//   }

//   private isTokenValid(): boolean {
//     if (!this.accessToken || !this.tokenExpiry) {
//       return false;
//     }
//     return Date.now() < this.tokenExpiry - 30000; // 30 seconds buffer
//   }

//   async getAccessToken(): Promise<string> {
//     if (this.isTokenValid()) {
//       return this.accessToken!;
//     }

//     try {
//       const { clientId, clientSecret } = this.getCredentials();

//       const formData = new URLSearchParams();
//       formData.append('client_id', clientId);
//       formData.append('client_secret', clientSecret);
//       formData.append('grant_type', 'client_credentials');

//       const response = await fetch(this.authURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Token request failed: ${response.status} - ${errorText}`);
//       }

//       const tokenData: TokenResponse = await response.json();
      
//       this.accessToken = tokenData.access_token;
//       this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000);
      
//       return this.accessToken;
//     } catch (error) {
//       console.error('Flutterwave token error:', error);
//       throw new Error('Failed to obtain access token');
//     }
//   }

//   // Encrypt payload using Flutterwave's encryption method
//   encryptPayload(payload: any): string {
//     const { encryptionKey } = this.getCredentials();
    
//     const jsonString = JSON.stringify(payload);
//     const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();
    
//     return encrypted;
//   }

//   // Generate transaction reference
//   generateTransactionRef(prefix: string = 'STHELENA'): string {
//     const timestamp = Date.now();
//     const random = Math.random().toString(36).substr(2, 9);
//     return `${prefix}_${timestamp}_${random}`.toUpperCase();
//   }

//   // Create encrypted payment payload
//   async createEncryptedPayment(paymentData: PaymentRequest): Promise<{ encrypted_data: string }> {
//     try {
//       const { clientId } = this.getCredentials();
      
//       const payload = {
//         client: clientId,
//         amount: paymentData.amount,
//         currency: paymentData.currency,
//         email: paymentData.email,
//         tx_ref: paymentData.tx_ref,
//         phone_number: paymentData.phone_number,
//         fullname: paymentData.fullname,
//         redirect_url: paymentData.redirect_url,
//         meta: paymentData.meta,
//       };

//       // Remove undefined values
//       Object.keys(payload).forEach(key => {
//         if (payload[key as keyof typeof payload] === undefined) {
//           delete payload[key as keyof typeof payload];
//         }
//       });

//       const encryptedData = this.encryptPayload(payload);
      
//       return {
//         encrypted_data: encryptedData,
//       };
//     } catch (error) {
//       console.error('Encryption error:', error);
//       throw new Error('Failed to encrypt payment data');
//     }
//   }

//   // Initialize payment with encryption
//   async initializePayment(paymentData: PaymentRequest): Promise<any> {
//     try {
//       const accessToken = await this.getAccessToken();
//       const encryptedPayload = await this.createEncryptedPayment(paymentData);

//       const response = await fetch(`${this.baseURL}/payments`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(encryptedPayload),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Payment initialization failed: ${response.status} - ${errorText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Payment initialization error:', error);
//       throw error;
//     }
//   }

//   // Verify transaction
//   async verifyTransaction(transactionId: string): Promise<any> {
//     try {
//       const accessToken = await this.getAccessToken();

//       const response = await fetch(`${this.baseURL}/transactions/${transactionId}/verify`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Transaction verification failed: ${response.statusText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Transaction verification error:', error);
//       throw error;
//     }
//   }

//   // Get transaction details
//   async getTransaction(transactionId: string): Promise<any> {
//     try {
//       const accessToken = await this.getAccessToken();

//       const response = await fetch(`${this.baseURL}/transactions/${transactionId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Transaction fetch failed: ${response.statusText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Transaction fetch error:', error);
//       throw error;
//     }
//   }

//   // Clear token (for testing)
//   clearToken(): void {
//     this.accessToken = null;
//     this.tokenExpiry = null;
//   }
// }

// export const flutterwaveSecureService = new FlutterwaveSecureService();


// lib/services/flutterwave-secure.ts
import CryptoJS from 'crypto-js';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

interface PaymentRequest {
  amount: number;
  currency: string;
  email?: string;
  tx_ref: string;
  phone_number?: string;
  fullname?: string;
  redirect_url?: string;
  meta?: Record<string, any>;
}

interface FlutterwavePaymentResponse {
  status: string;
  message: string;
  data: {
    link: string;
  };
}

export class FlutterwaveSecureService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private baseURL = 'https://api.flutterwave.com/v3';
  private authURL = 'https://idp.flutterwave.com/realms/flutterwave/protocol/openid-connect/token';

  private getCredentials() {
    return {
      clientId: process.env.FLUTTERWAVE_CLIENT_ID!,
      clientSecret: process.env.FLUTTERWAVE_CLIENT_SECRET!,
      encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_SECRET!,
    };
  }

  private isTokenValid(): boolean {
    if (!this.accessToken || !this.tokenExpiry) {
      return false;
    }
    return Date.now() < this.tokenExpiry - 30000; // 30 seconds buffer
  }

  async getAccessToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.accessToken!;
    }

    try {
      const { clientId, clientSecret } = this.getCredentials();

      const formData = new URLSearchParams();
      formData.append('client_id', clientId);
      formData.append('client_secret', clientSecret);
      formData.append('grant_type', 'client_credentials');

      const response = await fetch(this.authURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token request failed: ${response.status} - ${errorText}`);
      }

      const tokenData: TokenResponse = await response.json();
      
      this.accessToken = tokenData.access_token;
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Flutterwave token error:', error);
      throw new Error('Failed to obtain access token');
    }
  }

  // Encrypt payload using Flutterwave's encryption method
  encryptPayload(payload: any): string {
    const { encryptionKey } = this.getCredentials();
    
    const jsonString = JSON.stringify(payload);
    const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();
    
    return encrypted;
  }

  // Generate transaction reference
  generateTransactionRef(prefix: string = 'STHELENA'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  }

  // Create encrypted payment payload
  async createEncryptedPayment(paymentData: PaymentRequest): Promise<{ encrypted_data: string }> {
    try {
      const { clientId } = this.getCredentials();
      
      const payload = {
        client: clientId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        email: paymentData.email,
        tx_ref: paymentData.tx_ref,
        phone_number: paymentData.phone_number,
        fullname: paymentData.fullname,
        redirect_url: paymentData.redirect_url,
        meta: paymentData.meta,
      };

      // Remove undefined values
      Object.keys(payload).forEach(key => {
        if (payload[key as keyof typeof payload] === undefined) {
          delete payload[key as keyof typeof payload];
        }
      });

      const encryptedData = this.encryptPayload(payload);
      
      return {
        encrypted_data: encryptedData,
      };
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt payment data');
    }
  }

  // ✅ CORRECT METHOD: Initialize payment with encryption
  async initializePayment(paymentData: PaymentRequest): Promise<FlutterwavePaymentResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const encryptedPayload = await this.createEncryptedPayment(paymentData);

      const response = await fetch(`${this.baseURL}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(encryptedPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Payment initialization failed: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  }

  // ✅ ALTERNATIVE METHOD: If you prefer this name
  async makePaymentRequest(paymentData: PaymentRequest): Promise<FlutterwavePaymentResponse> {
    return this.initializePayment(paymentData);
  }

  // Verify transaction
  async verifyTransaction(transactionId: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseURL}/transactions/${transactionId}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Transaction verification failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Transaction verification error:', error);
      throw error;
    }
  }

  // Get transaction details
  async getTransaction(transactionId: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseURL}/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Transaction fetch failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Transaction fetch error:', error);
      throw error;
    }
  }

  // Clear token (for testing)
  clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
  }
}

export const flutterwaveSecureService = new FlutterwaveSecureService();