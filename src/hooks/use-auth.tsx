
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/client";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  createAdminUserWithEmail: (email: string, pass: string, username: string, telephone: string, location: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signInWithGoogle: async () => {},
  createAdminUserWithEmail: async () => {},
  signInWithEmail: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        setUser(user);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = (role: 'admin' | 'client') => {
    if (role === 'admin') {
      router.push("/admin");
    } else {
      router.push("/");
    }
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
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // User exists, just sign them in
        const userData = userDoc.data();
        handleAuthSuccess(userData.role);
      } else {
        // New user, create a client account for them
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            username: user.displayName,
            role: "client",
            createdAt: serverTimestamp(),
        });
        toast({
            title: "Account Created!",
            description: "Thank you for joining Brain Works!",
        });
        handleAuthSuccess("client");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
        setLoading(false);
    }
  };
  
  const createAdminUserWithEmail = async (email: string, pass: string, username: string, telephone: string, location: string) => {
    setLoading(true);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email,
            username,
            telephone,
            location,
            role: "admin",
            createdAt: new Date(),
        });

        handleAuthSuccess("admin");
    } catch(error) {
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
  }

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const role = userDoc.exists() && userDoc.data().role === 'admin' ? 'admin' : 'client';
        if (role === 'admin') {
            handleAuthSuccess(role);
        } else {
            await firebaseSignOut(auth);
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "Only administrators can log in via this method.",
            });
        }
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
        router.push("/");
    } catch (error) {
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, createAdminUserWithEmail, signInWithEmail, signOut }}>
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
