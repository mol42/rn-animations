import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";

const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatePadding = scrollY.interpolate({
    inputRange: [0, 75],
    outputRange: [75, 24],
    extrapolate: "clamp"
  });

  const { width: windowWidth } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          stickyHeaderIndices={[0]}
          style={styles.scrollViewStyle}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
        >
          <View style={styles.tabButtonContainer}>
            <Animated.View
              style={{
                flex : 1,
                flexDirection : "row",
                paddingHorizontal: animatePadding
              }}
            >
              <Animated.View style={styles.tab1}>
                <Text>Tab 1</Text>
              </Animated.View>
              <Animated.View style={styles.tab2}>
                <Text>Tab 2</Text>
              </Animated.View>
            </Animated.View>
          </View>
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollViewStyle : {
    flex: 1,
    backgroundColor : "grey"
  },
  tabButtonContainer : {
    height : 60,
    flexDirection : "row",
    backgroundColor : "orange"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  tab1 : {
    flex : 1,
    backgroundColor : "blue"
  },
  tab2 : {
    flex : 1,
    backgroundColor : "red"
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;