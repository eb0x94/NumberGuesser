import { Image, View, StyleSheet, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import TitleText from "../components/ui/TitleText";
import Colors from "../constants/colors";

const GameOverScreen = ({rounds, userNumber, onRestartGame}) => {
    return (
        <View style={styles.screenContainer}>
            <TitleText>GAME OVER!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.imageStyle}
                    source={require("../assets/images/success.png")}
                />
            </View>
            <Text style={styles.summaryText}>
                Your phone needed <Text style={styles.highlightText}>{rounds}</Text>{" "}
                rounds to guess your number{" "}
                <Text style={styles.highlightText}>{userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onRestartGame}>Start New Game</PrimaryButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        borderRadius: 150,
        width: 300,
        height: 300,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36,
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    },
    summaryText: {
        fontFamily: "open-sans",
        fontSize: 24,
        textAlign:'center',
        marginBottom: 24
    },
    highlightText: {
        fontFamily: "open-sans-bold",
        color: Colors.primary500,
    },
});

export default GameOverScreen;
