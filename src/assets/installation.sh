#!/bin/sh

#Installation environnement java 

sudo apt install openjdk-11-jdk
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

#Installation de spring boot 

#installation de sdk 

curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version 


#Installation de spring boot CLI 

sdk install springboot 
spring --version 
sudo apt install maven 

#Installation Angular 
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

npm install npm@latest -g
npm install -g @angular/cli
