import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";

import PrimaryButton from "../components/ui/PrimaryButton";
import TitleText from "../components/ui/TitleText";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ onConfirmedNumber }) => {
    let [enteredNumber, setEnteredNumber] = useState("");

    let numberInputHandler = (inputText) => {
        setEnteredNumber(inputText);
    };

    let resetInputHandler = () => {
        setEnteredNumber("");
    };

    let confirmInputHandler = () => {
        let chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Oops! Wrong input",
                "Number has to be between 1 and 99",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }

        onConfirmedNumber(chosenNumber);
    };

    return (
        <View style={styles.rootContainer}>
            <TitleText>Guess My Number</TitleText>
            <Card>
                <InstructionText>Enter a number</InstructionText>
                <TextInput
                    onChangeText={numberInputHandler}
                    style={styles.inputTextBox}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={enteredNumber}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>
                            Reset
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>
                            Confirm
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: { flex: 1, marginTop: 100, alignItems: "center" },
    inputTextBox: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonsContainer: { flexDirection: "row" },
    buttonContainer: { flex: 1 },
    
});

export default StartGameScreen;
