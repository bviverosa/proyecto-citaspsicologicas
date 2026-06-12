import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default function CitasScreen({ route, navigation }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = route.params || {}; 

  useEffect(() => {
    const fetchCitas = async () => {
      if (!id) {
        Alert.alert('Error', 'No se detectó un identificador de usuario válido.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://10.0.0.3:8080/getAppointmentbyPatient/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudieron obtener las citas.');
        }

        setCitas(data);
      } catch (error) {
        console.error('Error al traer citas:', error);
        Alert.alert('Error de conexión', error.message || 'Ocurrió un problema al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2b6cb0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={citas}
        // Usamos la combinación de fecha y hora como Key temporal si no viene id_cita en el objeto
        keyExtractor={(item, index) => item.id_cita ? item.id_cita.toString() : index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes citas agendadas en tu historial.</Text>}
        renderItem={({ item }) => (
  <TouchableOpacity 
    style={styles.card} 
    // 1. Declaramos la función flecha correctamente
    onPress={() => {
      console.log('Cita seleccionada:', item.id_cita);
      
      // 2. Navegación directa y aplanada con el nombre exacto de la pantalla
      navigation.navigate('DetalleCita', { id_cita: item.id_cita });
    }}
  >
    <Text style={styles.title}>Sesión del Proceso Clínico</Text>
    <Text style={styles.text}>📅 Fecha: {item.fecha}</Text>
    <Text style={styles.text}>🕒 Hora: {item.hora.substring(0, 5)} hrs</Text>
            
    {/* Mostramos el nombre del psicólogo usando la propiedad nombre_usuario */}
    {item.nombre_usuario && (
      <Text style={styles.text}>👤 Especialista: {item.nombre_usuario}</Text>
    )}
            
    {item.modalidad && (
      <View style={[styles.badge, item.modalidad === 'Presencial' ? styles.badgePresencial : styles.badgeOnline]}>
        <Text style={styles.badgeText}>
          {item.modalidad}
        </Text>
      </View>
    )}
  </TouchableOpacity>
)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', padding: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2d3748', marginBottom: 5 },
  text: { fontSize: 14, color: '#4a5568', marginVertical: 2 },
  emptyText: { textAlign: 'center', color: '#a0aec0', marginTop: 40 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5, marginTop: 8 },
  badgeOnline: { backgroundColor: '#ebf8ff' },
  badgePresencial: { backgroundColor: '#f0fff4' },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#2b6cb0' }
});