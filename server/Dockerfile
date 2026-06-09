# Build context: backend/ directory
# lib/ is copied into backend/ so it's available in the Docker context

# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

# Run stage
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Install Python3, GCC, G++, GDB for execution tracers
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    gdb \
    && rm -rf /var/lib/apt/lists/*

# Copy Spring Boot jar
COPY --from=build /app/target/codevisualizer-backend-1.0.0.jar app.jar

# Copy tracer scripts (lib/ is copied into backend/ directory)
COPY lib/java/ /app/lib/java/
COPY lib/python/ /app/lib/python/
COPY lib/c/ /app/lib/c/

# Compile Tracer.java
RUN javac -encoding UTF-8 --add-modules jdk.jdi /app/lib/java/Tracer.java -d /app/lib/java/

# Set tracer paths
ENV TRACER_JAVA_PATH=/app/lib/java
ENV TRACER_PYTHON_PATH=/app/lib/python/tracer.py
ENV TRACER_GDB_PATH=/app/lib/c/gdb_tracer.py

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java --add-modules jdk.jdi -jar app.jar --server.port=${PORT:-8080}"]
