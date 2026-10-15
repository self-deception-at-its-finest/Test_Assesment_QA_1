    import { type Locator, type Page } from '@playwright/test';
    import BasePage from './base.page'
    import endpoints from '../constants/endpoints.constants.json'

    export class TrendPage extends BasePage {
        readonly addTrendButton: Locator;
        readonly addSectionButton: Locator;
        readonly sections: Locator;
        readonly sectionNameInput: Locator;

        readonly tagSearchInput: Locator;
        readonly tagOptions: Locator;
        readonly confirmTagButton: Locator;

        constructor(page: Page) {
            super(page);
            this.endpoint = endpoints.trend;
            this.addTrendButton = page.getByRole('button', {name: 'ADD TREND', exact: true});
            this.addSectionButton = page.locator('button.dashboard-trends__add-btn');
            this.sections = page.locator('.dashboard-trends__grid-cell');
            this.sectionNameInput = page.getByPlaceholder('Section name');

            this.tagSearchInput = page.getByPlaceholder('Add tag', { exact: true });
            this.tagOptions = page.locator('.dropdown-content .answer-container');
            this.confirmTagButton = page.locator('button.search-tag-actions__button--confirm');
        }

        async open(): Promise<void> {
            await super.open(this.endpoint);
        }

        // Create the first section when Trend View is empty
        async addFirstSection(): Promise<void> {
            await this.addTrendButton.click();
        }

        // Create an additional section when at least one section exists
        async addAdditionalSection(): Promise<void> {
            await this.addSectionButton.click();
        }

        async renameFirstSection(newName: string): Promise<void> {
            const firstSection = this.sections.first();

            const titleInput = firstSection.getByPlaceholder('Section name');

            await titleInput.fill(newName);
            await titleInput.press('Enter');
        }
        async deleteAllSections(): Promise<void> {
            while (await this.sections.count() > 0) {
                const currentCount = await this.sections.count();

                const firstSection = this.sections.first();

                // Click delete button
                await firstSection
                    .locator('button:has(mat-icon[data-mat-icon-name="trash"])')
                    .click();

                // Confirm deletion
                await this.page
                    .getByText('Yes', { exact: true })
                    .click();

                // Wait until section count decreases
                await this.sections
                    .nth(currentCount - 1)
                    .waitFor({ state: 'detached' });
            }
        }

        async openTagPicker(sectionIndex: number): Promise<void> {
            await this.sections
                .nth(sectionIndex)
                .locator('button.dashboard-trend__add-tag-btn')
                .click();
        }



        async selectRandomTags(count: number): Promise<string[]> {
            if (!Number.isInteger(count) || count < 1 || count > 5) {
                throw new Error('Tag count must be between 1 and 5');
            }

            await this.tagOptions.first().waitFor({ state: 'visible' });

            // Get visible dropdown options
            const optionTexts = await this.tagOptions.allInnerTexts();

            // Extract tag IDs from the first line of each option
            const availableTags = optionTexts
                .map(text => text.split('\n')[0].trim())
                .filter(Boolean);

            const uniqueTags = [...new Set(availableTags)];

            if (uniqueTags.length < count) {
                throw new Error(
                    `Requested ${count} tags, but only ${uniqueTags.length} are available`
                );
            }

            // Shuffle available tags
            const shuffledTags = [...uniqueTags];

            for (let i = shuffledTags.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [shuffledTags[i], shuffledTags[j]] =
                    [shuffledTags[j], shuffledTags[i]];
            }

            const selectedTags = shuffledTags.slice(0, count);

            // Select each tag by its ID
            for (const tagName of selectedTags) {
                const option = this.tagOptions.filter({
                    has: this.page.getByText(tagName, { exact: true })
                });

                await option.click();
            }

            return selectedTags;
        }

        async confirmTags(): Promise<void> {
            await this.confirmTagButton.click();
        }
        tagLabel(sectionIndex: number, tagName: string): Locator {
            return this.sections
                .nth(sectionIndex)
                .locator('span.tag-label')
                .filter({
                    hasText: new RegExp(
                        `^\\s*${tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`
                    )
                });
        }

    }
