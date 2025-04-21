import * as LocalAuthentication from "expo-local-authentication";

export const authenticateWithBiometrics = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const supported =
    await LocalAuthentication.supportedAuthenticationTypesAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !enrolled) {
    return { success: false, error: "Biometric auth not available" };
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate with Face ID",
    fallbackLabel: "Enter Password",
    cancelLabel: "Cancel",
  });

  return result;
};
