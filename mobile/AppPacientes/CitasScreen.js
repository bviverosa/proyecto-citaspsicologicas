import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default function CitasScreen({ route, navigation }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Nuevo estado para controlar la animación de deslizar hacia abajo
  const [refreshing, setRefreshing] = useState(false);

  const { id } = route.params || {}; 

  // 2. Extraemos la función de fetch para poder reutilizarla fácilmente
  const fetchCitas = async (isRefreshing = false) => {
    if (!id) {
      Alert.alert('Error', 'No se detectó un identificador de usuario válido.');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    // Si viene de un "pull", no mostramos la pantalla completa de carga central
    if (!isRefreshing) setLoading(true);

    try {
      const response = await fetch(`http://10.100.74.45:8080/getAppointmentbyPatient/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron obtener las citas.');
      }

      setCitas(data);
    } catch (error) {
      console.error('Error al traer citas:', error);
      Alert.alert('Error de conexión', error.message || 'Ocurrió un problema al conectar con el servidor.');
    } finally {
      // Apagamos ambos indicadores de carga al terminar la petición
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, [id]);

  // 3. Función que se dispara automáticamente al deslizar hacia abajo
  const handleRefresh = () => {
    setRefreshing(true);
    fetchCitas(true); // Pasamos true para avisar que es una actualización silenciosa
  };

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
        keyExtractor={(item, index) => item.id_cita ? item.id_cita.toString() : index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes citas agendadas en tu historial.</Text>}
        
        // 4. Agregamos las propiedades nativas de refresco a la lista
        refreshing={refreshing} // Vincula el estado booleano
        onRefresh={handleRefresh} // Vincula la función que recarga los datos
        
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => {
              console.log('Cita seleccionada:', item.id_cita);
              navigation.navigate('DetalleCita', { id_cita: item.id_cita });
            }}
          >
            <Text style={styles.title}>Sesión del Proceso Clínico</Text>
            <Text style={styles.text}>📅 Fecha: {item.fecha}</Text>
            <Text style={styles.text}>🕒 Hora: {item.hora.substring(0, 5)} hrs</Text>
                    
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