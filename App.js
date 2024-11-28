import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Interfaccia = () => {
    const [name, setName] = useState('');
    const [cognome, setCognome] = useState('');
    const [nazionalita, setNazionalita] = useState('');
    const [indirizzo, setIndirizzo] = useState('');
    const [email, setEmail] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [showOutput, setShowOutput] = useState(false); // Per passare alla schermata di output

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {!showOutput ? (
                    <View>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Cognome:</Text>
                        <TextInput
                            style={styles.input}
                            value={cognome}
                            onChangeText={setCognome}
                        />

                        <Text style={styles.label}>Nazionalità:</Text>
                        <TextInput
                            style={styles.input}
                            value={nazionalita}
                            onChangeText={setNazionalita}
                        />

                        <Text style={styles.label}>Indirizzo:</Text>
                        <TextInput
                            style={styles.input}
                            value={indirizzo}
                            onChangeText={setIndirizzo}
                        />

                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.label}>Numero di Telefono:</Text>
                        <TextInput
                            style={styles.input}
                            value={numeroTelefono}
                            onChangeText={setNumeroTelefono}
                            keyboardType="phone-pad"
                        />

                        <Button title="Mostra Output" onPress={() => setShowOutput(true)} />
                    </View>
                ) : (
                    <View>
                        <Text style={styles.outputText}>Ecco le tue info:</Text>
                        <Text style={styles.outputText}>Il tuo nome è: {name}</Text>
                        <Text style={styles.outputText}>Il tuo cognome è: {cognome}</Text>
                        <Text style={styles.outputText}>La tua nazionalità è: {nazionalita}</Text>
                        <Text style={styles.outputText}>Il tuo indirizzo è: {indirizzo}</Text>
                        <Text style={styles.outputText}>La tua email è: {email}</Text>
                        <Text style={styles.outputText}>Il tuo numero di telefono è: {numeroTelefono}</Text>
                        <Button title="Torna Indietro" onPress={() => setShowOutput(false)} />
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        display: 'flex',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    outputText: {
        fontSize: 18,
        color: '#000',
        marginVertical: 10,
    },
});

export default Interfaccia;
