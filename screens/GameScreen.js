import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 99, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(99)

    // object destructuring, just to save some typing (no need for props.X later)
    const {userChoice, onGameOver} = props

    // by default, this function will run after every render cycle
    // if you declare dependencies then its re-run when any of its declared dependencies changes
    useEffect(() => {
        if(currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
        }
    },
    // you don't want to just declare props as a dependency because then this is rerun
    // anytime the parent changes at all
    [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if(("LOWER" === direction && currentGuess < props.userChoice) ||
           ("HIGHER" === direction && currentGuess > props.userChoice)) {
              Alert.alert('Nice try', 'No cheating', [{text: 'Try again', style: 'cancel'}])
              return
           }
        if("LOWER" === direction) {
            currentHigh.current = currentGuess
        }
        if("HIGHER" === direction) {
            currentLow.current = currentGuess + 1
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNum)
        //setRounds(currentRounds => currentRounds + 1)
        // we have to use nextNum here, currentGuess wouldn't work because React
        // hasn't updated the state yet
        setPastGuesses(curPastGuesses => [nextNum, ...curPastGuesses])
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'LOWER')}><Ionicons name='ios-arrow-down' size={24} color='white'/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'HIGHER')}><Ionicons name='ios-arrow-up' size={24} color='white'/></MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       padding: 10,
       alignItems: 'center'
   },
   buttonContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginTop: 20,
       width: 400,
       maxWidth: '90%'
   },
   listItem: {
       borderColor: '#ccc',
       borderWidth: 1,
       padding: 15,
       marginVertical: 10,
       backgroundColor: 'white',
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: '60%'
   },
   listContainer: {
       flex: 1,
       width: '80%'
   },
   list: {
       flexGrow: 1,
       alignItems: 'center',
       justifyContent: 'flex-end'
   }
})

export default GameScreen