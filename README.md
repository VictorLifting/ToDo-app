# Todo List App

Una aplicación móvil de lista de tareas (Todo List) desarrollada con **Ionic**, **Angular** y **Cordova**, que permite a los usuarios crear, editar y eliminar tareas desde un dispositivo móvil.

---

##  Tecnologías utilizadas

- **Ionic Framework**
- **Angular**
- **Cordova**
- **Android SDK**
- **Xcode (iOS)**

---

##  Requisitos previos

Asegúrate de tener instalado lo siguiente:

###  Herramientas globales

npm install -g @ionic/cli cordova

### Dependencias base

npm install

Ejecutar en navegador (modo desarrollo)

ionic serve

### Credenciales firebase

Añadir las credenciales correspondientes de firebase en los archivos environment

### Compilar para Android

1. Añadir la plataforma
ionic cordova platform add android

2. Construir la aplicación
ionic cordova build android

3. Ejecutar en emulador o dispositivo conectado
ionic cordova run android

### Compilar para iOS (macOS)
1. Añadir la plataforma

ionic cordova platform add ios

2. Instalar dependencias nativas
cd platforms/ios
pod install
cd ../..

3. Compilar la aplicación
ionic cordova build ios

4. Ejecutar en dispositivo o emulador
ionic cordova run ios


Desarrollado por Victor Espejo.
