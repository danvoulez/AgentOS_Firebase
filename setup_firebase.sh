#!/bin/bash

chmod +x $0
echo -e "y\npublic\nn\nn" | firebase init hosting
echo -e "y\njavascript\nn\nn" | firebase init functions
cd functions
npm install --save firebase-functions@latest
npm install --save next
cd ..
npm install --save-dev @next/bundle-analyzer
npm run build
firebase deploy 
 
exit 0