import {Text, TextInput, View, Image, ScrollView, ToastAndroid, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from "react";

export default function App() {
    return (
        <View>
            <Display/>
        </View>);
}
// const InputBox = ({label, onChangeText}) => {
//     return (
//         <View>
//             <Text>{label}</Text>
//             <TextInput style={{borderWidth: 1}} onChangeText={onChangeText}/>
//         </View>
//     );
// };

function Header() {
    return (
        <Text style={{marginTop: 40, marginBottom: 10, textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Pokemon
            Knowledge Quiz!</Text>)
}

function Question({img, opt1, opt2, opt3, onSelect}) {
    // const [type, setType] = useState('');
    function handleSelect(value) {
        onSelect(value); // Tell parent what was selected
    }

    return (
        <View>
            <Image source={img} style={{width: 410, height: 470, marginBottom: 20}} resizeMode="contain"/>
            <Text style={{fontSize: 15}}>Pokemon Name:</Text>
            <Picker onValueChange={handleSelect}>
                <Picker.Item label='Pick an Answer' value=''/>
                <Picker.Item label={opt1} value={opt1}/>
                <Picker.Item label={opt2} value={opt2}/>
                <Picker.Item label={opt3} value={opt3}/>
            </Picker>
        </View>)
}

function Display() {
    const correctAnswers = ['Camerupt', 'Gumshoo', 'Snom'];
    const [answers, setAnswers] = useState(['', '', '']);

    const updateAnswer = (index, answer) => {
        const updated = [...answers];
        updated[index] = answer;
        setAnswers(updated);
    };

    const checkAnswers = () => {
        let score = 0;
        answers.forEach((ans, i) => {
            if (ans === correctAnswers[i]) score++;
        });
        ToastAndroid.show(`Score: ${score}/${correctAnswers.length}`, ToastAndroid.SHORT);
    };

    return (
        <ScrollView>
            <Header/>
            <Question img={require('./img/Camerupt.png')}
                      opt1='Camerupt'
                      opt2='Pikachu'
                      opt3='Charizard'
                      onSelect={(answer) => updateAnswer(0, answer)}
            />
            <Question img={require('./img/Gumshoo.png')}
                      opt1='Pikachu'
                      opt2='Linoone'
                      opt3='Gumshoo'
                      onSelect={(answer) => updateAnswer(1, answer)}
            />
            <Question img={require('./img/Snom.png')}
                      opt1='Bruxish'
                      opt2='Snom'
                      opt3='Pikachu'
                      onSelect={(answer) => updateAnswer(2, answer)}
            />

            <TouchableOpacity onPress={checkAnswers} style={{backgroundColor: 'lightblue', padding: 15, margin: 20}}>
                <Text style={{textAlign: 'center'}}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>)
}
