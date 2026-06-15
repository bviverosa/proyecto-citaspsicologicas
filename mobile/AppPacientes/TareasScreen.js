import React, { useState, useCallback } from 'react'; // ← Agregamos useCallback
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // ← Hook clave para recargar al enfocar la pantalla

export default function TareasScreen({ route }) {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Extraemos el id del paciente que viene desde el Tab.Navigator en App.js
  const { id } = route.params || {};

  const fetchTareas = async (isRefreshing = false) => {
    if (!id) {
      Alert.alert('Error', 'No se detectó un identificador de paciente válido.');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    if (!isRefreshing) setLoading(true);

    try {
      const response = await fetch(`http://10.100.74.45:8080/getActivitiesByPatient/${id}`);
      console.log('Fetching tasks for patient ID:', id); // Debug: Verificar el ID que se está usando
      const data = await response.json();
      console.log('Received tasks data:', data); // Debug: Verificar la respuesta del backend

      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron recuperar tus actividades.');
      }

      // Asignamos los datos reales del backend al estado
      setTareas(data);
    } catch (error) {
      console.error('Error al traer tareas:', error);
      Alert.alert('Error de conexión', error.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  
  useFocusEffect(
    useCallback(() => {
      fetchTareas();
    }, [id])
  );

  // 🔽 RECARGA MANUAL DESLIZANDO HACIA ABAJO
  const handleRefresh = () => {
    setRefreshing(true);
    fetchTareas(true); // Petición silenciosa para mantener el indicador superior
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#48bb78" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id_tarea.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes actividades sugeridas en este momento.</Text>}
        
        // Propiedades nativas del FlatList vinculadas para el Pull to Refresh
        refreshing={refreshing}
        onRefresh={handleRefresh}
        
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.taskId}>Actividad sugerida #{item.id_tarea}</Text>
              
              {/* Condicional de estado visual dinámico según tu BD */}
              {item.archivo_url ? (
                <View style={styles.statusEntregad}>
                  <Ionicons name="checkmark-circle" size={16} color="#38a169" />
                  <Text style={styles.statusTextEntregado}>Se agregó un archivo</Text>
                </View>
              ) : (
                <View style={styles.statusPendiente}>
                  <Ionicons name="alert-circle" size={16} color="#dd6b20" />
                  <Text style={styles.statusTextPendiente}>Sin archivo</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.descripcion}>{item.tarea_descripcion}</Text>

            {item.archivo_url && (
              <TouchableOpacity 
                style={styles.downloadButton} 
                onPress={() => Alert.alert('Documento', 'Abriendo documento adjunto en: ' + item.archivo_url)}
              >
                <Ionicons name="document-attach" size={16} color="#38a169" />
                <Text style={styles.downloadText}>Ver documento adjunto</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', padding: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#48bb78', elevation: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  taskId: { fontSize: 12, fontWeight: 'bold', color: '#a0aec0' },
  descripcion: { fontSize: 15, color: '#2d3748', lineHeight: 22 },
  emptyText: { textAlign: 'center', color: '#a0aec0', marginTop: 40 },
  statusEntregado: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fff4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusTextEntregado: { color: '#38a169', fontSize: 12, marginLeft: 4, fontWeight: '600' },
  statusPendiente: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffaf0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusTextPendiente: { color: '#dd6b20', fontSize: 12, marginLeft: 4, fontWeight: '600' },
  downloadButton: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#edf2f7', paddingTop: 8 },
  downloadText: { color: '#38a169', fontSize: 13, marginLeft: 6, fontWeight: '500' }
});