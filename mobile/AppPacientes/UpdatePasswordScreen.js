import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UpdatePasswordScreen({ route, navigation }) {
  // Recuperamos el email del usuario logueado que viene desde los parámetros de navegación

  const [viejaContrasena, setViejaContrasena] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [email, setEmail] = useState(email || ''); // Si no viene email, dejamos el campo vacío para que lo ingrese el usuario
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!viejaContrasena || !nuevaContrasena || !confirmarContrasena) {
      Alert.alert('Campos vacíos', 'Por favor, rellena todos los campos.');
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      Alert.alert('Error de concordancia', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    if (nuevaContrasena.length < 6) {
      Alert.alert('Contraseña débil', 'Por seguridad, la nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // 2. Petición HTTP PATCH a tu backend Express
      const response = await fetch('http://url:8080/updatePassword', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email, // El correo electrónico que obtuvimos del flujo de sesión
          vieja_contrasena: viejaContrasena,
          nueva_contrasena: nuevaContrasena
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo actualizar la contraseña.');
      }

      setLoading(false);
      Alert.alert('Éxito', 'Tu contraseña ha sido actualizada correctamente.', [
        { 
          text: 'Entendido', 
          onPress: () => {
            // Limpiamos los campos del formulario
            setViejaContrasena('');
            setNuevaContrasena('');
            setConfirmarContrasena('');
            // Si usas React Navigation Stack puedes regresar, o simplemente el usuario sigue navegando
            if(navigation) navigation.goBack();
          } 
        }
      ]);

    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error al actualizar', error.message || 'Hubo un fallo en la conexión.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="lock-open-outline" size={50} color="#006b0c" />
        <Text style={styles.title}>Actualizar Contraseña</Text>
        <Text style={styles.subtitle}>Asegúrate de escribir una contraseña segura que recuerdes con facilidad.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Igresar correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Contraseña Actual</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña actual"
          value={viejaContrasena}
          onChangeText={setViejaContrasena}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Nueva Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={nuevaContrasena}
          onChangeText={setNuevaContrasena}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite la nueva contraseña"
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f7fafc', padding: 20, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2d3748', marginTop: 10 },
  subtitle: { fontSize: 13, color: '#718096', marginTop: 5, textAlign: 'center', paddingHorizontal: 10 },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  label: { fontSize: 14, fontWeight: '600', color: '#4a5568', marginBottom: 5, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#f8fafc', color: '#2d3748' },
  button: { backgroundColor: '#1f4a00', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});