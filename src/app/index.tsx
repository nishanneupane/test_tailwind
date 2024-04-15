import { View, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'expo-router';
import Button from '../components/button';
import { useAuth } from '../providers/auth-provider';
import { supabase } from '../lib/supabase';

const index = () => {
  const { session, loading, isAdmin } = useAuth()

  if (!session) {
    return <Redirect href={"/sign-in"} />
  }

  if (loading) {
    return <ActivityIndicator />
  }

  if (!session || session == null) {
    return <Redirect href={"/sign-in"} />
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)/"} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button text={loading ? "Signing Out" : "Sign Out"} onPress={() => {
        supabase.auth.signOut().then(() => Alert.alert("Signed Out"))
      }} />

    </View>
  );
};

export default index;