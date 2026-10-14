#!/bin/bash
set -e

# Build
apktool b decompiled_apk -o new_app.apk

# Sign
java -jar uber-apk-signer-1.3.0.jar -a new_app.apk

echo "Workflow complete. Signed APK is new_app-aligned-debugSigned.apk"
