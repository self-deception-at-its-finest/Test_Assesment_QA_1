import type { Locator, Page } from "@playwright/test";

export default class BasePage {
    protected endpoint = "";


    constructor(protected readonly page: Page) {

    }

    /**
     * Opens the page with the given path.
     * @param path
     */
    async open(path = ''): Promise<void> {
        await this.page.goto('/' + path, {
            waitUntil: 'domcontentloaded',
        });
    }

}