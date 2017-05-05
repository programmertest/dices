# dices

3 Azar. Un juego de lanzamiento de dados.

## Requerimientos

- Node.js >= 6.0 o superior
- MySQL >= 5.0 o superior

## Instalación

Descarga paquete.

- https://nodejs.org/es/
- https://www.mysql.com/

## Instalación

Documentación.

- http://www.nodegit.org/
- https://dev.mysql.com/doc/

## Configuración

Al crear la instanciación del juego 3 Azar se debe parametrizar las siguientes lineas en archivo dices/app.js:

Configurar puerto servidor -> línea 17:
app.set('port', process.env.PORT || 8080);

Configurar array de conexión a base de datos -> línea 28:
app.use(
	connection(mysql,{
		host: 'localhost',
		user: 'root',
		password : '',
		port : 3306,
		database:'dices'
	},'single')

- Base de datos: dices/db/dices.sql

### 1. Dato autenticación de prueba
1. e-mail: Test1@gmail.com
1. pass: Admin2017

2. e-mail: Test2@gmail.com
2. pass: Admin2017

3. e-mail: Test3@gmail.com
3. pass: Admin2017
  
## Versión
v1.1

## Licencia
[MIT License](LICENSE)


# Documentación

#### Instalacion y ejecución
1. Descargar archivo dices.zip 

2. Descomprimir paquete dices.zip en ubicación del equipo preferiblemente C:\

3. Configurar archivo dices/app.js 

4. Ejecutar aplicación:
- C:\dices>node app.js

## Capturas
	
1. Autenticación:
![alt text](https://github.com/programmertest/sdk_ptp/blob/master/Imagen1.png)

2. Historial:
![alt text](https://github.com/programmertest/sdk_ptp/blob/master/Imagen2.png)

3. Tablero de juego:
![alt text](https://github.com/programmertest/sdk_ptp/blob/master/Imagen3.png)
