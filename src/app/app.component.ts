import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Angular PKCE';

  codeVerifier = '';
  codeChallange = '';

  cvGenerated = false;
  ccGenerated = false;
  cvCopied = false;
  ccCopied = false;

  generateCodeVerifier() {
    this.cvCopied = false;
    this.codeVerifier = this.generateRandomString(128);
    this.cvGenerated = true;
    this.ccGenerated = false;
    this.ccCopied = false;
  }

  generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  generateCodeChallenge(cv: string) {
    this.ccCopied = false;
    this.ccGenerated = true;
    const cc = this.base64URL(CryptoJS.SHA256(this.codeVerifier))
    this.codeChallange = cc;
  }

  base64URL(string: any) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  copyToClipboard(field: string) {
    const item = field === 'cv' ? this.codeVerifier : this.codeChallange;
    if (field === 'cv') {
      if (!this.cvGenerated) return;
      this.cvCopied = true;
    } else {
      if (!this.ccGenerated) return;
      this.ccCopied = true;
    }
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
