import { Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <HStack>
        <Text>bbb</Text>
        <Text>aaa</Text>
      </HStack>
    </SafeAreaView>
  );
}