import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds,setGuessRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    let startGameHandler = (pickedNumber) => {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    };

    let gameOverHandler = (numberofRounds) => {
        setGameIsOver(true);
        setGuessRounds(numberofRounds);
    };

    let startNewGameHandler = () => {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onConfirmedNumber={startGameHandler} />;

    if (userNumber) {
        screen = (
            <GameScreen
                userPickedNumber={userNumber}
                onGameOver={gameOverHandler}
            />
        );
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen userNumber={userNumber} rounds={guessRounds} onRestartGame={startNewGameHandler} />;
    }

    return (
        <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.mainScreen}
        >
            <ImageBackground
                source={require("./assets/images/background.png")}
                resizeMode="cover"
                style={styles.mainScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.mainScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
