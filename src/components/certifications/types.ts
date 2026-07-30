export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  credentialId?: string;
  featured?: boolean;
  href?: string;
}
