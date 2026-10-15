(() => {
  const STORAGE_KEY = 'quire-language'
  const DEFAULT_LANGUAGE = 'en'
  const SUPPORTED_LANGUAGES = ['en', 'ar']

  function getSavedLanguage () {
    const savedLanguage = localStorage.getItem(STORAGE_KEY)

    return SUPPORTED_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE
  }

  function applyLanguage (requestedLanguage) {
    
    const language = SUPPORTED_LANGUAGES.includes(requestedLanguage)
      ? requestedLanguage
      : DEFAULT_LANGUAGE

    localStorage.setItem(STORAGE_KEY, language)

    document.documentElement.lang = language
    document.documentElement.dir = 'ltr'
    document.documentElement.dataset.language = language
    // Show selected-language content only
    document.querySelectorAll('[data-language]').forEach((element) => {
      // Do not process the <html> element itself
      if (element === document.documentElement) return

      const shouldShow = element.dataset.language === language

      if (shouldShow) {
        element.removeAttribute('hidden')
        element.setAttribute('aria-hidden', 'false')
      } else {
        element.setAttribute('hidden', '')
        element.setAttribute('aria-hidden', 'true')
      }
    })

    // Swap interface text
    document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
      element.textContent =
        language === 'ar'
          ? element.dataset.ar
          : element.dataset.en
    })
    // Swap Quire page/title navigation text
    document.querySelectorAll('[data-title-en][data-title-ar]').forEach((element) => {
      element.textContent =
        language === 'ar'
          ? element.dataset.titleAr
          : element.dataset.titleEn
    })
    // Change button state
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      const isActive = button.dataset.setLanguage === language

      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false')
    })

    // Keep navbar layout LTR
    document
      .querySelectorAll('.quire-navbar, .quire-navbar-controls')
      .forEach((element) => {
        element.dir = 'ltr'
      })

    // Apply RTL only to Arabic text/content
    document.querySelectorAll('[data-language="ar"]').forEach((element) => {
      element.dir = 'rtl'
    })
  }

  function initializeLanguageSwitcher () {
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      button.addEventListener('click', () => {
        applyLanguage(button.dataset.setLanguage)
      })
    })

    applyLanguage(getSavedLanguage())
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initializeLanguageSwitcher
    )
  } else {
    initializeLanguageSwitcher()
  }

  // Reapply stored language after the complete page has loaded
  window.addEventListener('load', () => {
    applyLanguage(getSavedLanguage())
  })
})()