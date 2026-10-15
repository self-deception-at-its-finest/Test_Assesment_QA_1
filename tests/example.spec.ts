import { expect, test} from '../fixtures/pages.fixture'

test.describe('Tests', () => {
    test.beforeEach(async ({ loginPage, page, trendPage }) => {
        await loginPage.open();
        await loginPage.login({username: process.env.TEST_USER_LOGIN!, password: process.env.TEST_USER_PASSWORD!});
        await page.waitForURL('**/investigation/**');
        await trendPage.open()

        await expect(trendPage.sections).toHaveCount(0);

        await trendPage.addFirstSection();
        await expect(trendPage.sections).toHaveCount(1);
    });
    test.afterEach(async ({ trendPage }) => {
        await trendPage.deleteAllSections();
        await expect(trendPage.sections).toHaveCount(0);
    });
    test('TC-007 — Rename a section and verify persistence.', async ({ loginPage, page, trendPage }) => {
        await trendPage.renameFirstSection("QATest01")
        await page.reload();

        await expect(trendPage.sections.first().getByPlaceholder('Section name')).toHaveValue("QATest01");

  })
    test('TC-010 — Add a tag to an existing section and verify persistence.', async ({ loginPage, page, trendPage }) => {
        await trendPage.openTagPicker(0);

        await trendPage.tagSearchInput.fill("tag");

        const selectedTags = await trendPage.selectRandomTags(1);
        await trendPage.confirmTags()

        // Verify selected tags are displayed
        for (const tagName of selectedTags) {
            await expect(
                trendPage.tagLabel(0, tagName)
            ).toBeVisible();
        }

        // Refresh the page
        await page.reload();

        // Verify the exact selected tags persist
        for (const tagName of selectedTags) {
            await expect(
                trendPage.tagLabel(0, tagName)
            ).toBeVisible();
        }
    })
})