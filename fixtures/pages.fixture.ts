import {test as base} from '@playwright/test'
import {LoginPage} from "../pages/login.page"
import {TrendPage} from "../pages/trend.page";


export const test = base.extend<{
    loginPage: LoginPage
    trendPage: TrendPage
}>({

    loginPage: async({ page }, use) => {
        await use(new LoginPage(page))
    },
    trendPage: async({ page }, use) => {
        await use(new TrendPage(page))
    }
});

export {expect, type Page, type Download, type Locator, type TestInfo} from '@playwright/test'