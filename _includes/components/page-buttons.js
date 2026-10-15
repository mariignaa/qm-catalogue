import { html } from '#lib/common-tags/index.js'

/**
 * Renders previous page and next page buttons
 *
 * @param {Object} eleventyConfig
 *
 * @return {String} Previous and next buttons
 */
export default function (eleventyConfig) {
  const icon = eleventyConfig.getFilter('icon')

  const {
    nextButtonText,
    prevButtonText
  } = eleventyConfig.globalData.config.navigation

  return function (params, options = {}) {
    const { pagination } = params
    const { nextPage, previousPage } = pagination

    const prevPageButton = () => {
      if (!previousPage) return ''

      return html`
        <li class="quire-nav-button prev">
          <a href="${previousPage.url}">
            ${icon({
              type: 'left-arrow',
              description: 'Go back a page'
            })}

            <span
              class="nav-title"
              data-en="${prevButtonText}"
              data-ar="السابق"
            >
              ${prevButtonText}
            </span>
          </a>

          <span
            class="visually-hidden"
            data-en="Previous Page"
            data-ar="الصفحة السابقة"
          >
            Previous Page
          </span>
        </li>
      `
    }

    const nextPageButton = () => {
      if (!nextPage) return ''

      return html`
        <li class="quire-nav-button next">
          <a href="${nextPage.url}">
            <span
              class="nav-title"
              data-en="${nextButtonText}"
              data-ar="التالي"
            >
              ${nextButtonText}
            </span>

            ${icon({
              type: 'right-arrow',
              description: 'Go to the next page'
            })}
          </a>

          <span
            class="visually-hidden"
            data-en="Next Page"
            data-ar="الصفحة التالية"
          >
            Next Page
          </span>
        </li>
      `
    }

    return html`
      <div
        class="quire-contents-buttons"
        data-outputs-exclude="epub,pdf"
      >
        <ul>
          ${prevPageButton()}
          ${nextPageButton()}
        </ul>
      </div>
    `
  }
}