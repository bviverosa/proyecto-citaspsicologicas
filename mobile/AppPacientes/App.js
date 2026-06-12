import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Alert } from 'react-native';

import LoginScreen from './LoginScreen';
import CitasScreen from './CitasScreen';
import DetalleCitaScreen from './DetallesCitaScreen'; 
import TareasScreen from './TareasScreen';
import UpdatePasswordScreen from './UpdatePasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

// ── Stack exclusivo para el flujo de Citas ──────────────────────────────────
function CitasStack({ route }) {
  const { id } = route.params || {};

  return (
    <Stack.Navigator
      screenOptions={{
        // Actualizado: Header del detalle en verde claro
        headerStyle: { backgroundColor: '#48bb78' }, 
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="ListaCitas"
        component={CitasScreen}
        initialParams={{ id }}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="DetalleCita"
        component={DetalleCitaScreen}
        options={{ title: 'Detail de Cita' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', onPress: () => setUser(null) }
    ]);
  };

  if (!user) {
    return <LoginScreen onLoginSuccess={(usuario) => setUser(usuario)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Citas') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Tareas') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // 🎨 CONFIGURACIÓN DE COLORES VERDES ────────────────────────────────
          tabBarActiveTintColor: '#38a169',      // Verde medio-claro para el icono/texto seleccionado
          tabBarInactiveTintColor: '#000505',    // Un verde/aqua muy claro o gris para los no activos
          headerStyle: { backgroundColor: '#48bb78' }, // Fondo del Header superior en verde claro
          headerTintColor: '#fff',               // Texto del Header en blanco para contraste
          tabBarStyle: {
            backgroundColor: '#ffffff',          // Fondo de la barra inferior blanco para que resalte el verde
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
          },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
              <Ionicons name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen
          name="Citas"
          component={CitasStack}
          initialParams={{ id: user.id }}
          options={{ title: 'Mis Citas' }}
        />
        <Tab.Screen
          name="Tareas"
          component={TareasScreen}
          initialParams={{ id: user.id }}
          options={{ title: 'Actividades sugeridas' }}
        />
        <Tab.Screen
          name="Seguridad"
          component={UpdatePasswordScreen}
          initialParams={{ email: user.email }}
          options={{
            title: 'Contraseña',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="lock-closed-outline" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}