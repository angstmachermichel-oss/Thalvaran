# Firebase-Setup für Thalvaràn — Kodex-App

Die App ist bereits vollständig auf Firebase vorbereitet. Es fehlen nur noch die Zugangsdaten.

## Schritte

1. **Projekt anlegen**: https://console.firebase.google.com/ → "Projekt hinzufügen" → einen Namen vergeben (z. B. "thalvaran-kodex") → Google Analytics kann deaktiviert bleiben.

2. **Realtime Database aktivieren**: Im Projekt links im Menü "Build" → "Realtime Database" → "Datenbank erstellen" → Standort z. B. "europe-west1" → zunächst im **Testmodus** starten.

3. **Sicherheitsregeln setzen**: Im Reiter "Regeln" der Realtime Database Folgendes eintragen und veröffentlichen:
   ```json
   {
     "rules": {
       "shared": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```
   Das ist bewusst offen (kein Login nötig) — passend für ein privates Ein-Abend-Event, dessen Adresse nur die Gäste kennen. Für höhere Sicherheit könnte man das später auf ein gemeinsames Geheim-Token einschränken.

4. **Web-App registrieren**: Projekteinstellungen (Zahnrad oben links) → "Allgemein" → ganz unten "Meine Apps" → Web-App hinzufügen (Symbol `</>`) → einen Namen vergeben → Firebase zeigt ein `firebaseConfig`-Objekt mit sieben Werten (apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId).

5. **Werte eintragen**: In `thalvaran-kodex-app-v3.html` nach `const FIREBASE_CONFIG = {` suchen und die sieben leeren Strings mit den Werten aus Schritt 4 befüllen.

6. **Datei hochladen**: Die aktualisierte Datei auf GitHub überschreiben. Ab dem nächsten Laden läuft der komplette Spielzustand automatisch über Firebase statt über den Behelfsspeicher — Interaktion zwischen verschiedenen Handys funktioniert dann echt.

## Test nach der Einrichtung

- Zwei Geräte (oder ein Gerät + Inkognito-Fenster) mit zwei verschiedenen Rollen-Codes einloggen.
- Auf Gerät A eine Fähigkeit gegen die Person auf Gerät B einsetzen (z. B. Aderlass).
- Auf Gerät B sollte sich die Glut-Anzeige innerhalb weniger Sekunden ändern, ohne dass man etwas tun muss.

## Was NICHT über Firebase läuft (Absicht)

Der eigene Rollen-Code und der GM-Status bleiben bewusst nur auf dem jeweiligen Gerät gespeichert (echtes `localStorage`) — die landen nie in der gemeinsamen Datenbank. Das ist kein Fehler, sondern Trennung zwischen "was gehört nur mir" und "was gehört allen".
