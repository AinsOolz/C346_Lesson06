import { Text, View, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from "react";

export default function App() {
    return (
        <View>
            <Display />
        </View>
    );
}

function Header() {
    return (
        <Text style={{ marginTop: 40, marginBottom: 10, textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
            Pokemon Knowledge Quiz!
        </Text>
    );
}

function Question({ img, options, index, onSelect }) {
    return (
        <View>
            <Image
                source={img}
                style={{ width: 410, height: 470, marginBottom: 20 }}
                resizeMode="contain"
            />

            <Text style={{ fontSize: 15 }}>Pokemon Name:</Text>
            <Picker onValueChange={(value) => onSelect(index, value)}>
                <Picker.Item label="Select an answer" value="" />
                {options.map((opt, i) => (
                    <Picker.Item key={i} label={opt} value={opt} />
                ))}
            </Picker>
        </View>
    );
}

function Display() {
    const questions = [
        {
            img: require('./img/Camerupt.png'),
            options: ['Camerupt', 'Pikachu', 'Charizard'],
            correct: 'Camerupt'
        },
        {
            img: require('./img/Gumshoo.png'),
            options: ['Pikachu', 'Linoone', 'Gumshoo'],
            correct: 'Gumshoo'
        },
        {
            img: require('./img/Snom.png'),
            options: ['Bruxish', 'Snom', 'Pikachu'],
            correct: 'Snom'
        }
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(""));

    const handleSelect = (index, value) => {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
    };

    const checkScore = () => {
        let score = 0;

        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].correct) {
                score++;
            }
        }

        ToastAndroid.show(`You scored ${score} out of ${questions.length}!`, ToastAndroid.SHORT);
    };

    return (
        <ScrollView>
            <Header />

            {questions.map((question, index) => (
                <Question
                    key={index}
                    img={question.img}
                    options={question.options}
                    index={index}
                    onSelect={handleSelect}
                />
            ))}

            <TouchableOpacity
                onPress={checkScore}
                style={{ backgroundColor: 'lightblue', padding: 10, margin: 20 }}
            >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>SUBMIT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
