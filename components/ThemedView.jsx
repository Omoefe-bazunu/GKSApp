import { useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useMemo } from "react";

const ThemedView = ({
  style,
  safe = false,
  skipBottomPadding = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();

  const baseStyle = useMemo(() => {
    return {
      backgroundColor: theme.background,
      ...(safe && {
        paddingTop: insets.top,
        paddingBottom: skipBottomPadding ? 0 : insets.bottom,
      }),
    };
  }, [theme.background, insets.top, insets.bottom, safe, skipBottomPadding]);

  return <View style={[baseStyle, style]} {...props} />;
};

export default memo(ThemedView);
