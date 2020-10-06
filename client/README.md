# Mannnig Portfolio Frontend

## Docker run

### hot-reloads for development

```
docker run -it -p 8080:8080 $(docker build -q -f Dockerfile.dev .)
```

### Production

```
docker run -it $(docker build .)
```

## Node run

### Dev server

```
npm run serve
```

### Compiles and minifies for production

```
npm run lint
```

### Lints and fixes files

```
npm run lint
```
