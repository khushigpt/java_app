apiVersion: apps/v1
kind: Deployment
metadata:
  name: ci-cd-app
spec:
  replicas: 2

  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1

  selector:
    matchLabels:
      app: ci-cd-app

  template:
    metadata:
      labels:
        app: ci-cd-app

    spec:
      containers:
      - name: ci-cd-app
        image: kubekhushigpt/ci-cd-app:latest

        ports:
        - containerPort: 3000

        # 🔥 Startup probe (prevents early kill)
        startupProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
          failureThreshold: 10

        # ✅ Readiness probe (traffic control)
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5

        # ✅ Liveness probe (self-healing)
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 20
          periodSeconds: 10
