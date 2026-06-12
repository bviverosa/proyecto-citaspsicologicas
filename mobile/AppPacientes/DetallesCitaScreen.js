import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalleCitaScreen({ route, navigation }) {
  // Obtenemos el id de la cita que se pasó al hacer clic
const { id_cita } = route.params || {};
console.log("ID recibido en la pantalla de detalle:", id_cita);
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    const fetchDetalleCita = async () => {
      try {
        // Tu endpoint para obtener UNA sola cita por su ID
        const response = await fetch(`http://10.0.0.3:8080/getAppointment/${id_cita}`);
        const data = await response.json();
        console.log("Detalle de cita recibido del backend:", data);

        if (!response.ok) throw new Error(data.error || 'No se pudo cargar el detalle.');
        
        setCita(data[0] || data); // Ajusta según si tu BD devuelve un array o un objeto directo
      } catch (error) {
        Alert.alert('Error', error.message);
        navigation.goBack(); // Si falla, regresa a la lista
      } finally {
        setLoading(false);
      }
    };

    fetchDetalleCita();
  }, [id_cita]);

  const handleCancelarCita = () => {
    Alert.alert(
      'Cancelar Cita',
      '¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.',
      [
        { text: 'No, mantener', style: 'cancel' },
        { 
          text: 'Sí, cancelar', 
          style: 'destructive',
          onPress: async () => {
            setCanceling(true);
            try {
              const response = await fetch(`http://10.0.0.3:8080/deleteAppointment/${id_cita}`, {
              });

              if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'No se pudo cancelar la cita.');
              }

              Alert.alert('Cita Cancelada', 'La cita ha sido eliminada con éxito.', [
                { text: 'OK', onPress: () => navigation.navigate('ListaCitas') } 
              ]);
            } catch (error) {
              Alert.alert('Error', error.message);
            } finally {
              setCanceling(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2b6cb0" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="calendar-modal" size={40} color="#2b6cb0" />
          <Text style={styles.mainTitle}>Detalle de la Sesión</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#4a5568" />
          <Text style={styles.infoText}><Text style={styles.bold}>Psicólogo:</Text> {cita?.nombre_usuario || 'Por asignar'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time" size={20} color="#4a5568" />
          <Text style={styles.infoText}><Text style={styles.bold}>Fecha y Hora:</Text> {cita?.fecha} a las {cita?.hora?.substring(0, 5)} hrs</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="videocam" size={20} color="#4a5568" />
          <Text style={styles.infoText}><Text style={styles.bold}>Modalidad:</Text> {cita?.modalidad}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash" size={20} color="#4a5568" />
          <Text style={styles.infoText}><Text style={styles.bold}>Monto:</Text> ${cita?.monto || '0.00'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="card" size={20} color="#4a5568" />
          <Text style={styles.infoText}><Text style={styles.bold}>Estado del Pago:</Text> {cita?.estado_pago || 'Pendiente'}</Text>
        </View>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={handleCancelarCita}
          disabled={canceling}
        >
          {canceling ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f7fafc', padding: 20, justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  mainTitle: { fontSize: 20, fontWeight: 'bold', color: '#2d3748', marginLeft: 10 },
  divider: { height: 1, backgroundColor: '#edf2f7', marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  infoText: { fontSize: 15, color: '#4a5568', marginLeft: 12, flex: 1 },
  bold: { fontWeight: '700', color: '#2d3748' },
  cancelButton: { backgroundColor: '#e53e3e', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 8, marginTop: 25 },
  cancelButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});