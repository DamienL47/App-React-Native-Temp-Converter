import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { InputTemperature } from "./components/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay";
import { useState, useEffect } from "react";
import { DEFAULT_TEMP, DEFAULT_UNIT, UNITS } from "./constant";
import {
  getOppositUnit,
  convertTemperatureTo,
  isIceTemperature,
} from "./services/temperature-service";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMP);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
  const [currentBackground, setCurrentBackground] = useState();

  const oppositUnit = getOppositUnit(currentUnit);

  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if (!isNaN(temperatureAsFloat)) {
      const isColdBackground = isIceTemperature(inputValue, currentUnit);
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  }, [inputValue, currentUnit]);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat)
      ? ""
      : convertTemperatureTo(oppositUnit, inputValue).toFixed(1);
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground source={currentBackground} style={s.container}>
        <View style={s.workspace}>
          <TemperatureDisplay
            value={getConvertedTemperature()}
            unit={oppositUnit}
          />
          <InputTemperature
            onChangeText={setInputValue}
            defaultValue={DEFAULT_TEMP}
            unit={currentUnit}
          />
          <ButtonConvert
            onPress={() => {
              setCurrentUnit(oppositUnit);
            }}
            unit={currentUnit}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
