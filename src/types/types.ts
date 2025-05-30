export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: { userId: string } | undefined; // Bisa tanpa parameter juga
  Menu: undefined;
  EditPersonalInformation: undefined;
};