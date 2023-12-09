# Wallety

This repository contains the java version of the `wallety` app

### Description

This project uses maven for easier build process.

#### Requirements

To run this Java application, you need to have the following software installed on your system:

- `Java Development Kit (JDK)` 11 or later. You can download it from the
[Official Oracle website](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

- `Apache Maven` 3.8.3 or later. You can download it from the
[official Maven website](https://maven.apache.org/download.cgi)


### How to install and run the repo

Follow these steps to install and run the Java application:

- Clone the repository to your local machine and checkout the java branch using the following commands:
  ```
  git clone  https://github.com/hei-school/cc-d1-my-wallet-YumeT023
  git checkout feature/java
  ```

- Run the following command to build the application:
  ```
  mvn clean compile
  ```

- Once the build is successful, run the following command to execute the application:
  ```
  mvn exec:java -Dexec.mainClass="com.example.Main"
  ```