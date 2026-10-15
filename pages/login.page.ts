import { expect, type Locator, type Page } from '@playwright/test'
import BasePage from './base.page'
import endpoints from '../constants/endpoints.constants.json'


export class LoginPage extends BasePage {
    readonly emailInput: Locator
    public passwordInput: Locator
    public loginButton: Locator
    readonly loginDialog: Locator

    constructor(page: Page) {
        super(page);
        this.endpoint = endpoints.login;
        this.loginDialog = page.locator('mat-dialog-container');
        this.emailInput = this.loginDialog.locator('#email');
        this.passwordInput = this.loginDialog.locator('#password')
        this.loginButton = this.loginDialog.getByRole('button', { name: 'LOGIN', exact: true });

    }

    async login(creds?: {username?: string; password?: string}) {
        const {username, password,} = creds ?? {}
        if(username !== undefined) await this.emailInput.fill(username)
        if(password !== undefined) await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async open(): Promise<void> {
        await super.open(this.endpoint);
    }
}