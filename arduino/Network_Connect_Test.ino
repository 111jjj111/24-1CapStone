#include <SPI.h>
#include <WiFiNINA.h>
#include <SoftwareSerial.h>
#include "arduino_secrets.h"

SoftwareSerial gpsSerial(2,3);

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

int status = WL_IDLE_STATUS;

IPAddress server(113,198,229,225);
char serverIP[] = "113.198.229.225";
int port = 5001;
//Http port number is 5001
//SSH port number is 101


WiFiClient client;

void setup(){
  Serial.begin(38400);
  gpsSerial.begin(38400);

  while(status != WL_CONNECTED){
    Serial.print(ssid);
    Serial.println(" 네트워크에 연결 시도중");
    status = WiFi.begin(ssid,pass);
    delay(10000);
  }
  Serial.println("Connected to WiFi");
  printWifiStatus();

  delay(1000);
}

void loop(){
  String latitude = "";
  String longitude = "";
  String otherNum = "";
  String response = "";
  int commaCount = 0;
//----------GPS Setting----------
  while (gpsSerial.available() > 0) {
        if (gpsSerial.find("$GNGGA")) { // Check for GGA data
          String location = gpsSerial.readStringUntil('\n');
          for(int i=0;i < location.length();i++){
            char c = location.charAt(i);
            if(c ==','){
              commaCount++;
            }
            if(commaCount == 2){
              latitude += c;
            }
            else if(commaCount == 4){
              longitude += c;
            }
            else if(commaCount < 4){
              otherNum += c;
            }
          }
          float f_lat = (latitude.substring(1,3)).toFloat() + (latitude.substring(4).toFloat() / 60);
          //float f_lat_o = (latitude.substring(4).toFloat() / 60);
          float f_lon = (longitude.substring(1,4)).toFloat() + (longitude.substring(5).toFloat() / 60);
          //float f_lon_o = (longitude.substring(5).toFloat() / 60);
          //Serial.print("$GNGGA ");
          //Serial.println(location);
          Serial.print(f_lat, 6);
          Serial.print(" ");
          Serial.println(f_lon, 6);
          String data = "{\"Latitude\": \"" + String(f_lat, 4) + "\", \"Longitude\": \"" + String(f_lon, 4) + "\"}";
//----------Server Setting----------
          if(client.connect(serverIP, 5001)){
            Serial.println("서버 연결 성공");
            client.println("POST /test/finite HTTP/1.1");
            client.println("Host: 113.198.229.225");
            client.println("Content-Type: application/json");
            client.print("Content-Length: ");
            client.println(data.length());
            client.println();//end of Request Header
            client.print(data);
            Serial.println(data);
            String response = client.readString();
            Serial.println(response);
            client.stop();
          }
          delay(1000);
        }
  }
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
