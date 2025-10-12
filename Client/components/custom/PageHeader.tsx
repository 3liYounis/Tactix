import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle: string;
  imageSource: any;
}

export default function PageHeader({ title, subtitle, imageSource }: Props) {
  const { colors, typography } = useTheme();
  return (
    <View style={[styles.pageHeader, { borderBottomColor: colors.muted }]}>
      <View style={styles.textContainer}>
        <Text style={[
          styles.pageHeaderTitle,
          {
            color: colors.primary,
          },
        ]}>{title}</Text>
        <Text style={[
          styles.pageHeaderSubtitle,
          {
            color: colors.muted,
          },
        ]}>{subtitle}</Text>
      </View>
        <Image
          source={imageSource}
          style={[styles.headerImage]}
          resizeMode="contain"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 2,
    minHeight: 60,
    maxHeight: 80,
  },
  textContainer: {
    flex: 1,
  },
  pageHeaderTitle: {
    fontSize: 20,
    fontFamily: typography.fontFamily.jetbrainsMonoBold
  },
  pageHeaderSubtitle: {
    fontSize: 18,
    fontFamily: typography.fontFamily.kalam,
    letterSpacing: 0.15,
  },
  headerImage: {
    width: 70,
    height: 70,
  },
});
