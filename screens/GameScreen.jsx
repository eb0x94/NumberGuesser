import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import TitleText from "../components/ui/TitleText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

let generateRandomNumberBetween = (min, max, exclude) => {
    let rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomNumberBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userPickedNumber, onGameOver }) => {
    let initialGuess = generateRandomNumberBetween(1, 100, userPickedNumber);
    let [currentGuess, setCurrentGuess] = useState(initialGuess);
    let [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userPickedNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userPickedNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    let nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < userPickedNumber) ||
            (direction === "higher" && currentGuess > userPickedNumber)
        ) {
            Alert.alert("Don't lie!", "You know this is wrong...", [
                { text: "Sorry!", style: "cancel" },
            ]);
            return;
        }
        //lower or higher
        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        let newRndNumber = generateRandomNumberBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    };

    let guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screenContainer}>
            <TitleText>Oponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.inststructionText}>
                    Higher / Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "lower")}
                        >
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color="white"
                            />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "higher")}
                        >
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.flatListHeight}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 24,
        marginTop: 15,
    },
    buttonsContainer: { flexDirection: "row" },
    buttonContainer: { flex: 1 },
    inststructionText: {
        marginBottom: 12,
    },
    flatListHeight: {
        flex:1,
        padding:16
    }
});
export default GameScreen;
