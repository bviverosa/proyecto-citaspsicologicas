import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailLimpio = email.trim();

    if (!emailLimpio || !contrasena) {
      Alert.alert('Campos vacíos', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.100.74.45:8080/logIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLimpio, contrasena })
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales incorrectas');
      }

      setLoading(false);
      onLoginSuccess(data.user);

    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error de acceso', error.message || 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* 🎨 Icono actualizado a verde clínico medio */}
        <Ionicons name="shield-checkmark" size={65} color="#38a169" />
        <Text style={styles.appTitle}>Serenamente</Text>
        <Text style={styles.subtitle}>Gestiona tu proceso terapéutico</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" 
          autoCapitalize="none"        
          autoCorrect={false}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry             
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* 🎨 Botón actualizado a verde claro principal */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 35 },
  appTitle: { fontSize: 24, fontWeight: 'bold', color: '#2d3748', marginTop: 10, fontFamily: 'sans-serif' },
  subtitle: { fontSize: 14, color: '#718096', marginTop: 5, textAlign: 'center' },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84 },
  label: { fontSize: 14, fontWeight: '600', color: '#4a5568', marginBottom: 6, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#f8fafc', color: '#2d3748' },
  button: { backgroundColor: '#48bb78', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 25 }, // 🎨 Cambio a #48bb78
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});