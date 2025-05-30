import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the landing tab when the app starts
  return <Redirect href="/(tabs)/landing" />;
}