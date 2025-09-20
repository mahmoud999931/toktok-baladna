import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [role, setRole] = useState('passenger'); // 'passenger' | 'driver'
  const [screen, setScreen] = useState('login'); // login, home_passenger, waiting, on_ride, rate, home_driver
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [available, setAvailable] = useState(false);
  const [rideInfo, setRideInfo] = useState(null);

  function startRequest() {
    if (!location) { Alert.alert('خطأ', 'اكتب مكانك الحالي'); return; }
    const req = { driver: 'أحمد', tuk: '123', eta: '5 دقايق', fare: 15 };
    setRideInfo(req);
    setScreen('waiting');
  }

  function driverAccepts() {
    setScreen('on_ride');
  }

  function finishRide() {
    setScreen('rate');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abk توك توك - نسخة تجريبية</Text>

      <View style={styles.roleRow}>
        <TouchableOpacity onPress={() => { setRole('passenger'); setScreen('login'); }} style={[styles.roleBtn, role === 'passenger' && styles.roleActive]}>
          <Text style={role === 'passenger' ? styles.roleActiveText : styles.roleText}>راكب</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setRole('driver'); setScreen('login'); }} style={[styles.roleBtn, role === 'driver' && styles.roleActive]}>
          <Text style={role === 'driver' ? styles.roleActiveText : styles.roleText}>سائق</Text>
        </TouchableOpacity>
      </View>

      {screen === 'login' && (
        <View style={styles.card}>
          <Text style={styles.label}>أدخل رقم هاتفك</Text>
          <TextInput value={phone} onChangeText={setPhone} keyboardType='phone-pad' placeholder='01xxxxxxxx' style={styles.input} />
          <TouchableOpacity onPress={() => setScreen(role === 'passenger' ? 'home_passenger' : 'home_driver')} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>احصل على الكود</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'home_passenger' && role === 'passenger' && (
        <View style={styles.card}>
          <Text style={styles.label}>مكاني دلوقتي</Text>
          <TextInput value={location} onChangeText={setLocation} placeholder='مثال: عند المدرسة' style={styles.input} />
          <Text style={[styles.label, {marginTop:10}]}>وجهتك (اختياري)</Text>
          <TextInput value={destination} onChangeText={setDestination} placeholder='مثال: السوق' style={styles.input} />
          <TouchableOpacity onPress={startRequest} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>اطلب توك توك</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'waiting' && role === 'passenger' && rideInfo && (
        <View style={styles.card}>
          <Text style={styles.heading}>السائق في الطريق</Text>
          <Text>اسم السائق: <Text style={styles.bold}>{rideInfo.driver}</Text></Text>
          <Text>رقم التوك توك: <Text style={styles.bold}>{rideInfo.tuk}</Text></Text>
          <Text>وصوله خلال: <Text style={styles.bold}>{rideInfo.eta}</Text></Text>
          <View style={{flexDirection:'row', marginTop:12}}>
            <TouchableOpacity onPress={() => { setScreen('home_passenger'); setRideInfo(null); }} style={styles.dangerBtn}>
              <Text style={styles.dangerText}>إلغاء</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setScreen('on_ride'); }} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>أنا ركبته</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screen === 'on_ride' && role === 'passenger' && (
        <View style={styles.card}>
          <Text style={styles.heading}>الرحلة جارية</Text>
          <Text style={{marginTop:8}}>خريطة بسيطة أو حالة الرحلة تظهر هنا</Text>
          <TouchableOpacity onPress={finishRide} style={[styles.primaryBtn, {marginTop:12}]}>
            <Text style={styles.primaryBtnText}>وصلت</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'rate' && role === 'passenger' && rideInfo && (
        <View style={styles.card}>
          <Text style={styles.heading}>وصلت</Text>
          <Text style={{marginTop:8}}>إجمالي الحساب: <Text style={styles.bold}>{rideInfo.fare} جنيه</Text></Text>
          <TouchableOpacity onPress={() => { Alert.alert('ملاحظة','ادفع كاش للسائق'); setScreen('home_passenger'); setRideInfo(null); }} style={[styles.primaryBtn,{marginTop:12}]}>
            <Text style={styles.primaryBtnText}>ادفع نقدًا</Text>
          </TouchableOpacity>
          <Text style={[styles.label,{marginTop:12}]}>قيّم السائق</Text>
          <View style={{flexDirection:'row', marginTop:6}}>
            <Text>⭐ ⭐ ⭐ ⭐ ⭐</Text>
          </View>
        </View>
      )}

      {screen === 'home_driver' && role === 'driver' && (
        <View style={styles.card}>
          <Text style={styles.heading}>لوحة السائق</Text>
          <TouchableOpacity onPress={() => setAvailable(!available)} style={[styles.primaryBtn, available && styles.primaryBtnAlt]}>
            <Text style={styles.primaryBtnText}>{available ? 'أنا متاح' : 'أنا غير متاح'}</Text>
          </TouchableOpacity>
          <View style={{marginTop:12}}>
            <Text>طلبات قريبة ستظهر هنا عندما تكون متاحًا.</Text>
            <TouchableOpacity onPress={() => { if (available) { setScreen('on_ride'); } else Alert.alert('تنبيه','شغّل الحالة لتستقبل طلبات'); }} style={[styles.primaryBtn,{marginTop:10}]}>
              <Text style={styles.primaryBtnText}>محاكاة قبول طلب</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={{height:30}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop:50, paddingHorizontal:20, backgroundColor:'#fff' },
  title: { fontSize:18, fontWeight:'700', textAlign:'center', marginBottom:12 },
  roleRow: { flexDirection:'row', justifyContent:'center', gap:10, marginBottom:10 },
  roleBtn: { paddingVertical:8, paddingHorizontal:16, borderRadius:20, backgroundColor:'#eee', marginHorizontal:8 },
  roleActive: { backgroundColor:'#FFD400' },
  roleText: { color:'#333' },
  roleActiveText: { color:'#000', fontWeight:'700' },
  card: { backgroundColor:'#fff', padding:14, borderRadius:12, borderColor:'#eee', borderWidth:1, shadowColor:'#000', shadowOpacity:0.03, elevation:1 },
  label: { color:'#333', marginBottom:6 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, backgroundColor:'#fff' },
  primaryBtn: { backgroundColor:'#000', paddingVertical:12, borderRadius:10, alignItems:'center', marginTop:12 },
  primaryBtnAlt: { backgroundColor:'#FFD400' },
  primaryBtnText: { color:'#fff', fontWeight:'700' },
  dangerBtn: { backgroundColor:'#fff', paddingVertical:12, borderRadius:10, alignItems:'center', marginRight:8, borderWidth:1, borderColor:'#ddd', flex:1 },
  dangerText: { color:'#d9534f' },
  heading: { fontSize:16, fontWeight:'700', marginBottom:6 },
  bold: { fontWeight:'700' }
});
