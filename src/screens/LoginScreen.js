import React from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { Formik } from "formik";
import useUserStore from "../redux/userStore";
import { loginValidation } from "../utils/validation";

export default function LoginScreen() {
  const loginSuccess = useUserStore((state) => state.loginSuccess);

  const handleLogin = (values) => {
    const dummyToken = "my-secure-token-123";
    const userData = {
      name: "Admin User",
      email: values.email,
      avatar: "https://via.placeholder.com/150"
    };

    loginSuccess(dummyToken, userData);
    console.log("Login Success with:", values);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Welcome Back</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidation}
        onSubmit={handleLogin}
      >
        {({ 
          handleChange, 
          handleBlur, 
          handleSubmit, 
          values, 
          errors, 
          touched 
        }) => (
          <View style={styles.formContainer}>
            
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={[
                  styles.input, 
                  touched.email && errors.email ? styles.inputError : null
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={[
                  styles.input, 
                  touched.password && errors.password ? styles.inputError : null
                ]}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333"
  },
  formContainer: {
    width: "100%"
  },
  inputGroup: {
    marginBottom: 15
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    padding: 15, 
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9"
  },
  inputError: {
    borderColor: "red"
  },
  button: { 
    backgroundColor: "#4A90E2", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center",
    marginTop: 10 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18 
  },
  errorText: { 
    color: "red", 
    fontSize: 12, 
    marginTop: 5,
    marginLeft: 5 
  }
});