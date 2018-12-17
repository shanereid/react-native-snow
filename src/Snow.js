import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { oneOf, shape, string } from "prop-types";
import {
  lightSnowflakes,
  mediumSnowflakes
} from "../config/snowflakeStrategies";
import Snowflake from "./Snowflake";

const windowHeight =
  Dimensions.get("window").height + Dimensions.get("window").height * 0.1;

export default class Snow extends Component {
  render() {
    const { snowflakesStyle, snowImage, snowfall } = this.props;

    const snowflakes = [];
    switch (snowfall) {
      case 'random':
        for (let idx = 0; idx < 70; idx++) {
          const isDrake = idx % 31 === 0 || idx === 4;
          const fallDelay = Math.random() * 6000;
          const shakeDelay = fallDelay * Math.random();
    
          snowflakes.push({
            glyph: "❆",
            size: isDrake ? 24 : 14 + Math.random() * 10,
            offset: Math.random() * 20 + "%",
            fallDelay: fallDelay,
            shakeDelay: shakeDelay,
            useImage: isDrake
          });
        }
        break;
      case 'light':
        snowflakes = lightSnowflakes
        break;
      case 'medium':
        snowflakes = mediumSnowflakes
        break;
    }
    
    return (
      <View style={styles.view} pointerEvents="none">
        {snowflakes.map((snowflake, i) => {
          const { glyph, size, offset, fallDelay, shakeDelay } = snowflake;
          const image = snowflake.useImage ? snowImage : null;
          return (
            <Snowflake
              key={`snowflake-${i}`}
              glyph={glyph}
              image={image}
              size={size}
              offset={offset}
              fallDelay={fallDelay}
              shakeDelay={shakeDelay}
              style={snowflakesStyle}
            />
          );
        })}
      </View>
    );
  }
}

Snow.propTypes = {
  snowfall: oneOf(["light", "medium", "random"]),
  snowflakesStyle: shape({
    color: string
  })
};

Snow.defaultProps = {
  snowfall: "light"
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    zIndex: 9999,
    elevation: 9999,
    position: "absolute",
    top: 0,
    left: -30,
    width: Dimensions.get("window").width + 30,
    height: windowHeight,
    backgroundColor: "transparent"
  }
});
