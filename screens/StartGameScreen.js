import React, {useState, useEffect} from 'react';
import {View, 
        StyleSheet, 
        Text, 
        TouchableWithoutFeedback, 
        Button, 
        Keyboard, 
        Alert, 
        Dimensions, 
        ScrollView, 
        KeyboardAvoidingView} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        // we remove the listener when we're done with it so that we don't keep adding
        // new listeners every time the component is rendered.
        // useEffect() provides us a cleanup function for every render cycle that we can use to do that
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const numberInputHandler = inputText => {
        // drops any non-numeric value
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }

    const confirmInputHandler = inputText => {
        const chosenNumber = parseInt(enteredValue)
        // the return here just ensures that nothing happens if we have bad input
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be between 1 and 99',
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;}
        setConfirmed(true)
        //setEnteredValue('')
        setSelectedNumber(chosenNumber)
        Keyboard.dismiss()
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>LET THE GAMES BEGIN</MainButton>
        </Card>
    }

    // blurOnSubmit only affects android keyboards
    // number-pad keyboard is the same as numeric on android
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a new game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a number</BodyText>
                            <Input style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType="number-pad" 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}/>
                            <View style={styles.ButtonContainer}>
                                <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View>
                                <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    ButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     // this particular problem could also be solved by a width percentage
    //     //width: 100
    //     // 'window' and 'screen' are the same on iOS but the status bar on Android makes a difference
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen