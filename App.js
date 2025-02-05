import React, { useState, createContext, useContext } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const UserInfoContext = createContext();

const Interfaccia = () => {
    const [name, setName] = useState('');
    const [cognome, setCognome] = useState('');
    const [nazionalita, setNazionalita] = useState('');
    const [indirizzo, setIndirizzo] = useState('');
    const [email, setEmail] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [showOutput, setShowOutput] = useState(false);
    const [validationResponse, setValidationResponse] = useState('');

    return (
        <UserInfoContext.Provider
            value={{
                name, setName,
                cognome, setCognome,
                nazionalita, setNazionalita,
                indirizzo, setIndirizzo,
                email, setEmail,
                numeroTelefono, setNumeroTelefono,
                showOutput, setShowOutput,
                validationResponse, setValidationResponse
            }}
        >
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    {!showOutput ? <Form /> : <Output />}
                </SafeAreaView>
            </SafeAreaProvider>
        </UserInfoContext.Provider>
    );
};

const Form = () => {
    const {
        name, setName,
        cognome, setCognome,
        nazionalita, setNazionalita,
        indirizzo, setIndirizzo,
        email, setEmail,
        numeroTelefono, setNumeroTelefono,
        setShowOutput,
        setValidationResponse
    } = useContext(UserInfoContext);

    const handleAddressChange = async (text) => {
        setIndirizzo(text);

        if (text.length < 3) return;

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=YOUR_API_KEY=address`
            );
            const data = await response.json();

            if (data.predictions && data.predictions.length > 0) {
                const fullAddress = data.predictions[0].description;
                setValidationResponse(fullAddress);
            } else {
                setValidationResponse('Nessun indirizzo trovato');
            }
        } catch (error) {
            console.error('Errore durante la query:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Inserisci i tuoi dati</Text>
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
                    <TouchableWithoutFeedback onPress={() => setShowOutput(true)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Mostra Output</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const Output = () => {
    const { name, cognome, nazionalita, email, numeroTelefono, validationResponse, setShowOutput} = useContext(UserInfoContext);

    return (
        <View style={styles.outputContainer}>
            <Text style={styles.outputTitle}>Ecco le tue info</Text>
            <Text style={styles.outputText}>Il tuo nome:</Text>
            <Text style={styles.outputBold}>{name}</Text>
            <Text style={styles.outputText}>Il tuo cognome:</Text>
            <Text style={styles.outputBold}>{cognome}</Text>
            <Text style={styles.outputText}>La tua nazionalità:</Text>
            <Text style={styles.outputBold}>{nazionalita}</Text>
            <Text style={styles.outputText}>Il tuo indirizzo:</Text>
            <Text style={styles.outputBold}>{validationResponse}</Text>
            <Text style={styles.outputText}>La tua email:</Text>
            <Text style={styles.outputBold}>{email}</Text>
            <Text style={styles.outputText}>Il tuo numero di telefono:</Text>
            <Text style={styles.outputBold}>{numeroTelefono}</Text>

            <TouchableWithoutFeedback onPress={() => setShowOutput(false)}>
                <View style={styles.buttonBack}>
                    <Text style={styles.buttonText}>Torna Indietro</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 15,
        marginTop: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
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
    button: {
        backgroundColor: '#9367D6',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonBack: {
        backgroundColor: '#9367D6',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    outputContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    outputTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    outputText: {
        fontSize: 18,
        color: '#555',
        marginTop: 10,
    },
    outputBold: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    }
});

export default Interfaccia;
