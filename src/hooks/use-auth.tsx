"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  createUserWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  createUserWithEmail: async () => {},
  signInWithEmail: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    router.push("/book");
  };

  const handleAuthError = (error: any) => {
    console.error("Authentication error:", error);
    toast({
      variant: "destructive",
      title: "Authentication Failed",
      description: error.message || "An unexpected error occurred.",
    });
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
      handleAuthSuccess();
    } catch (error) {
      handleAuthError(error);
    } finally {
        setLoading(false);
    }
  };

  const createUserWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        await setPersistence(auth, browserLocalPersistence);
        await createUserWithEmailAndPassword(auth, email, pass);
        handleAuthSuccess();
    } catch(error) {
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
  }

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, pass);
        handleAuthSuccess();
    } catch(error) {
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
  }

  const signOut = async () => {
    setLoading(true);
    try {
        await firebaseSignOut(auth);
        router.push("/login");
    } catch (error) {
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, createUserWithEmail, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
