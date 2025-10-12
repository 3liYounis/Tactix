import { typography } from "@/constants/typography";
import { useTheme } from "@/hooks/useTheme";
import { Href, Link } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface Props {
  children: ReactNode;
  href: Href;
  style?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
}

export default function LinkedText({ children, href, style, containerStyle }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <Link href={href}>
        <Text style={[styles.text, { color: colors.primary }, style]}>
          {children}
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: typography.fontFamily.kalam,
  },
});
