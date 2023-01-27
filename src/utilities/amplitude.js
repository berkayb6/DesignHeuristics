import amplitude from 'amplitude-js';


// export const initAmplitude = () => {
//   amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
// };

// export const setAmplitudeUserDevice = installationToken => {
//   amplitude.getInstance().setDeviceId(installationToken);
// };

// export const setAmplitudeUserId = userId => {
//   amplitude.getInstance().setUserId(userId);
// };

// export const setAmplitudeUserProperties = properties => {
//   amplitude.getInstance().setUserProperties(properties);
// };

// export const sendAmplitudeData = (eventType, eventProperties) => {
//   amplitude.getInstance().logEvent(eventType, eventProperties);
// };

const API_KEY = "b88a38de9a74ce5d6c91b2983ae7236d";
//If you only have one environment, just put the single API key
amplitude.getInstance().init(API_KEY, null, {
// optional configuration options
  saveEvents: true,
  includeUtm: true,
  includeGclid: true,
  includeReferrer: true,
});
export { amplitude };