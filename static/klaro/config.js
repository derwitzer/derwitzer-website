
var klaroConfig = {
    version: 1,
    elementID: 'klaro',
    styling: {
        theme: ['light', 'top', 'wide'],
    },
    showDescriptionEmptyStore: true,
    noAutoLoad: false,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: true,
    autoFocus: false,
    showNoticeTitle: false,
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    default: false,
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,
    translations: {
        de: {
            privacyPolicyUrl: 'datenschutz',
            consentModal: {
                description:
                    'Folgende angeführte Dienste helfen uns dabei diese Website zu betreiben und zu verbessern. Ihr könnt selbst entscheiden welche Dienste ihr erlauben möchtet.',
            },
            externalTracker: {
                description: 'Beispiel für ein externes Tracking Skript',
            },
        },
    },

    services: [
        {
      name: 'google-analytics',
      title: 'Google Analytics',
      purposes: ['statistics'],
      required: false,
      cookies: [/^_ga/, /^_gid/]
    }
    ],
};
