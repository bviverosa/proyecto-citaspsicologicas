
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TareasScreen() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulamos buscar las tareas asociadas a la última cita activa (ID: 101)
  const CITA_ACTIVA = 101;

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        // Enlace real a tu SP de MySQL:
        // const response = await fetch(`http://TU_IP_LOCAL:3000/getTasksByAppointment/${CITA_ACTIVA}`);
        // const data = await response.json();

        const dataSimulada = [
          { id_tarea: 1, descripcion: 'Escribir un diario de pensamientos automáticos durante episodios de ansiedad.', archivo_url: null, id_cita: 101 },
          { id_tarea: 2, descripcion: 'Hacer el ejercicio de respiración diafragmática 10 minutos antes de dormir.', archivo_url: 'https://tu-storage.com/documento_paciente.pdf', id_cita: 101 }
        ];
        setTareas(dataSimulada);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTareas();
  }, []);

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
        data={tareas}
        keyExtractor={(item) => item.id_tarea.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes tareas pendientes para esta sesión.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.taskId}>Tarea #{item.id_tarea}</Text>
              {item.archivo_url ? (
                <View style={styles.statusEntregado}>
                  <Ionicons name="checkmark-circle" size={16} color="#38a169" />
                  <Text style={styles.statusTextEntregado}>Entregado</Text>
                </View>
              ) : (
                <View style={styles.statusPendiente}>
                  <Ionicons name="time" size={16} color="#dd6b20" />
                  <Text style={styles.statusTextPendiente}>Pendiente</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.descripcion}>{item.descripcion}</Text>

            {item.archivo_url && (
              <TouchableOpacity style={styles.downloadButton} onPress={() => alert('Abriendo documento... ' + item.archivo_url)}>
                <Ionicons name="document-attach" size={16} color="#2b6cb0" />
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
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#2b6cb0', elevation: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  taskId: { fontSize: 12, fontWeight: 'bold', color: '#a0aec0', uppercase: true },
  descripcion: { fontSize: 15, color: '#2d3748', lineHeight: 22 },
  emptyText: { textAlign: 'center', color: '#a0aec0', marginTop: 40 },
  statusEntregado: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fff4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusTextEntregado: { color: '#38a169', fontSize: 12, marginLeft: 4, fontWeight: '600' },
  statusPendiente: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffaf0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusTextPendiente: { color: '#dd6b20', fontSize: 12, marginLeft: 4, fontWeight: '600' },
  downloadButton: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#edf2f7', paddingTop: 8 },
  downloadText: { color: '#2b6cb0', fontSize: 13, marginLeft: 6, fontWeight: '500' }
});