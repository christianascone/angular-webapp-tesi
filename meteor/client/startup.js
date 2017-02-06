/**
 * Gets the current user saved language
 * @return {String} Current saved language for user
 */
const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
  if (Meteor.user()) return Meteor.user().profile.language;
};

Meteor.startup(() => {
  var PUBLIC_SETTINGS = Meteor.settings.public;
  // Default language is english
  var defaultLang = "en";
  // Try to read default language from settings, if exists
  if (PUBLIC_SETTINGS && PUBLIC_SETTINGS.LANGUAGE && PUBLIC_SETTINGS.LANGUAGE.DEFAULT) {
    defaultLang = PUBLIC_SETTINGS.LANGUAGE.DEFAULT;
  }
  // Set language
  TAPi18n.setLanguage(defaultLang);

  Tracker.autorun(() => {
    // Read user saved language if exists and set as current language
    if (userLanguage()) {
      var userLang = userLanguage();
      TAPi18n.setLanguage(userLang);
    }
  });
});